const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription('Mettre en sourdine un membre')
        .addUserOption(o => o.setName('user').setDescription('Utilisateur').setRequired(true))
        .addStringOption(o => o.setName('reason').setDescription('Raison'))
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') || 'Non spécifiée';

        // Récupérer le membre depuis le serveur
        const member = await interaction.guild.members.fetch(user.id).catch(() => null);
        if (!member) return interaction.reply({ content: 'Membre introuvable.', ephemeral: true });

        // Vérifie que le bot peut timeout ce membre
        if (!member.moderatable) return interaction.reply({ content: 'Je ne peux pas mute ce membre.', ephemeral: true });

        try {
            await member.timeout(10 * 60 * 1000, reason); // 10 minutes
            interaction.reply({ content: `Utilisateur mute : ${member.user.tag} (10 min)\nRaison : ${reason}`, ephemeral: false });
        } catch (err) {
            console.error(err);
            interaction.reply({ content: 'Erreur lors de la tentative de mute.', ephemeral: true });
        }
    }
};
