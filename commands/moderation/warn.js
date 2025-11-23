const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('fs');
const path = require('path');

// Chemin correct vers le fichier JSON des warns
const warnFile = path.join(__dirname, '../../data/warns.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('warn')
    .setDescription('Ajouter un avertissement à un membre')
    .addUserOption(o => o.setName('user').setDescription('Utilisateur').setRequired(true))
    .addStringOption(o => o.setName('reason').setDescription('Raison'))
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason') || 'Non spécifiée';
    
    // Charger le fichier JSON
    let data = {};
    if (fs.existsSync(warnFile)) {
      data = JSON.parse(fs.readFileSync(warnFile, 'utf8'));
    }

    // Initialiser si pas encore de données pour l'utilisateur
    if (!data[user.id]) data[user.id] = [];

    // Ajouter le warn
    data[user.id].push({
      reason,
      staff: interaction.user.id,
      date: new Date().toISOString()
    });

    // Écrire le fichier
    fs.writeFileSync(warnFile, JSON.stringify(data, null, 2));

    // Réponse à l'interaction
    interaction.reply({ content: `⚠️ ${user.tag} a été warn pour : ${reason}`, ephemeral: false });
  }
};
