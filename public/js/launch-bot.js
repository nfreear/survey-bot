/*!
  NDF, 28-April-2021.
*/

import { BotSpeech } from './bot-speech.js';

const WebChat = window.WebChat;
// const simpleUpdateIn = window.simpleUpdateIn;

export async function launchBot (options = { speech: {} }) {
  const speech = new BotSpeech(options.speech);

  // https://github.com/microsoft/BotFramework-WebChat/issues/2377#issuecomment-527895197
  // https://github.com/microsoft/BotFramework-WebChat/tree/main/samples/04.api/b.piggyback-on-outgoing-activities#
  // https://github.com/microsoft/BotFramework-WebChat/issues/2555#issuecomment-549454620

  let surveyData = { theEnd: false };

  let isFirstIncoming = true;

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
        if (ACT.type === 'event') {
          if (ACT.name === 'surveyBot:run') {
            surveyData = ACT.value;

            console.warn('> Incoming question:', surveyData, action);
          } else {
            console.warn('> Incoming event:', ACT.name, ACT);
          }
        }

        /* if (ACT.type === 'message' && ACT.text) {
        } */
      } else if (action.type === 'WEB_CHAT/STOP_SPEAKING') {
        // Instead of the 'expectingInput' inputHint, dispatch '..START_DICDATE'!
        setTimeout(() => {
          if (surveyData.theEnd) {
              console.warn('>> THE END!', action);
          } else {
              dispatch({ type: 'WEB_CHAT/START_DICTATE' });

              console.warn('>> dispatch:', 'WEB_CHAT/START_DICTATE', action);
          }
        },
        1800); // Was: 500, 1500;
      } else {
        console.debug(action.type, action);
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
