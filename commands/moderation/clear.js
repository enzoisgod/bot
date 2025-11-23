const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
module.exports = {
data: new SlashCommandBuilder()
.setName('clear')
.setDescription('Supprimer des messages')
.addIntegerOption(o => o.setName('nombre').setDescription('Nombre de messages à supprimer').setRequired(true))
.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
async execute(interaction) {
const amount = interaction.options.getInteger('nombre');
const messages = await interaction.channel.messages.fetch({ limit: amount });
await interaction.channel.bulkDelete(messages, true);
interaction.reply({ content: `✅ ${messages.size} messages supprimés`, ephemeral: true });
}
};