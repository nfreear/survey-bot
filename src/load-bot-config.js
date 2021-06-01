/**
 * Load and sanitize the Chat-bot configuration, from JSON + `.env`
 */

const { loadEnv } = require('@nlpjs/core-loader');

const CONFIG = require('../bot-config.json');

module.exports = { loadBotConfig };

function loadBotConfig () {
  loadEnv();

  const { HTTP_PORT } = process.env;

  console.log(`HTTP port: ${HTTP_PORT},\nArgv:`, process.argv);

  const argc = process.argv.length;
  const matches = argc > 2 ? process.argv[argc - 1].match(/--port=(\d{4})/) : null;
  const port = parseInt(matches ? matches[1] : HTTP_PORT ? HTTP_PORT : null);

  if (port) {
    CONFIG.settings['api-server'].port = port;
  }

  return CONFIG;
}
