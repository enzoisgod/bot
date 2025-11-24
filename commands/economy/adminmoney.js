const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/economie.json');

// Vérifie que le fichier existe, sinon le créer
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({}, null, 4));
}

// Charge les données
function load() {
    return JSON.parse(fs.readFileSync(filePath));
}

// Sauvegarde les données
function save(data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
}

// Récupère le balance d’un utilisateur
function getBalance(userId) {
    const data = load();
    return data[userId] || 0;
}

// Modifie le balance d’un utilisateur
function setBalance(userId, amount) {
    const data = load();
    data[userId] = amount;
    save(data);
}

// Ajoute un montant
function addBalance(userId, amount) {
    const data = load();
    data[userId] = (data[userId] || 0) + amount;
    save(data);
}

// Retire un montant
function removeBalance(userId, amount) {
    const data = load();
    data[userId] = Math.max(0, (data[userId] || 0) - amount);
    save(data);
}

module.exports = {
    getBalance,
    setBalance,
    addBalance,
    removeBalance
};
