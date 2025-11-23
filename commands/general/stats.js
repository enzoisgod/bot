const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription('Affiche les statistiques du serveur.'),
    async execute(interaction) {
        const guild = interaction.guild;

        const embed = new EmbedBuilder()
            .setTitle(`Statistiques du serveur ${guild.name}`)
            .addFields(
                { name: 'Membres totaux', value: `${guild.memberCount}`, inline: true },
                { name: 'Salons', value: `${guild.channels.cache.size}`, inline: true },
                { name: 'Rôles', value: `${guild.roles.cache.size}`, inline: true },
                { name: 'Boosts', value: `${guild.premiumSubscriptionCount}`, inline: true }
            )
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .setColor('Random')
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};
