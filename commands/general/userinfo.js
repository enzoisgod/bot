const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Affiche les informations d’un membre.')
        .addUserOption(option => 
            option.setName('membre')
            .setDescription('Le membre à afficher')
            .setRequired(false)
        ),
    async execute(interaction) {
        const user = interaction.options.getUser('membre') || interaction.user;
        const member = interaction.guild.members.cache.get(user.id);

        const embed = new EmbedBuilder()
            .setTitle(`Informations sur ${user.tag}`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: 'ID', value: user.id, inline: true },
                { name: 'Pseudo', value: user.username, inline: true },
                { name: 'Surnom', value: member ? (member.nickname || 'Aucun') : 'Aucun', inline: true },
                { name: 'Date d\'arrivée', value: member ? `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>` : 'Inconnu', inline: true },
                { name: 'Rôles', value: member ? member.roles.cache.map(r => r).join(', ').replace(/@everyone,?/, '') || 'Aucun' : 'Aucun' }
            )
            .setColor('Random')
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};
