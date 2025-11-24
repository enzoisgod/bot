const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/economie.json');

// Vérifie que le fichier existe, sinon le créer proprement
if (!fs.existsSync(filePath)) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify({}, null, 4));
}

// Charge les données (avec protection anti-crash JSON)
function load() {
    try {
        const raw = fs.readFileSync(filePath);
        return JSON.parse(raw);
    } catch (err) {
        console.error("❌ ERREUR JSON economy:", err);
        // reset si JSON corrompu
        fs.writeFileSync(filePath, JSON.stringify({}, null, 4));
        return {};
    }
}

// Sauvegarde sécurisée
function save(data) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
    } catch (err) {
        console.error("❌ ERREUR SAVE economy:", err);
    }
}

// Balance
function getBalance(userId) {
    const data = load();
    return data[userId] || 0;
}

function setBalance(userId, amount) {
    const data = load();
    data[userId] = amount;
    save(data);
}

function addBalance(userId, amount) {
    const data = load();
    data[userId] = (data[userId] || 0) + amount;
    save(data);
}

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
