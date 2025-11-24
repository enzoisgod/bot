const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("balance")
        .setDescription("Affiche votre argent ou celui d'un utilisateur")
        .addUserOption(o =>
            o.setName("user")
             .setDescription("Utilisateur")
        ),

    async execute(interaction, client) {
        const user = interaction.options.getUser("user") || interaction.user;

        const data = client.economy.load();
        const bal = data[user.id]?.money || 0;

        const embed = new EmbedBuilder()
            .setTitle(`💰 Balance de ${user.username}`)
            .setDescription(`**${bal} 💸**`)
            .setColor("#00ff99");

        interaction.reply({ embeds: [embed] });
    }
};

