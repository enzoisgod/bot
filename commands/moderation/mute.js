const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
module.exports = {
data: new SlashCommandBuilder()
.setName('mute')
.setDescription('Mettre en sourdine un membre')
.addUserOption(o => o.setName('user').setDescription('Utilisateur').setRequired(true))
.addStringOption(o => o.setName('reason').setDescription('Raison'))
.setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
async execute(interaction) {
const member = interaction.options.getMember('user');
const reason = interaction.options.getString('reason') || 'Non spécifiée';
if (!member) return interaction.reply({ content: 'Membre introuvable.', ephemeral: true });
await member.timeout(10*60*1000, reason); // 10 minutes par défaut
interaction.reply({ content: `Utilisateur mute: ${member.user.tag} (10 min)`, ephemeral: false });
}
};