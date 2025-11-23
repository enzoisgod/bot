const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('8ball')
        .setDescription('Pose une question et l’Oracle 8ball répond.')
        .addStringOption(option => 
            option.setName('question')
            .setDescription('Votre question')
            .setRequired(true)
        ),
    async execute(interaction) {
        const answers = [
            "Oui",
            "Non",
            "Peut-être",
            "Certainement",
            "Jamais",
            "Demande plus tard"
        ];
        const reply = answers[Math.floor(Math.random() * answers.length)];
        await interaction.reply(`🎱 Question : ${interaction.options.getString('question')}\nRéponse : ${reply}`);
    }
};
