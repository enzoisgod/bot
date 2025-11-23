const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');


module.exports = {
data: new SlashCommandBuilder()
.setName('ban')
.setDescription('Bannir un membre')
.addUserOption(o => o.setName('user').setDescription('Utilisateur').setRequired(true))
.addStringOption(o => o.setName('reason').setDescription('Raison'))
.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
async execute(interaction, client, config) {
const member = interaction.options.getUser('user');
const reason = interaction.options.getString('reason') || 'Non spécifiée';
const guildMember = await interaction.guild.members.fetch(member.id).catch(()=>null);
if (!guildMember) return interaction.reply({ content: "Membre introuvable.", ephemeral: true });
await guildMember.ban({ reason });
await interaction.reply({ content: `Utilisateur banni : ${member.tag}`, ephemeral: false });
// Option : logger
}
};