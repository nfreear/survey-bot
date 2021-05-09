/**
 * Survey-Bot client App.
 *
 * @copyright © Nick Freear, 30-April-2021.
 */

// import { ENV } from './_env.js';
import { launchBot } from './launch-bot.js';

const MIN_ALLOW_TIMEOUT = 100;
// const DEF_TIMEOUT = 3.0;
const BOT_FORM = document.querySelector('#bot-form');

const fetch = window.fetch;

(async () => {
  const OPT = await getConfigJson();

  BOT_FORM.addEventListener('submit', ev => {
    ev.preventDefault();

    const timeoutValue = parseFloat(ev.target[0].value);

    const endSilenceTimeoutMs = timeoutValue === 0 ? MIN_ALLOW_TIMEOUT : timeoutValue * 1000;

    console.warn('Launch Bot! Timeout, ms:', endSilenceTimeoutMs, ev);

    ev.target.classList.add('hide');
    setTimeout(() => ev.target.classList.add('hidden'), 2000);

    OPT.speech.endSilenceTimeoutMs = endSilenceTimeoutMs;

    launchBot(OPT);
  });

  initialize(OPT);
})();


function initialize (OPT) {
  console.debug('Configuration:', OPT);

  BOT_FORM[0].value = parseFloat(param(/timeout=(\d+(\.[05])?)/, OPT.speech.defaultTimeout));

  const SHOW_FORM = !param(/showForm=(false)/i);

  document.body.classList.add(`load-${SHOW_FORM ? 'show' : 'hide'}-form`);

  if (!SHOW_FORM) {
    const submitEvent = new Event('submit');
    BOT_FORM.dispatchEvent(submitEvent);
  }
}

async function getConfigJson() {
  const response = await fetch('/api/config.json');
  return response.json();
}

function param(regex, def = null) {
  const matches = window.location.href.match(regex);

  return matches ? matches[1] : def;
}
