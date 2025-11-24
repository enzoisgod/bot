const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const eco = require('../../utils/economie');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('adminmoney')
        .setDescription('Admin : gérer l’argent de quelqu’un')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addUserOption(opt =>
            opt.setName('membre').setDescription('Membre à modifier').setRequired(true)
        )
        .addStringOption(opt =>
            opt.setName('action')
                .setDescription('Action à effectuer')
                .setRequired(true)
                .addChoices(
                    { name: 'Ajouter', value: 'add' },
                    { name: 'Retirer', value: 'remove' },
                    { name: 'Définir', value: 'set' }
                )
        )
        .addIntegerOption(opt =>
            opt.setName('montant').setDescription('Montant d’argent').setRequired(true)
        ),

    async execute(interaction) {
        const user = interaction.options.getUser('membre');
        const action = interaction.options.getString('action');
        const amount = interaction.options.getInteger('montant');

        let money = eco.getBalance(user.id);

        if (action === "add") money += amount;
        if (action === "remove") money = Math.max(money - amount, 0);
        if (action === "set") money = amount;

        eco.setBalance(user.id, money);

        return interaction.reply({
            content: `💰 **${user.username}** a maintenant **${money}€**.`,
            ephemeral: true
        });
    }
};
