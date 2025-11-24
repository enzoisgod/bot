const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("shop")
        .setDescription("Affiche la boutique"),

    async execute(interaction) {
        const shop = JSON.parse(
            fs.readFileSync(path.join(__dirname, "../../data/shop.json"))
        );

        const embed = new EmbedBuilder()
            .setTitle("🛒 Boutique Effexe")
            .setColor("#ffaa00");

        embed.setDescription(
            shop.items.map(i => `**${i.id}. ${i.name}** — ${i.price} 💸`).join("\n")
        );

        interaction.reply({ embeds: [embed] });
    }
};
