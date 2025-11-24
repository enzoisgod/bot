const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("daily")
        .setDescription("Récupère ta récompense quotidienne !"),

    async execute(interaction, client) {
        const user = interaction.user;
        const data = client.economy.load();

        if (!data[user.id])
            data[user.id] = { money: 0, lastDaily: null };

        const last = data[user.id].lastDaily;
        const now = Date.now();

        // 24h = 86400000 ms
        if (last && now - last < 86400000) {
            const reste = Math.ceil((86400000 - (now - last)) / 3600000);
            return interaction.reply(
                `❌ Tu as déjà pris ton daily ! Reviens dans **${reste}h**.`
            );
        }

        const reward = 200; // montant du daily
        data[user.id].money += reward;
        data[user.id].lastDaily = now;

        client.economy.save(data);

        interaction.reply(`🎉 Tu as gagné **${reward} 💸** aujourd'hui !`);
    }
};
