const { Events, ActivityType } = require('discord.js'); 

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`${client.user.tag} est prêt !`);

        const statuses = [
            { name: 'Effexe - New Era' },
            { name: 'Créateur: Enzo' },
            { name: 'Utilisez /help' },
            { name: 'Utilisez /Daily' },
            { name: '💻 Développement en cours' }
        ];

        let i = 0;
        setInterval(() => {
            try {
                const status = statuses[i % statuses.length];
                client.user.setActivity({
                    name: status.name,
                    type: ActivityType.Streaming,
                    url: "https://twitch.tv/discord" // OBLIGATOIRE pour le streaming
                });
                i++;
            } catch (err) {
                console.error("Erreur en changeant le statut :", err);
            }
        }, 5000); // change toutes les 5 secondes
    }
};
