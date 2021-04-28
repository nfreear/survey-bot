/**
 * A "survey bot" plugin ?!
 *
 * @author  NDF, 28-April-2021.
 * @author  NDF, 25-Feb-2020.
 */

const SURVEY = require('../../bot/survey-en.json');

const { defaultContainer, Clonable } = require('@nlpjs/core');

// const { PluginBase, defaultContainer } = require('../plugin-base');

const ANSWER_REGEX = /([\w'\- ]+) *[`]?\[qa=(\d+)\][`]?/;

class SurveyBot extends Clonable { // PluginBase {
  constructor (settings = {}, container) {
    super({
      settings: {},
      container: settings.container || container || defaultContainer
    },
    container
    );

    // this.initNerManager();

    this.name = 'surveyBot';

    this.answerRegex = ANSWER_REGEX;
    this.questionTemplate = SURVEY.questionTemplate;
    this.questions = SURVEY.questions;
    this.signoff = SURVEY.signoff;
  }

  parseAnswer (input) {
    const matches = input.utterance.match(this.answerRegex);

    if (matches) {
      return {
        answer: matches[1],
        index: parseInt(matches[2]) - 1, // Zero-based!
        nextIndex: parseInt(matches[2]) - 1 + 1, // Yes, really!
      };
    }
    return null;
  }

  getQuestion (index = 0) {
    const SIZE = this.questions.length;
    const TEXT = this.questions[index] || null;

    return this.questionTemplate
      .replace('{N}', index + 1)
      .replace('{M}', SIZE)
      .replace('{Q}', TEXT)
      ;
  }

  run (input) {
    this.logger.info(this.name, '.run()');

    console.log(input);

    let response = 'Woops!';

    switch (input.intent) {
      case 'survey.start':
        response = this.getQuestion(0);
        break;

      case 'survey.end':
        response = this.signoff;
        break;

      case 'None':
        const result = this.parseAnswer(input);

        console.log('Answer:', result);

        if (result) {
          /** @TODO: Save the 'answer' text ?! */
          response = this.getQuestion(result.nextIndex);
        }
        break;

      default:
        this.logger.info(this.name, 'Error: default');
        break;
    }

    input.text = input.answer = response;

    // this.logToFile(input);

    return input;
  }
}

module.exports = SurveyBot;

// End.
