const logger = require('../utils/logger.js');

module.exports = (client) => {
    // Membre rejoint
    client.on('guildMemberAdd', member => {
        logs.memberJoin(member);
    });

    // Membre quitte
    client.on('guildMemberRemove', member => {
        logs.memberLeave(member);
    });

    // Message supprimé
    client.on('messageDelete', message => {
        if (message.author.bot) return;
        logs.messageDelete(message);
    });

    // Message édité (optionnel)
    client.on('messageUpdate', (oldMessage, newMessage) => {
        if (oldMessage.author.bot) return;
        logs.messageUpdate(oldMessage, newMessage);
    });

    // Membre banni
    client.on('guildBanAdd', ban => {
        logs.memberBan(ban.guild, ban.user);
    });

    // Membre unbanni
    client.on('guildBanRemove', ban => {
        logs.memberUnban(ban.guild, ban.user);
    });
};
