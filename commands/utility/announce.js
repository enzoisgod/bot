const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');


module.exports = {
data: new SlashCommandBuilder()
.setName('announce')
.setDescription('Envoyer une annonce stylée dans un channel')
.addChannelOption(opt => opt.setName('channel').setDescription('Channel cible').setRequired(true))
.addStringOption(opt => opt.setName('title').setDescription('Titre').setRequired(true))
.addStringOption(opt => opt.setName('message').setDescription('Message').setRequired(true))
.setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
async execute(interaction, client, config) {
const channel = interaction.options.getChannel('channel');
const title = interaction.options.getString('title');
const message = interaction.options.getString('message');


const embed = new EmbedBuilder()
.setTitle(title)
.setDescription(message)
.setFooter({ text: 'Effexe • New Era' })
.setTimestamp();


await channel.send({ embeds: [embed] });
await interaction.reply({ content: 'Annonce envoyée ✅', ephemeral: true });
}
};