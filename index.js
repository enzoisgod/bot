const fs = require('fs');
const path = require('path');
const { Client, Collection, GatewayIntentBits, Partials, Events } = require('discord.js');
require('dotenv').config();

const config = require('./config.js');

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


// Load commands
const commandsPath = path.join(__dirname, 'commands');
function loadCommands(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const full = path.join(dir, file);
        const stat = fs.statSync(full);
        if (stat.isDirectory()) loadCommands(full);
        else if (file.endsWith('.js')) {
            const cmd = require(full);
            if (cmd.data && cmd.execute) {
                client.commands.set(cmd.data.name, cmd);
            }
        }
    }
}
loadCommands(commandsPath);


// Events
const eventsPath = path.join(__dirname, 'events');
for (const file of fs.readdirSync(eventsPath)) {
    if (!file.endsWith('.js')) continue;
    const evt = require(path.join(eventsPath, file));
    if (evt.once) client.once(evt.name, (...args) => evt.execute(...args, client));
    else client.on(evt.name, (...args) => evt.execute(...args, client));
}


// Slash commands handler
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
   ⭐ AUTO-REACTION DANS LE SALON AVIS
   ============================================================ */

client.on(Events.MessageCreate, async (message) => {
    // ignore bots
    if (message.author.bot) return;

    // compare with .env
    if (message.channel.id === process.env.AVIS_CHANNEL_ID) {
        try {
            await message.react('⭐');
        } catch (err) {
            console.error("Impossible d'ajouter la réaction ⭐ :", err);
        }
    }
});

client.on(Events.MessageCreate, async (message) => {
    // Ignore les bots
    if (message.author.bot) return;

    // Si le bot est mentionné directement et ce n'est pas une réponse
    if (message.mentions.has(client.user) && !message.reference) {
        try {
            await message.reply("C'est moi wshh");
        } catch (err) {
            console.error("Impossible de répondre au ping :", err);
        }
    }
});


// Login
client.login(config.token);


