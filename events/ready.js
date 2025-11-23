module.exports = {
  name: 'ready',
  once: true,
  async execute(client) {
    console.log(`${client.user.tag} prêt`);

    // Statut personnalisé
    client.user.setPresence({
      activities: [{ name: 'Développe Effexe', type: 3 }], // type 3 = WATCHING
      status: 'online'
    });
  }
};
