/*!
  NDF, 30-April-2021.
*/

import { launchBot } from './launch-bot.js';

const BOT_FORM = document.querySelector('#bot-form');

BOT_FORM.addEventListener('submit', ev => {
  ev.preventDefault();

  const TIMEOUT_MS = parseFloat(ev.target[0].value) * 1000;

  console.warn('Launch Bot! Timeout, ms:', TIMEOUT_MS, ev);

  ev.target.classList.add('hide');
  setTimeout(() => ev.target.classList.add('hidden'), 2000);

  launchBot(TIMEOUT_MS);
});
