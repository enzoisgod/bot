const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('version')
    .setDescription('Affiche les informations de version du serveur'),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('📜 Informations Version')
      .addFields(
        { name: 'Créateur', value: 'Enzoisgod (effexe)', inline: true },
        { name: 'Version actuelle', value: 'New Era', inline: true },
        { name: 'Version précédente', value: 'Script', inline: true }
      )
      .setFooter({ text: 'Effexe • New Era' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }
};
