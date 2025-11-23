const { EmbedBuilder } = require('discord.js');
const config = require('../config.js');

// Retourne le channel de logs
function getLogChannel(client) {
  if (!config.logChannelId) return null;
  return client.channels.cache.get(config.logChannelId) || null;
}

module.exports = {
  // Log quand un membre rejoint
  async memberJoin(member) {
    const ch = getLogChannel(member.client);
    if (!ch) return;

    const embed = new EmbedBuilder()
      .setTitle('📥 Membre rejoint')
      .setDescription(`${member.user.tag} (${member.id})`)
      .setFooter({ text: 'Effexe • New Era' })
      .setTimestamp();

    await ch.send({ embeds: [embed] }).catch(() => {});
  },

  // Log quand un membre quitte
  async memberLeave(member) {
    const ch = getLogChannel(member.client);
    if (!ch) return;

    const embed = new EmbedBuilder()
      .setTitle('📤 Membre quitté')
      .setDescription(`${member.user.tag} (${member.id})`)
      .setFooter({ text: 'Effexe • New Era' })
      .setTimestamp();

    await ch.send({ embeds: [embed] }).catch(() => {});
  },

  // Log suppression de message
  async messageDelete(message) {
    const ch = getLogChannel(message.client);
    if (!ch) return;

    const embed = new EmbedBuilder()
      .setTitle('🗑 Message supprimé')
      .setDescription(`Auteur: ${message.author.tag}\nContenu: ${message.content}`)
      .setFooter({ text: 'Effexe • New Era' })
      .setTimestamp();

    await ch.send({ embeds: [embed] }).catch(() => {});
  }
};

