const fs = require('fs');
const path = require('path');

// ⚠️ IMPORTANT : un seul fichier pour TOUTE l’économie
const filePath = path.join(__dirname, '../data/economy.json');

// Crée le fichier si il existe pas
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({}, null, 4));
}

// Charge
function load() {
    try {
        return JSON.parse(fs.readFileSync(filePath));
    } catch {
        return {};
    }
}

// Sauvegarde
function save(data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
}

// GET
function getBalance(userId) {
    const data = load();
    return data[userId] || 0;
}

// SET
function setBalance(userId, amount) {
    const data = load();
    data[userId] = amount;
    save(data);
}

// ADD
function addBalance(userId, amount) {
    const data = load();
    data[userId] = (data[userId] || 0) + amount;
    save(data);
}

// REMOVE
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
