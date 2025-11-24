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
        const question = interaction.options.getString('question').toLowerCase();

        // Réponses normales
        const answers = [
            "Oui",
            "Non",
            "Peut-être",
            "Certainement",
            "Jamais",
            "Demande plus tard"
        ];

        // 🔥 CONDITIONS SPÉCIALES
        if (question.includes("effexe") || question.includes("enzoisgod")) {
            return interaction.reply(`🎱 Question : ${question}\nRéponse : **Le meilleur.**`);
        }

        // Réponse normale
        const reply = answers[Math.floor(Math.random() * answers.length)];

        return interaction.reply(`🎱 Question : ${question}\nRéponse : ${reply}`);
    }
};

