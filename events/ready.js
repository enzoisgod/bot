module.exports = {
  name: 'ready',
  once: true,
  async execute(client) {
    console.log(`${client.user.tag} prêt`);

    // Statut personnalisé
    client.user.setPresence({
      activities: [{ name: 'Version : 1.0.0 (New Era)', type: 3 }], // type 3 = WATCHING
      status: 'online'
    });
  }
};

