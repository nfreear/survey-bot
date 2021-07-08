/**
 * Survey-Bot client App.
 *
 * @copyright © Nick Freear, 30-April-2021.
 */

// import { ENV } from './_env.js';
import { launchBot } from './launch-bot.js';
import { FormData } from './form-data.js';

const MIN_ALLOW_TIMEOUT = 100;
// const DEF_TIMEOUT = 3.0;

const botForm = new FormData('#bot-form');

const fetch = window.fetch;

(async () => {
  const OPT = await getConfigJson();

  botForm.on('submit', ev => {
    ev.preventDefault();

    const data = botForm.getDataFromEvent(ev);

    // console.warn('> Submit:', data, ev); return;

    const endSilenceTimeoutMs = data.timeout === 0 ? MIN_ALLOW_TIMEOUT : data.timeout * 1000;

    console.warn('Launch Bot! Timeout, ms:', endSilenceTimeoutMs, data, ev);

    ev.target.classList.add('hide');
    setTimeout(() => ev.target.classList.add('hidden'), 2000);

    OPT.speech.endSilenceTimeoutMs = endSilenceTimeoutMs;

    OPT.speech.useAdaptive = data.asr === 'adaptive';
    OPT.speech.lang = data.locale; // ??

    OPT.userID = data.userID;
    OPT.username = data.username;
    OPT.locale = data.locale;

    launchBot(OPT);

    document.body.classList.add('bot-launched');
  });

  initialize(OPT);
})();


function initialize (OPT) {
  console.debug('Configuration:', OPT);

  const data = botForm.setFromUrlParams();

  const SHOW_FORM = data.showForm === 'true';

  // document.body.classList.add(`load-${SHOW_FORM ? 'show' : 'hide'}-form`);

  if (!SHOW_FORM) {
    const submitEvent = new Event('submit');
    BOT_FORM.dispatchEvent(submitEvent);
  }
}

async function getConfigJson() {
  const response = await fetch('/api/config.json');
  return response.json();
}
