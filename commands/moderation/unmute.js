const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
module.exports = {
data: new SlashCommandBuilder()
.setName('unmute')
.setDescription('Retirer le mute d’un membre')
.addUserOption(o => o.setName('user').setDescription('Utilisateur').setRequired(true))
.setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
async execute(interaction) {
const member = interaction.options.getMember('user');
if (!member) return interaction.reply({ content: 'Membre introuvable.', ephemeral: true });
await member.timeout(null, 'Unmute');
interaction.reply({ content: `Utilisateur unmute: ${member.user.tag}`, ephemeral: false });
}
};