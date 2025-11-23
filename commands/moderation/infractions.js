const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('fs');
const path = require('path');
const warnFile = path.join(__dirname, '../../data/warns.json');
module.exports = {
data: new SlashCommandBuilder()
.setName('infractions')
.setDescription('Voir les avertissements d’un membre')
.addUserOption(o => o.setName('user').setDescription('Utilisateur').setRequired(true))
.setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
async execute(interaction) {
const user = interaction.options.getUser('user');
if (!fs.existsSync(warnFile)) return interaction.reply({ content: 'Aucune donnée.', ephemeral: true });
const data = JSON.parse(fs.readFileSync(warnFile));
if (!data[user.id] || data[user.id].length === 0) return interaction.reply({ content: 'Aucune infraction.', ephemeral: true });
const embed = new EmbedBuilder()
.setTitle(`Infractions de ${user.tag}`)
.setDescription(data[user.id].map(w => `• ${w.reason} par <@${w.staff}> le ${new Date(w.date).toLocaleString()}`).join('\n'))
.setTimestamp();
interaction.reply({ embeds: [embed] });
}
};