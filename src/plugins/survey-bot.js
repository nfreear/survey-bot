/**
 * A "survey bot" plugin.
 *
 * @copyright © Nick Freear, 28-April-2021.
 * @author  NDF, 25-Feb-2020.
 *
 * @see Activity schema :~
 * https://github.com/microsoft/botframework-sdk/blob/master/specs/botframework-activity/botframework-activity.md
 */

// For now, hard-code the survey JSON file.
const SURVEY = require('../../bot/survey-en.json');

const { defaultContainer, Clonable } = require('@nlpjs/core');

// const { PluginBase, defaultContainer } = require('../plugin-base');

const EVENT_RUN = 'surveyBot:run';
const EVENT_INTRO_SENT = 'surveyBot:introSent';

class SurveyBot extends Clonable { // PluginBase {
  constructor (settings = {}, container) {
    super({
      settings: {},
      container: settings.container || container || defaultContainer
    },
    container
    );

    this.name = 'surveyBot';

    this.initialize();

    this.loadSurvey();
  }

  loadSurvey () {
    const { locale, introTexts, endTexts, endEarlyTexts, questionTemplate, questions } = SURVEY;

    this.survey = { locale, introTexts, endTexts, endEarlyTexts, questionTemplate, questions };

    // WAS: this.signoff = SURVEY.signoff;
  }

  get (key) {
    return this.survey[key];
  }

  parseAnswer (input) {
    const metaData = input.activity ? input.activity.channelData.surveyData : null;

    if (metaData) {
      return {
        answer: input.utterance,
        qIndex: metaData.qIndex,
        nextIndex: metaData.qIndex + 1,
        question: metaData.question
      };
    }

    return null;
  }

  getQuestion (index = 0) {
    const SIZE = this.get('questions').length;
    const TEXT = this.get('questions')[index] || null;

    if (!TEXT) {
      return false;
    }

    return this.get('questionTemplate')
      .replace('{N}', index + 1)
      .replace('{M}', SIZE)
      .replace('{Q}', TEXT)
      ;
  }

  run (input) {
    const userID = input.from.id; // OR: input.activity.from.id;

    this.logger.info(`${this.name}.run(): userID=${userID}`);

    // console.log(input);

    let response = 'Woops!';
    let metaData = { intent: input.intent, theEnd: false };

    switch (input.intent) {
      case 'survey.start':
        response = this.getQuestion(0);
        // metaData = `qid=0`;
        metaData.qIndex = 0;
        break;

      case 'survey.end.early': // WAS: 'survey.end':
        response = this.get('endEarlyTexts').join(' ');
        break;

      case 'survey.answer': // Drop-through!
      case 'None':
        const result = this.parseAnswer(input);

        // console.log('Answer:', result);

        if (result) {
          /** @TODO: Save the 'answer' text ?! */
          response = this.getQuestion(result.nextIndex);
          // metaData = `qid=${result.nextIndex}`;
          metaData.qIndex = result.nextIndex;

          if (!response) {
            response = this.get('endTexts').join(' ');
            metaData.qIndex = null;
            metaData.theEnd = true;
          }
        }
        break;

      default:
        // Easier to test an exception!
        throw new Error(`Unexpected intent: '${input.intent}' (${this.name})`);
        // Was: this.logger.error(`Error: unexpected intent: ${input.intent} (${this.name})`);
        break;
    }

    input.text = input.answer = response;

    input.inputHint = 'expectingInput'; // Doesn't work :(.

    if (input.activity) {
      const CONV = { conversationId: input.activity.conversation.id };

      metaData.question = response;

      input._Answer = metaData;

      // Slightly arbitrary 10ms delay!
      setTimeout(() => this.sendEvent(CONV, EVENT_RUN, metaData), 10);
    }

    // this.logToFile(input);

    // console.log(input);

    return input;
  }

  initialize () {
    const directlineCon = this.directlineCon = this.container.get('directline');

    if (!directlineCon) {
      return this.logger.warn(`Warning: directline connector missing? (${this.name})`);
    }

    // console.log('DL connector:', directlineCon);

    directlineCon.onCreateConversation = (ctr, conv) => {
      this.logger.log(`onCreateConversation ~ convId:${conv.conversationId}`);

      this.get('introTexts').forEach(text => {
        this.say(conv, text);
        this.sendTyping(conv);
      });

      this.sendEvent(conv, EVENT_INTRO_SENT);
    };

    /* ?? directlineCon.onHear = async (ctr, conv) => {
      console.log('onHear:', conv);
    }; */
  }

  say (conv, text) {
    this.directlineCon.say({
      // type: 'message',
      // text: 'Greetings! [createConv]',
      locale: this.get('locale') || 'en-US',
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
    if (!this.directlineCon) {
      return; // this.logger.warn(`Warning: directline connector missing? (${this.name})`);
    }

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
