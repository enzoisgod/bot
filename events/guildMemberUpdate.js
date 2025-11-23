const fs = require('fs');
const path = require('path');
const trackFile = path.join(__dirname, '../data/track.json');

module.exports = {
  name: 'guildMemberUpdate',
  async execute(oldMember, newMember) {
    const data = JSON.parse(fs.readFileSync(trackFile, 'utf8'));

    if (oldMember.displayName !== newMember.displayName) {
      if (!data[newMember.id]) data[newMember.id] = { pseudos: [], lastOnline: null };
      data[newMember.id].pseudos.push(newMember.displayName);
      fs.writeFileSync(trackFile, JSON.stringify(data, null, 2));
    }

    // mettre à jour la dernière connexion
    data[newMember.id] = data[newMember.id] || { pseudos: [], lastOnline: null };
    data[newMember.id].lastOnline = new Date().toISOString();
    fs.writeFileSync(trackFile, JSON.stringify(data, null, 2));
  }
};
