const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('meme')
        .setDescription('Affiche un meme aléatoire.'),
    async execute(interaction) {
        const response = await fetch('https://meme-api.com/gimme');
        const meme = await response.json();

        const embed = new EmbedBuilder()
            .setTitle(meme.title)
            .setImage(meme.url)
            .setFooter({ text: `Subreddit: ${meme.subreddit}` })
            .setColor('Random');

        await interaction.reply({ embeds: [embed] });
    }
};
