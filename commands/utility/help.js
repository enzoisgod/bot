const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits
} = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Affiche la liste des commandes et leurs catégories"),

  async execute(interaction) {

    // Récupère le dossier /commands
    const commandsDir = path.join(__dirname, "..");

    let categoriesEmbed = [];

    // Parcours des catégories
    fs.readdirSync(commandsDir).forEach(category => {
      const categoryPath = path.join(commandsDir, category);
      if (!fs.lstatSync(categoryPath).isDirectory()) return;

      let cmds = [];

      // Parcours des fichiers dans chaque catégorie
      fs.readdirSync(categoryPath).forEach(file => {
        if (!file.endsWith(".js")) return;
        const cmd = require(path.join(categoryPath, file));

        if (cmd.data) {
          cmds.push(`• **${cmd.data.name}** — ${cmd.data.description || "Aucune description"}`);
        }
      });

      if (cmds.length > 0) {
        categoriesEmbed.push({
          name: `📂 ${category.toUpperCase()}`,
          value: cmds.join("\n"),
          inline: false
        });
      }
    });

    // Embed stylé
    const embed = new EmbedBuilder()
      .setColor("#2f3136")
      .setTitle("📜 Liste des commandes")
      .setDescription("Voici toutes les commandes disponibles sur le bot.")
      .addFields(categoriesEmbed)
      .setFooter({
        text: "Créé par Effexe • New Era",
      })
      .setTimestamp();

    await interaction.reply({ embeds: [embed], ephemeral: false });
  },
};
