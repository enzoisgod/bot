const config = require('../config.json');


module.exports = {
async check(member) {
if (!member || !member.user) return;
const roleId = config.guildRoleId;
if (!roleId) return;


const hasSymbol = member.displayName.includes('♱') || member.user.username.includes('♱');
const role = member.guild.roles.cache.get(roleId);


if (!role) return;


if (hasSymbol) {
if (!member.roles.cache.has(roleId)) {
await member.roles.add(roleId).catch(()=>{});
}
} else {
if (member.roles.cache.has(roleId)) {
await member.roles.remove(roleId).catch(()=>{});
}
}
}
};