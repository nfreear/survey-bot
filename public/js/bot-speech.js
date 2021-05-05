/*!
  NDF, 04-May-2021.
*/

import {
  createDictationRecognizerPonyfill, getDictationRecognizerConfig
} from 'https://nfreear.github.io/dictation/src/index.js';

const {
  // createBrowserWebSpeechPonyfillFactory,
  createCognitiveServicesSpeechServicesPonyfillFactory
} = window.WebChat;

export class BotSpeech {
  // .

  constructor (options) {
    this.OPT = options;
  }

  async createSpeechPonyfill () {
    const options = this.OPT; // getDictationRecognizerConfig();

    if (!options.subscriptionKey || /_/.test(options.subscriptionKey)) {
      document.body.className += 'error config-error';
      // LOG.textContent = 'ERROR: Expecting a URL parameter `?key=AZURE_SPEECH_SUBSCRIPTION_KEY`.';
      throw new Error('ERROR: Expecting a URL parameter `?key=AZURE_SPEECH_SUBSCRIPTION_KEY`.');
    }

    const credentials = {
      region: options.region,
      subscriptionKey: options.subscriptionKey
    };

    const asrPonyfill = createDictationRecognizerPonyfill(options);

    const speechServicesPonyfillFactory = await createCognitiveServicesSpeechServicesPonyfillFactory(
      {
        // speechRecognitionEndpointId: options.endpointId, // << Custom recognition model.
        // speechRecognitionLanguage: 'en-GB', // << Doesn't work!
        // textNormalization: 'itn',
        credentials
      }
    );

    const ttsPonyfill = speechServicesPonyfillFactory();

    const ponyfill = {
      SpeechGrammarList: asrPonyfill.SpeechGrammarList,
      SpeechRecognition: asrPonyfill.SpeechRecognition,

      speechSynthesis: ttsPonyfill.speechSynthesis,
      SpeechSynthesisUtterance: ttsPonyfill.SpeechSynthesisUtterance
    };

    console.debug('Hybrid speech ponyfill:', ponyfill, options);

    // Must return a function, not an object! ("TypeError: v is not a function")
    return () => ponyfill;
  }

  getSelectVoice () {
    return (voices, activity = { locale: null }) => {

      const VOX_RE = /en-GB, HazelRUS/; // that.getVoicesRegex();

      // console.warn('selectVoice:', activity, VOX_RE);

      if (!activity.locale || /^en/.test(activity.locale)) {
        const voice = voices.find(vox => {
          const name = vox.name || vox._name;
          return VOX_RE.test(name);
        });

        // console.debug('>> selectVoice:', voice);

        return voice;
      }
    };
  }
}

/* TypeError: v is not a function
    at webchat.js:2
    at Object.useMemo (webchat.js:2)
    at useMemo (webchat.js:2)
    at z (webchat.js:2)
*/

// End.
