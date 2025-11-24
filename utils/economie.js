const fs = require('fs');
const path = require('path');

// Chemin du fichier JSON contenant l'économie
const ecoFile = path.join(__dirname, '../data/economy.json');

// Si le fichier n'existe pas, on le crée
if (!fs.existsSync(ecoFile)) {
    fs.mkdirSync(path.join(__dirname, '../data'), { recursive: true });
    fs.writeFileSync(ecoFile, JSON.stringify({}, null, 2));
}

// Fonction pour charger les données
function loadMoney() {
    return JSON.parse(fs.readFileSync(ecoFile));
}

// Fonction pour sauvegarder les données
function saveMoney(data) {
    fs.writeFileSync(ecoFile, JSON.stringify(data, null, 2));
}

module.exports = {
    // Ajouter de l'argent
    addMoney(userId, amount) {
        const data = loadMoney();
        if (!data[userId]) data[userId] = 0;
        data[userId] += amount;
        saveMoney(data);
    },

    // Retirer de l'argent
    removeMoney(userId, amount) {
        const data = loadMoney();
        if (!data[userId]) data[userId] = 0;
        data[userId] -= amount;
        if (data[userId] < 0) data[userId] = 0;
        saveMoney(data);
    },

    // Obtenir l'argent d'un utilisateur
    getMoney(userId) {
        const data = loadMoney();
        return data[userId] || 0;
    }
};
