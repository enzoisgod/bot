const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const trackFile = path.join(__dirname, '../../data/track.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('track')
    .setDescription('Voir l’historique pseudo et dernière connexion')
    .addUserOption(opt => opt.setName('user').setDescription('Utilisateur').setRequired(true)),

  async execute(interaction) {
    if (interaction.channel.name !== '💻・track') {
      return interaction.reply({ content: '❌ Cette commande ne peut être utilisée que dans #track', ephemeral: true });
    }

    const user = interaction.options.getUser('user');
    const data = JSON.parse(fs.readFileSync(trackFile, 'utf8'));

    if (!data[user.id]) {
      return interaction.reply({ content: 'Aucune donnée pour cet utilisateur.', ephemeral: true });
    }

    const embed = new EmbedBuilder()
      .setTitle(`Historique de ${user.tag}`)
      .addFields(
        { name: 'Pseudos', value: data[user.id].pseudos.join('\n') || 'Aucun', inline: false },
        { name: 'Dernière connexion (bot)', value: data[user.id].lastOnline || 'Inconnue', inline: false }
      )
      .setTimestamp();

    interaction.reply({ embeds: [embed] });
  }
};
