const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
const config = require('./config.json');

const commands = [];
const commandsPath = path.join(__dirname, 'commands');

function loadCommands(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) loadCommands(full);
    else if (file.endsWith('.js')) {
      const cmd = require(full);
      if (cmd.data) commands.push(cmd.data.toJSON());
    }
  }
}

loadCommands(commandsPath);

const rest = new REST({ version: '10' }).setToken(config.token);

(async () => {
  try {
    console.log('📡 Enregistrement des commandes…');

    // Enregistrement dans une guild spécifique (rapide)
    if (config.guildId) {
      await rest.put(
        Routes.applicationGuildCommands(config.clientId, config.guildId),
        { body: commands },
      );
      console.log('✔️ Commandes enregistrées (guild) !');
    } else {
      // Enregistrement global (peut prendre 1h)
      await rest.put(
        Routes.applicationCommands(config.clientId),
        { body: commands },
      );
      console.log('✔️ Commandes enregistrées (globales) !');
    }

  } catch (error) {
    console.error(error);
  }
})();
