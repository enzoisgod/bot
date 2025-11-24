const { SlashCommandBuilder } = require('discord.js');
const eco = require('../../utils/economie');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pay')
        .setDescription('Donner de l’argent à un membre')
        .addUserOption(opt =>
            opt.setName('membre').setDescription('Personne à payer').setRequired(true)
        )
        .addIntegerOption(opt =>
            opt.setName('montant').setDescription('Montant à envoyer').setRequired(true)
        ),

    async execute(interaction) {
        const target = interaction.options.getUser('membre');
        const amount = interaction.options.getInteger('montant');
        const sender = interaction.user;

        if (target.id === sender.id)
            return interaction.reply({ content: "❌ Tu ne peux pas te payer toi-même.", ephemeral: true });

        // Argent actuel
        let senderMoney = eco.getBalance(sender.id);
        let targetMoney = eco.getBalance(target.id);

        // Vérifie que l’émetteur a assez
        if (senderMoney < amount)
            return interaction.reply({ content: "❌ Tu n’as pas assez d’argent.", ephemeral: true });

        // On transfère
        senderMoney -= amount;
        targetMoney += amount;

        eco.setBalance(sender.id, senderMoney);
        eco.setBalance(target.id, targetMoney);

        interaction.reply(`💸 **${sender.username}** a envoyé **${amount}€** à **${target.username}** !`);
    }
};
