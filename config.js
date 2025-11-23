const config = {
  token: process.env.TOKEN,
  clientId: process.env.CLIENT_ID,
  guildId: process.env.GUILD_ID,
  logChannelId: process.env.LOG_CHANNEL_ID,
  guildRoleId: process.env.GUILD_ROLE_ID,
  ownerIds: process.env.OWNER_IDS ? process.env.OWNER_IDS.split(',') : []
};

module.exports = config;
