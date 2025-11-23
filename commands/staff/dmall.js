const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const config = require('../../config.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('dmall')
    .setDescription('Envoyer un DM à tous les membres (Staff uniquement)')
    .addStringOption(opt => opt.setName('message').setDescription('Message à envoyer').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

  async execute(interaction) {
    const message = interaction.options.getString('message');

    let sentCount = 0;
    interaction.guild.members.cache.forEach(async member => {
      if (!member.user.bot) {
        try {
          await member.send(message);
          sentCount++;
        } catch {}
      }
    });

    await interaction.reply({ content: `✅ Message envoyé à ${sentCount} membres.`, ephemeral: true });
  }
};
