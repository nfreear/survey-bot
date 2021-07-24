/**
 * Create a hybrid speech ponyfill factory.
 *
 * @copyright © Nick Freear, 04-May-2021.
 */

/* import {
  createDictationRecognizerPonyfill, getDictationRecognizerConfig
} from 'https://nfreear.github.io/dictation/src/index.js'; */

const {
  // createBrowserWebSpeechPonyfillFactory,
  createCognitiveServicesSpeechServicesPonyfillFactory
} = window.WebChat;

export class BotSpeech {
  // .

  constructor (options) {
    this.OPT = options;
    this.hasSpeech = true;

    console.debug('BotSpeech:', this);
  }

  async createSpeechPonyfill () {
    const options = this.OPT;
    const useAdaptive = this.OPT.useAdaptive;
    // Was: const useDictation = this.OPT.useDictation;
    const createRecognizerPonyfillFactory = this.OPT.createRecognizerPonyfillFactory;

    if (!options.subscriptionKey || /_/.test(options.subscriptionKey)) {
      document.body.className += 'error config-error';
      // LOG.textContent = 'ERROR: Expecting a URL parameter `?key=AZURE_SPEECH_SUBSCRIPTION_KEY`.';
      throw new Error('ERROR: Expecting a URL parameter `?key=AZURE_SPEECH_SUBSCRIPTION_KEY`.');
    }

    const credentials = {
      region: options.region,
      subscriptionKey: options.subscriptionKey
    };

    const speechServicesPonyfillFactory = await createCognitiveServicesSpeechServicesPonyfillFactory(
      {
        // speechRecognitionEndpointId: options.endpointId, // << Custom recognition model.
        // speechRecognitionLanguage: 'en-GB', // << Doesn't work!
        // textNormalization: 'itn',
        credentials
      }
    );

    const ttsPonyfill = speechServicesPonyfillFactory();

    const asrPonyfill = useAdaptive ? createRecognizerPonyfillFactory(options) : ttsPonyfill;

    const ponyfill = {
      SpeechGrammarList: asrPonyfill.SpeechGrammarList,
      SpeechRecognition: asrPonyfill.SpeechRecognition,

      speechSynthesis: ttsPonyfill.speechSynthesis,
      SpeechSynthesisUtterance: ttsPonyfill.SpeechSynthesisUtterance
    };

    console.debug('Hybrid speech ponyfill:', ponyfill, options);

    // Must return a function, not an object! (Else we get "TypeError: v is not a function")
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

  /** @FIX - Experiment -- it works - Yay !!
   * https://github.com/microsoft/BotFramework-WebChat/blob/master/packages/core/src/actions/startSpeakingActivity.js
   *
   * if (action.type === 'DIRECT_LINE/CONNECT_FULFILLED') {
   *   speech.startSpeakingImmediately(dispatch);
   * }
   */
  startSpeakingImmediately (dispatch) {
    if (this.hasSpeech) {
      dispatch({
        type: 'WEB_CHAT/START_SPEAKING'
        // , payload: {}
      });
      console.warn('>> Dispatched: WEB_CHAT/START_SPEAKING');
    }
  }
}

/* TypeError: v is not a function
    at webchat.js:2
    at Object.useMemo (webchat.js:2)
    at useMemo (webchat.js:2)
    at z (webchat.js:2)
*/

// End.
