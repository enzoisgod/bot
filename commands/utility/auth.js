const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const config = require('../../config.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('auth')
    .setDescription('S’authentifier pour rejoindre la Guilde Effexe'),

  async execute(interaction) {
    const roleId = config.guildRoleId;
    const role = interaction.guild.roles.cache.get(roleId);
    if (!role) return interaction.reply({ content: 'Rôle introuvable.', ephemeral: true });

    // Vérification du pseudo
    const displayName = interaction.member.displayName || interaction.user.username;
    if (!displayName.includes('♱')) {
      return interaction.reply({ content: '❌ Vous devez avoir "♱" dans votre pseudo pour vous authentifier.', ephemeral: true });
    }

    await interaction.member.roles.add(role).catch(()=>{});

    const embed = new EmbedBuilder()
      .setTitle('✔️ Authentification réussie')
      .setDescription('Vous avez été ajouté à la **Guild Effexe**.')
      .setFooter({ text: 'Effexe • New Era' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed], ephemeral: true });
  }

};
