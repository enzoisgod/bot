const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const economy = require('../../utils/economie.js'); // chemin OK

module.exports = {
    data: new SlashCommandBuilder()
        .setName('adminmoney')
        .setDescription('Ajoute ou retire de l’argent à un utilisateur.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addUserOption(option => 
            option.setName('user')
            .setDescription('Utilisateur cible')
            .setRequired(true)
        )
        .addIntegerOption(option => 
            option.setName('montant')
            .setDescription('Montant à ajouter (positif) ou retirer (négatif)')
            .setRequired(true)
        ),

    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const amount = interaction.options.getInteger('montant');

        // --- Vérifications ---
        if (!user) {
            return interaction.reply({ 
                content: '❌ Utilisateur introuvable.', 
                ephemeral: true 
            });
        }

        if (amount === 0) {
            return interaction.reply({
                content: '❌ Le montant ne peut pas être **0**.',
                ephemeral: true
            });
        }

        // --- Vérification du module économie ---
        if (!economy.addBalance || !economy.removeBalance || !economy.getBalance) {
            return interaction.reply({
                content: '❌ Erreur : fonctions manquantes dans `economie.js`.',
                ephemeral: true
            });
        }

        // --- Ajout ou retrait ---
        if (amount > 0) {
            economy.addBalance(user.id, amount);
        } else {
            economy.removeBalance(user.id, Math.abs(amount));
        }

        // --- Récupération du solde ---
        const newBalance = economy.getBalance(user.id);

        // --- Réponse ---
        return interaction.reply({
            content: `💰 **${user.username}** a maintenant **${newBalance}$** !`,
            ephemeral: false
        });
    }
};
