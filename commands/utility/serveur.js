const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serveur')
        .setDescription('Affiche le lien du serveur Discord'),

    async execute(interaction) {
        const serverInvite = "https://discord.gg/qBH8f4sRnV";

        const embed = new EmbedBuilder()
            .setTitle("🌐 Serveur Discord Effexe")
            .setDescription(`Voici le lien pour rejoindre notre communauté :\n\n🔗 **${serverInvite}**`)
            .setColor("#2b2d31")
            .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
            .setFooter({ text: "Effexe - New Era", iconURL: interaction.client.user.displayAvatarURL() })
            .setTimestamp();

        await interaction.reply({ embeds: [embed], ephemeral: false });
    }
};
