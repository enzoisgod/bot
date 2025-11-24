const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/economie.json');

if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, JSON.stringify({}, null, 4));

function load() {
    return JSON.parse(fs.readFileSync(filePath));
}
function save(data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
}
function getBalance(userId) {
    const data = load();
    return (data[userId] && data[userId].money) || 0;
}
function setBalance(userId, amount) {
    const data = load();
    if (!data[userId]) data[userId] = {};
    data[userId].money = amount;
    save(data);
}
function addBalance(userId, amount) {
    const data = load();
    if (!data[userId]) data[userId] = {};
    data[userId].money = (data[userId].money || 0) + amount;
    save(data);
}
function removeBalance(userId, amount) {
    const data = load();
    if (!data[userId]) data[userId] = {};
    data[userId].money = Math.max(0, (data[userId].money || 0) - amount);
    save(data);
}

module.exports = { getBalance, setBalance, addBalance, removeBalance };
