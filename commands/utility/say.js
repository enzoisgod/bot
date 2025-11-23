const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('Le bot répète votre message.')
        .addStringOption(option =>
            option.setName('message')
            .setDescription('Le message à répéter')
            .setRequired(true)
        ),
    async execute(interaction) {
        const message = interaction.options.getString('message');
        await interaction.reply(message);
    }
};
