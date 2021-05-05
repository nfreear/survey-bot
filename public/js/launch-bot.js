/*!
  NDF, 28-April-2021.
*/

import { BotSpeech } from './bot-speech.js';

const WebChat = window.WebChat;
// const simpleUpdateIn = window.simpleUpdateIn;

const QUESTION_REGEX = /(.+)` ?qid=(\d+)`/;

export async function launchBot (options = {}) {
  const speech = new BotSpeech(options);

  // https://github.com/microsoft/BotFramework-WebChat/issues/2377#issuecomment-527895197
  // https://github.com/microsoft/BotFramework-WebChat/tree/main/samples/04.api/b.piggyback-on-outgoing-activities#
  // https://github.com/microsoft/BotFramework-WebChat/issues/2555#issuecomment-549454620

  let surveyData;

  const store = WebChat.createStore(
    {},
    // https://github.com/microsoft/BotFramework-WebChat/blob/master/CHANGELOG.md#change-in-general-middleware-design
    ({ dispatch }) => next => (...args) => {
      const action = args[0];

      const ACT = action.payload ? action.payload.activity : null;

      if (action.type === 'DIRECT_LINE/POST_ACTIVITY') {
        if (surveyData) {
          ACT.channelData = { surveyData };
        }

        // We are using the simple-update-in package to update "action" with partial deep cloning.
        // action = simpleUpdateIn(action, ['payload', 'activity', 'channelData', 'email'], () => 'j.doe@example.com');

        console.warn('postActivity:', ACT.text, ACT.channelData, action);
      }
      else if (action.type === 'DIRECT_LINE/INCOMING_ACTIVITY') {
        if (ACT.type === 'message' && ACT.text) {
          const matches = ACT.text.match(QUESTION_REGEX);

          if (matches) {
            surveyData = {
              question: matches[1],
              qIndex: parseInt(matches[2])
            };

            console.warn('Incoming question:', surveyData, action);
          }
        }
      }

      return next(...args);
    }
  /* function () {
    return function (next) {
      return function (action) {
        if (action.type === 'DIRECT_LINE/POST_ACTIVITY') { ... }

        return next(action);
      }
    }
  } */
  );

  WebChat.renderWebChat(
    {
      directLine: WebChat.createDirectLine({
        domain: '/directline',
        webSocket: false,
        // token: 'YOUR_DIRECT_LINE_TOKEN'
      }),
      userID: 'nick', // 'YOUR_USER_ID',
      username: 'Nick User',
      locale: 'en-US',
      styleOptions: {
         // adaptiveCardsParserMaxVersion: '1.2'
         hideUploadButton: true,
      },
      webSpeechPonyfillFactory: await speech.createSpeechPonyfill(),
      // selectVoice: speech.getSelectVoice(),
      store
    },
    document.getElementById('webchat')
  );

  console.warn('Webchat.js:', WebChat, options);
}

// End.
