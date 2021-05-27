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

    const data = getFormDataFromEvent(ev);

    // console.warn('> Submit:', data, ev); return;

    const endSilenceTimeoutMs = data.timeout === 0 ? MIN_ALLOW_TIMEOUT : data.timeout * 1000;

    console.warn('Launch Bot! Timeout, ms:', endSilenceTimeoutMs, data, ev);

    ev.target.classList.add('hide');
    setTimeout(() => ev.target.classList.add('hidden'), 2000);

    OPT.speech.endSilenceTimeoutMs = endSilenceTimeoutMs;

    OPT.speech.useAdaptive = data.asr === 'adaptive';

    launchBot(OPT);

    document.body.classList.add('bot-launched');
  });

  initialize(OPT);
})();


function initialize (OPT) {
  console.debug('Configuration:', OPT);

  const data = setFormFromUrlParams(BOT_FORM);

  // BOT_FORM[0].value = parseFloat(param(/timeout=(\d+(\.[05])?)/, OPT.speech.defaultTimeout));

  const SHOW_FORM = !param(/showForm=(false)/i);

  document.body.classList.add(`load-${SHOW_FORM ? 'show' : 'hide'}-form`);

  if (!SHOW_FORM) {
    const submitEvent = new Event('submit');
    BOT_FORM.dispatchEvent(submitEvent);
  }
}

function setFormFromUrlParams(form) {
  const inputFields = [...form.elements].filter(el => el.nodeName !== 'BUTTON');
  let data = {};
  inputFields.forEach(el => {
    const re = new RegExp(`${el.id}=${el.dataset.regex ? el.dataset.regex : '([^&]+)'}`);

    el.value = param(re, el.value);
    document.body.classList.add(`fl-${el.id}-${el.value}`);
    data[el.id] = el.value;
  });
  return data;
}

function getFormDataFromEvent(ev) {
  const inputFields = [...ev.target.elements].filter(el => el.nodeName !== 'BUTTON');
  let data = {};
  inputFields.forEach(el => {
    const isNum = el.type === 'number';
    const re = el.dataset.regex ? new RegExp(`^${el.dataset.regex}$`) : null;
    data[el.id] = isNum ? parseFloat(el.value) : re && re.test(el.value) ? el.value : null;
  });
  return data;
}

async function getConfigJson() {
  const response = await fetch('/api/config.json');
  return response.json();
}

function param(regex, def = null) {
  const matches = window.location.href.match(regex);

  return matches ? decodeURIComponent(matches[1]) : def;
}
