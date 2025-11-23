const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roll')
        .setDescription('Tire un nombre aléatoire entre 1 et le nombre donné.')
        .addIntegerOption(option => 
            option.setName('max')
            .setDescription('Nombre maximum')
            .setRequired(true)
        ),
    async execute(interaction) {
        const max = interaction.options.getInteger('max');
        const result = Math.floor(Math.random() * max) + 1;
        await interaction.reply(`🎲 Vous avez obtenu : ${result}`);
    }
};
