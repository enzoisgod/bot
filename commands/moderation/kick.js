const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
module.exports = {
data: new SlashCommandBuilder()
.setName('kick')
.setDescription('Expulser un membre')
.addUserOption(o => o.setName('user').setDescription('Utilisateur').setRequired(true))
.addStringOption(o => o.setName('reason').setDescription('Raison'))
.setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
async execute(interaction) {
const member = interaction.options.getUser('user');
const reason = interaction.options.getString('reason') || 'Non spécifiée';
const guildMember = await interaction.guild.members.fetch(member.id).catch(()=>null);
if (!guildMember) return interaction.reply({ content: "Membre introuvable.", ephemeral: true });
await guildMember.kick(reason);
await interaction.reply({ content: `Utilisateur expulsé : ${member.tag}`, ephemeral: false });
}
};