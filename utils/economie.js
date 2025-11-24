const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/economie.json');

// Vérifie que le fichier existe
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({}, null, 4));
}

// Charge les données en sécurisant contre les fichiers corrompus
function load() {
    try {
        const raw = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(raw);

        // Si le JSON n'est pas un objet : reset
        if (typeof data !== "object" || Array.isArray(data)) {
            console.error("⚠️ economie.json était invalide, réinitialisation...");
            save({});
            return {};
        }

        return data;
    } catch (err) {
        console.error("⚠️ Erreur lecture economie.json, réinitialisation :", err);
        save({});
        return {};
    }
}

// Sauvegarde
function save(data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
}

// Récupère l'argent d’un utilisateur
function getBalance(userId) {
    const data = load();
    return data[userId]?.money || 0;
}

// Remplace complètement l'argent d’un utilisateur
function setBalance(userId, amount) {
    const data = load();
    data[userId] = { money: amount };
    save(data);
}

// Ajoute de l'argent
function addBalance(userId, amount) {
    const data = load();
    if (!data[userId]) data[userId] = { money: 0 };
    data[userId].money += amount;
    save(data);
}

// Retire de l'argent
function removeBalance(userId, amount) {
    const data = load();
    if (!data[userId]) data[userId] = { money: 0 };
    data[userId].money = Math.max(0, data[userId].money - amount);
    save(data);
}

module.exports = {
    getBalance,
    setBalance,
    addBalance,
    removeBalance
};
