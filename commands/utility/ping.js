const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Test du bot, il répond de manière amusante.'),
    async execute(interaction) {
        const responses = [
            "C’est moi wshh 😎",
            "Yo yo yo!",
            "Je suis là 👀",
            "Ping reçu!"
        ];
        const reply = responses[Math.floor(Math.random() * responses.length)];
        await interaction.reply(reply);
    }
};
