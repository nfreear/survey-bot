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
    this.endTexts = SURVEY.endTexts;
    this.endEarlyTexts = SURVEY.endEarlyTexts;
    this.questionTemplate = SURVEY.questionTemplate;
    this.questions = SURVEY.questions;
    // WAS: this.signoff = SURVEY.signoff;
  }

  parseAnswer (input) {
    const matches = input.utterance.match(this.answerRegex); // To delete!

    const metaData = input.activity ? input.activity.channelData.surveyData : null;

    if (metaData) {
      return {
        answer: input.utterance,
        qIndex: metaData.qIndex,
        nextIndex: metaData.qIndex + 1,
        question: metaData.question
      };
    }

    if (matches) { // Legacy!
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

    if (!TEXT) {
      return false;
    }

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
    let metaData = { intent: input.intent, theEnd: false };

    switch (input.intent) {
      case 'survey.start':
        response = this.getQuestion(0);
        // metaData = `qid=0`;
        metaData.qIndex = 0;  // = { qIndex: 0 };
        break;

      case 'survey.end.early': // WAS: 'survey.end':
        response = this.endEarlyTexts.join(' '); // WAS: this.signoff;
        break;

      case 'survey.answer': // Drop-through!
      case 'None':
        const result = this.parseAnswer(input);

        console.log('Answer:', result);

        if (result) {
          /** @TODO: Save the 'answer' text ?! */
          response = this.getQuestion(result.nextIndex);
          // metaData = `qid=${result.nextIndex}`;
          metaData.qIndex = result.nextIndex;

          if (!response) {
            response = this.endTexts.join(' ');
            metaData.qIndex = null;
            metaData.theEnd = true;
          }
        }
        break;

      default:
        this.logger.info(this.name, 'Error: default');
        break;
    }

    input.text = input.answer = response; // WAS: `${response}\`${metaData}\``;

    input.inputHint = 'expectingInput'; // Doesn't work :(.

    /* if (input.activity) {
      input.activity.channelData.surveyBot = metaData;
    } */

    if (input.activity) {
      const CONV = { conversationId: input.activity.conversation.id };

      metaData.question = response;

      // Slightly arbitrary 10ms delay!
      setTimeout(() => this.sendEvent(CONV, 'surveyBot:run', metaData), 10);
    }

    // this.logToFile(input);

    return input;
  }

  initialize () {
    const directlineCon = this.directlineCon = this.container.get('directline');

    console.log('DL connector:', directlineCon);

    directlineCon.onCreateConversation = (ctr, conv) => {
      console.log('onCreateConversation:', conv);

      this.introTexts.forEach(text => {
        this.say(conv, text);
        this.sendTyping(conv);
      });

      this.sendEvent(conv, 'surveyBot:introSent');
    };
  }

  say (conv, text) {
    this.directlineCon.say({
      // type: 'message',
      // text: 'Greetings! [createConv]',
      locale: 'en-US',
      conversation: { id: conv.conversationId }
    },
    text);
  }

  sendTyping (conv) {
    this.directlineCon.say({
      type: 'typing',
      conversation: { id: conv.conversationId }
    });
  }

  sendEvent (conv, name, value) {
    this.directlineCon.say({
      type: 'event',
      name: name || 'myCustomEvent',
      value: value || { myData: 1 },
      conversation: { id: conv.conversationId }
    });
  }
}

module.exports = SurveyBot;

// End.
