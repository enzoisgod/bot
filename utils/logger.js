const { EmbedBuilder, AuditLogEvent } = require('discord.js');
const config = require('../config.js');

// Retourne le channel de logs
function getLogChannel(client) {
    if (!config.logChannelId) return null;
    return client.channels.cache.get(config.logChannelId) || null;
}

// Fonction utilitaire pour envoyer un embed + console.log
async function sendLog(client, embed, text = '') {
    const ch = getLogChannel(client);
    if (!ch) return;
    if (text) console.log('[LOG]', text);
    await ch.send({ embeds: [embed] }).catch(console.error);
}

module.exports = {
    // Membre rejoint
    async memberJoin(member) {
        const embed = new EmbedBuilder()
            .setTitle('📥 Membre rejoint')
            .setDescription(`${member.user.tag} (${member.id})`)
            .setColor('Green')
            .setFooter({ text: 'Effexe • New Era' })
            .setTimestamp();

        await sendLog(member.client, embed, `Membre rejoint: ${member.user.tag}`);
    },

    // Membre quitte
    async memberLeave(member) {
        const embed = new EmbedBuilder()
            .setTitle('📤 Membre quitté')
            .setDescription(`${member.user.tag} (${member.id})`)
            .setColor('Red')
            .setFooter({ text: 'Effexe • New Era' })
            .setTimestamp();

        await sendLog(member.client, embed, `Membre quitté: ${member.user.tag}`);
    },

    // Message supprimé
    async messageDelete(message) {
        if (!message.author) return;
        const embed = new EmbedBuilder()
            .setTitle('🗑 Message supprimé')
            .setDescription(`Auteur: ${message.author.tag}\nContenu: ${message.content || '[Aucun contenu]'}\nSalon: ${message.channel?.name || 'Inconnu'}`)
            .setColor('DarkRed')
            .setFooter({ text: 'Effexe • New Era' })
            .setTimestamp();

        await sendLog(message.client, embed, `Message supprimé par ${message.author.tag}`);
    },

    // Message édité
    async messageUpdate(oldMessage, newMessage) {
        if (!oldMessage.author || oldMessage.content === newMessage.content) return;

        const embed = new EmbedBuilder()
            .setTitle('✏️ Message édité')
            .setDescription(`Auteur: ${oldMessage.author.tag}\nAvant: ${oldMessage.content || '[Aucun contenu]'}\nAprès: ${newMessage.content || '[Aucun contenu]'}\nSalon: ${oldMessage.channel?.name || 'Inconnu'}`)
            .setColor('Orange')
            .setFooter({ text: 'Effexe • New Era' })
            .setTimestamp();

        await sendLog(oldMessage.client, embed, `Message édité par ${oldMessage.author.tag}`);
    },

    // Membre banni
    async memberBan(guild, user) {
        const embed = new EmbedBuilder()
            .setTitle('⛔ Membre banni')
            .setDescription(`${user.tag} (${user.id})`)
            .setColor('DarkRed')
            .setFooter({ text: 'Effexe • New Era' })
            .setTimestamp();

        await sendLog(guild.client, embed, `Membre banni: ${user.tag}`);
    },

    // Membre unban
    async memberUnban(guild, user) {
        const embed = new EmbedBuilder()
            .setTitle('✅ Membre débanni')
            .setDescription(`${user.tag} (${user.id})`)
            .setColor('Green')
            .setFooter({ text: 'Effexe • New Era' })
            .setTimestamp();

        await sendLog(guild.client, embed, `Membre débanni: ${user.tag}`);
    },

    // Boost serveur
    async serverBoost(member) {
        const embed = new EmbedBuilder()
            .setTitle('🚀 Boost serveur')
            .setDescription(`${member.user.tag} a boosté le serveur !`)
            .setColor('Purple')
            .setFooter({ text: 'Effexe • New Era' })
            .setTimestamp();

        await sendLog(member.client, embed, `Boost serveur: ${member.user.tag}`);
    }
};
