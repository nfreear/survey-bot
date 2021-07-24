/**
 * Re-usable CommonJS exports from the Survey-Bot backend.
 *
 * @copyright © Nick Freear 2021.
 */

const SurveyBot = require('./plugins/survey-bot');
const CFG = require('../bot-config.json');

const botConfig = {
  pathPipeline: CFG.pathPipeline,
  settings: {
    nlp: CFG.settings.nlp,
    surveyBot: CFG.settings.surveyBot,
  }
}

module.exports = {
  botConfig,
  SurveyBot,
};
