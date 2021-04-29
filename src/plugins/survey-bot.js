/**
 * A "survey bot" plugin ?!
 *
 * @author  NDF, 28-April-2021.
 * @author  NDF, 25-Feb-2020.
 *
 * @see Activity schema :~
 * https://github.com/microsoft/botframework-sdk/blob/master/specs/botframework-activity/botframework-activity.md
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

    this.initialize();

    this.name = 'surveyBot';

    this.answerRegex = ANSWER_REGEX;

    this.introTexts = SURVEY.introTexts;
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
    let metaData = null;

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

  initialize () {
    const directlineCon = this.container.get('directline');

    console.log('DL connector:', directlineCon);

    directlineCon.onCreateConversation = (ctr, result) => {
      console.log('onCreateConversation:', result);

      const srcAct = {
        // type: 'message',
        // text: 'Greetings! [createConv]',
        locale: 'en-US',
        conversation: { id: result.conversationId }
      };

      const typingAct = {
        type: 'typing',
        conversation: { id: result.conversationId }
      }

      this.introTexts.forEach(text => {
        directlineCon.say(srcAct, text);
        directlineCon.say(typingAct);
      });

      const srcEvent = {
        type: 'event',
        name: 'myCustomEvent',
        value: { myData: 1 },
        conversation: { id: result.conversationId }
      };

      directlineCon.say(srcEvent);
    };
  }
}

module.exports = SurveyBot;

// End.
