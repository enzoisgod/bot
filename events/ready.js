const { Events, ActivityType } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`${client.user.tag} est prêt !`);

        const statuses = [
            { name: 'Effexe - New Era', type: ActivityType.Playing },
            { name: 'Créateur: Enzo', type: ActivityType.Watching },
            { name: 'Utilisez /help', type: ActivityType.Listening },
            { name: '💻 Développement en cours', type: ActivityType.Playing }
        ];

        let i = 0;
        setInterval(() => {
            const status = statuses[i % statuses.length];
            client.user.setActivity(status.name, { type: status.type }).catch(console.error);
            i++;
        }, 5000); // change toutes les 5 secondes
    }
};
