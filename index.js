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

// ─── Load Commands ───────────────────────────────────────────────
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

// ─── Load Events ─────────────────────────────────────────────────
const eventsPath = path.join(__dirname, 'events');
for (const file of fs.readdirSync(eventsPath)) {
    if (!file.endsWith('.js')) continue;
    const evt = require(path.join(eventsPath, file));
    if (evt.once) client.once(evt.name, (...args) => evt.execute(...args, client));
    else client.on(evt.name, (...args) => evt.execute(...args, client));
}

// ─── Slash Commands Handler ──────────────────────────────────────
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction, client, config);
    } catch (err) {
        console.error("Erreur lors de l'exécution de la commande :", err);
        if (interaction.replied || interaction.deferred)
            await interaction.followUp({ content: '❌ Erreur lors de l\'exécution.', ephemeral: true });
        else
            await interaction.reply({ content: '❌ Erreur lors de l\'exécution.', ephemeral: true });
    }
});

// ─── Auto-Reaction et Mention ───────────────────────────────────
client.on(Events.MessageCreate, async message => {
    if (message.author.bot) return;

    if (message.channel.id === process.env.AVIS_CHANNEL_ID) {
        try {
            await message.react('⭐');
        } catch (err) {
            console.error("Impossible d'ajouter la réaction ⭐ :", err);
        }
    }

    if (message.mentions.has(client.user) && !message.reference) {
        try {
            await message.reply("C'est moi wshh");
        } catch (err) {
            console.error("Impossible de répondre au ping :", err);
        }
    }
});

// ─── Économie ───────────────────────────────────────────────────
const economyPath = path.join(__dirname, "data", "economy.json");

client.economy = {
    load() {
        try {
            if (!fs.existsSync(economyPath)) return {};
            return JSON.parse(fs.readFileSync(economyPath));
        } catch (err) {
            console.error("Erreur lors du chargement de l'économie :", err);
            return {};
        }
    },
    save(data) {
        try {
            fs.writeFileSync(economyPath, JSON.stringify(data, null, 2));
        } catch (err) {
            console.error("Erreur lors de la sauvegarde de l'économie :", err);
        }
    },
    addMoney(userId, amount) {
        const data = this.load();
        if (!data[userId]) data[userId] = { money: 0, lastDaily: null };
        data[userId].money += amount;
        this.save(data);
    },
    getBalance(userId) {
        const data = this.load();
        if (!data[userId]) data[userId] = { money: 0, lastDaily: null };
        return data[userId].money;
    },
    setBalance(userId, amount) {
        const data = this.load();
        if (!data[userId]) data[userId] = { money: 0, lastDaily: null };
        data[userId].money = amount;
        this.save(data);
    },
    removeMoney(userId, amount) {
        const data = this.load();
        if (!data[userId]) data[userId] = { money: 0, lastDaily: null };
        data[userId].money = Math.max(0, data[userId].money - amount);
        this.save(data);
    }
};

// Ajoute +5$ par message
client.on(Events.MessageCreate, message => {
    if (message.author.bot) return;
    client.economy.addMoney(message.author.id, 5);
});

// ─── Login ──────────────────────────────────────────────────────
client.login(config.token);

