const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const economy = require('../utils/economie.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('adminmoney')
        .setDescription('Ajoute ou retire de l’argent à un utilisateur.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator) // Seulement pour les admins
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Utilisateur cible')
                .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName('montant')
                .setDescription('Montant à ajouter (ou retirer si négatif)')
                .setRequired(true)
        ),

    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const amount = interaction.options.getInteger('montant');

        if (!user) return interaction.reply({
            content: "❌ Utilisateur introuvable.",
            ephemeral: true
        });

        if (amount === 0) {
            return interaction.reply({
                content: "❌ Le montant ne peut pas être 0.",
                ephemeral: true
            });
        }

        // Ajout ou retrait
        if (amount > 0) {
            economy.addBalance(user.id, amount);
        } else {
            economy.removeBalance(user.id, Math.abs(amount));
        }

        const newBal = economy.getBalance(user.id);

        return interaction.reply({
            content: `💰 **${user.username}** a maintenant **${newBal}$** !`,
            ephemeral: false
        });
    }
};
