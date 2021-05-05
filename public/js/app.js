/*!
  NDF, 30-April-2021.
*/

import { ENV } from './_env.js';
import { launchBot } from './launch-bot.js';

const MIN_ALLOW_TIMEOUT = 100;
const DEF_TIMEOUT = 3.0;
const BOT_FORM = document.querySelector('#bot-form');

BOT_FORM.addEventListener('submit', ev => {
  ev.preventDefault();

  const timeoutValue = parseFloat(ev.target[0].value);

  const endSilenceTimeoutMs = timeoutValue === 0 ? MIN_ALLOW_TIMEOUT : timeoutValue * 1000;

  console.warn('Launch Bot! Timeout, ms:', endSilenceTimeoutMs, ev);

  ev.target.classList.add('hide');
  setTimeout(() => ev.target.classList.add('hidden'), 2000);

  launchBot({
    subscriptionKey: ENV.subscriptionKey, // param(/key=(\w{30,})/),
    region: ENV.region,
    endSilenceTimeoutMs,
  });
});

initialize();

function initialize () {
  console.debug('Env:', ENV);

  BOT_FORM[0].value = parseFloat(param(/timeout=(\d+(\.[05])?)/, DEF_TIMEOUT));

  const SHOW_FORM = !param(/showForm=(false)/i);

  document.body.classList.add(`load-${SHOW_FORM ? 'show' : 'hide'}-form`);

  if (!SHOW_FORM) {
    const submitEvent = new Event('submit');
    BOT_FORM.dispatchEvent(submitEvent);
  }
}

function param(regex, def = null) {
  const matches = window.location.href.match(regex);

  return matches ? matches[1] : def;
}
