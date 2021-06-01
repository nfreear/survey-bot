/**
 * Survey-Bot server.
 *
 * @copyright © Nick Freear 2021.
 */

const { dockStart } = require('@nlpjs/basic');
const { loadBotConfig } = require('./src/load-bot-config');

(async () => {
  const CONFIG = loadBotConfig();

  console.log('Bot config:', CONFIG);

  const dock = await dockStart(CONFIG);

  // console.log('Dock:', dock);
})();
