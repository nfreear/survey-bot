/**
 * Load and sanitize configuration from `.env`
 *
 * @copyright Nick Freear, 10-June-2021.
 */

const { loadEnv } = require('@nlpjs/core-loader');

function loadSanitizeEnv () {
  loadEnv();

  const {
    VERBOSE,
    API_ENABLE,
    LOG_TO_DB,

    HTTP_PORT,

    speechUseAdaptive,
    // Was: speechUseDictation=true
    speechSubscriptionKey,
    speechRegion,
    speechDefaultTimeout,

    analyticsId,

    // Database connection.
    DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DATABASE, DB_DEBUG
  } = process.env;

  return {
    API_ENABLE: parseBool(API_ENABLE),

    VERBOSE: parseBool(VERBOSE),
    LOG_TO_DB: parseBool(LOG_TO_DB),

    speechUseAdaptive: parseBool(speechUseAdaptive),
    speechSubscriptionKey,
    speechRegion,
    speechDefaultTimeout: parseFloat(speechDefaultTimeout),
    analyticsId,

    HTTP_PORT: HTTP_PORT ? parseInt(HTTP_PORT) : null, // 3000,

    DB_PORT: DB_PORT ? parseInt(DB_PORT) : 3306, // null ?
    DB_HOST, DB_USER, DB_PASSWORD, DATABASE,

    DB_DEBUG: parseBool(DB_DEBUG),
  };
}

function parseBool(arg) {
  return /^true$/i.test(arg); // arg === 'true';
}

module.exports = { loadSanitizeEnv };
