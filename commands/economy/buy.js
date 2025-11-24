const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("buy")
        .setDescription("Acheter un item du shop")
        .addIntegerOption(o =>
            o.setName("id")
             .setDescription("ID de l'item")
             .setRequired(true)
        ),

    async execute(interaction, client) {
        const id = interaction.options.getInteger("id");

        const shop = JSON.parse(
            fs.readFileSync(path.join(__dirname, "../../data/shop.json"))
        );

        const item = shop.items.find(i => i.id === id);
        if (!item) return interaction.reply("❌ Cet item n'existe pas.");

        const data = client.economy.load();
        if (!data[interaction.user.id]) data[interaction.user.id] = { money: 0 };

        if (data[interaction.user.id].money < item.price)
            return interaction.reply("❌ Tu n'as pas assez d'argent.");

        data[interaction.user.id].money -= item.price;
        client.economy.save(data);

        interaction.reply(`✅ Tu as acheté **${item.name}** pour **${item.price} 💸** !`);
    }
};
