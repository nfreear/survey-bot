/**
 * Load and sanitize the Chat-bot configuration, from JSON + `.env`
 */

const { loadSanitizeEnv } = require('./load-sanitize-env');
// const { loadEnv } = require('@nlpjs/core-loader');

const CONFIG = require('../bot-config.json');
const PKG = require('../package.json');

module.exports = { loadBotConfig, getNlpjsVersion };

function loadBotConfig () {
  const ENV = loadSanitizeEnv();

  const { HTTP_PORT, VERBOSE } = ENV;

  console.log(`HTTP port: ${HTTP_PORT}`);

  const argc = process.argv.length;
  const matches = argc > 2 ? process.argv[argc - 1].match(/--port=(\d{4})/) : null;
  const port = parseInt(matches ? matches[1] : HTTP_PORT ? HTTP_PORT : null);

  if (port) {
    CONFIG.settings['api-server'].port = port;
  }

  CONFIG.settings.surveyBot = ENV;
  CONFIG.verbose = VERBOSE;

  CONFIG.nlpjs = getNlpjsVersion();

  // console.log('Verbose (2):', VERBOSE);

  return CONFIG;
}

function getNlpjsVersion() {
  return { version: PKG.dependencies['@nlpjs/basic'] };
}
