const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/economie.json');

// Vérifie que le fichier existe, sinon le créer
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({}, null, 4));
}

// Charge les données
function load() {
    try {
        const raw = fs.readFileSync(filePath);
        return JSON.parse(raw);
    } catch (err) {
        console.error("Erreur lors du chargement de l'économie :", err);
        return {};
    }
}

// Sauvegarde les données
function save(data) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
    } catch (err) {
        console.error("Erreur lors de la sauvegarde de l'économie :", err);
    }
}

// Initialise un utilisateur si nécessaire
function initUser(userId) {
    const data = load();
    if (!data[userId]) {
        data[userId] = { money: 0, lastDaily: null };
        save(data);
    }
    return data[userId];
}

// Récupère le balance d’un utilisateur
function getBalance(userId) {
    return initUser(userId).money;
}

// Modifie le balance d’un utilisateur
function setBalance(userId, amount) {
    const user = initUser(userId);
    user.money = amount;
    const data = load();
    data[userId] = user;
    save(data);
}

// Ajoute un montant
function addBalance(userId, amount) {
    const user = initUser(userId);
    user.money += amount;
    const data = load();
    data[userId] = user;
    save(data);
}

// Retire un montant
function removeBalance(userId, amount) {
    const user = initUser(userId);
    user.money = Math.max(0, user.money - amount);
    const data = load();
    data[userId] = user;
    save(data);
}

module.exports = {
    getBalance,
    setBalance,
    addBalance,
    removeBalance
};

