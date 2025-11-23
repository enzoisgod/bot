const logger = require('../utils/logger');
const autoRole = require('../utils/autorole');

module.exports = {
  name: 'guildMemberAdd',
  async execute(member) {
    // Log de l'arrivée
    logger.memberJoin(member);

    // Vérification du pseudo pour auto-role
    autoRole.check(member);
  }
};
