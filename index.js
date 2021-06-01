/**
 * Survey-Bot server.
 *
 * @copyright © Nick Freear 2021.
 */

const { dockStart } = require('@nlpjs/basic');
const { loadEnv } = require('@nlpjs/core-loader');

const CONFIG = require('./bot-config.json');

(async () => {
  loadEnv();

  const { PORT } = process.env;

  console.log(`Port: ${PORT}.\nArgv:`, process.argv);

  const argc = process.argv.length;
  const matches = argc > 2 ? process.argv[argc - 1].match(/--port=(\d{4})/) : null;
  const port = parseInt(matches ? matches[1] : PORT ? PORT : null);

  if (port) {
    CONFIG.settings['api-server'].port = port;
  }

  const dock = await dockStart(CONFIG);

  // console.log('Dock:', dock);
})();
