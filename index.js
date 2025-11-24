const fs = require('fs');
const path = require('path');
const { Client, Collection, GatewayIntentBits, Partials, Events } = require('discord.js');
require('dotenv').config();

const config = require('./config.js');
const logger = require('./utils/logger'); // logs
const autoRole = require('./utils/autorole'); // auto-role

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent
    ],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction]
});

client.commands = new Collection();

/* ============================================================
   COMMANDES
============================================================ */
const commandsPath = path.join(__dirname, 'commands');
function loadCommands(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const full = path.join(dir, file);
        const stat = fs.statSync(full);
        if (stat.isDirectory()) loadCommands(full);
        else if (file.endsWith('.js')) {
            const cmd = require(full);
            if (cmd.data && cmd.execute) client.commands.set(cmd.data.name, cmd);
        }
    }
}
loadCommands(commandsPath);

/* ============================================================
   EVENTS DE GUILDE (LOGS + AUTO-ROLE)
============================================================ */
client.on(Events.GuildMemberAdd, member => {
    logger.memberJoin(member);
    autoRole.check(member);
});

client.on(Events.GuildMemberRemove, member => {
    logger.memberLeave(member);
});

client.on(Events.MessageDelete, message => {
    logger.messageDelete(message);
});

client.on(Events.MessageUpdate, (oldMessage, newMessage) => {
    logger.messageUpdate ? logger.messageUpdate(oldMessage, newMessage) : console.log(`Message édité: ${oldMessage.id}`);
});

/* ============================================================
   SLASH COMMANDS
============================================================ */
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction, client, config);
    } catch (err) {
        console.error(err);
        if (interaction.replied || interaction.deferred)
            await interaction.followUp({ content: 'Erreur lors de l\'exécution.', ephemeral: true });
        else
            await interaction.reply({ content: 'Erreur lors de l\'exécution.', ephemeral: true });
    }
});

/* ============================================================
   AUTO-REACTION & PING
============================================================ */
client.on(Events.MessageCreate, async (message) => {
    if (message.author.bot) return;

    // Salon avis
    if (message.channel.id === process.env.AVIS_CHANNEL_ID) {
        try { await message.react('⭐'); } catch (err) { console.error(err); }
    }

    // Ping du bot
    if (message.mentions.has(client.user) && !message.reference) {
        try { await message.reply("C'est moi wshh"); } catch (err) { console.error(err); }
    }
});

/* ============================================================
   ECONOMIE
============================================================ */
const economyPath = path.join(__dirname, "data", "economy.json");

client.economy = {
    load() { if (!fs.existsSync(economyPath)) return {}; return JSON.parse(fs.readFileSync(economyPath)); },
    save(data) { fs.writeFileSync(economyPath, JSON.stringify(data, null, 2)); },
    addMoney(userId, amount) { const data = this.load(); if (!data[userId]) data[userId] = { money: 0, lastDaily: null }; data[userId].money += amount; this.save(data); },
    getBalance(userId) { const data = this.load(); return data[userId] ? data[userId].money : 0; },
    setBalance(userId, amount) { const data = this.load(); if (!data[userId]) data[userId] = { money: 0, lastDaily: null }; data[userId].money = amount; this.save(data); }
};

client.on(Events.MessageCreate, (message) => {
    if (message.author.bot) return;
    client.economy.addMoney(message.author.id, 5); // +5$ par message
});

/* ============================================================
   READY & ACTIVITE
============================================================ */
client.once(Events.ClientReady, () => {
    console.log(`${client.user.tag} est connecté !`);

    const activities = [
        { name: 'Effexe Core', type: 'WATCHING' },
        { name: 'tes commandes', type: 'LISTENING' },
        { name: 'le serveur', type: 'PLAYING' }
    ];

    let i = 0;
    setInterval(() => {
        const status = activities[i];
        try { client.user.setActivity(status.name, { type: status.type }); }
        catch (err) { console.error(err); }
        i = (i + 1) % activities.length;
    }, 5000); // change toutes les 5s
});

/* ============================================================
   LOGIN
============================================================ */
client.login(config.token);






