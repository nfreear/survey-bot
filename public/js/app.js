/*!
  NDF, 30-April-2021.
*/

import { launchBot } from './launch-bot.js';

const DEF_TIMEOUT = 3.0;
const BOT_FORM = document.querySelector('#bot-form');

BOT_FORM.addEventListener('submit', ev => {
  ev.preventDefault();

  const endSilenceTimeoutMs = parseFloat(ev.target[0].value) * 1000;

  console.warn('Launch Bot! Timeout, ms:', endSilenceTimeoutMs, ev);

  ev.target.classList.add('hide');
  setTimeout(() => ev.target.classList.add('hidden'), 2000);

  launchBot({
    subscriptionKey: param(/key=(\w{30,})/),
    region: 'uksouth',
    endSilenceTimeoutMs,
  });
});

initialize();

function initialize () {
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
