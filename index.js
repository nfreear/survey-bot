/**
 * Re-usable exports from Survey-Bot.
 *
 * @copyright © Nick Freear 2021.
 */

const SurveyBot = require('./src/plugins/survey-bot');
const CFG = require('./bot-config.json');

// @TODO? const { BotSpeech } = require('./public/js/bot-speech');

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
