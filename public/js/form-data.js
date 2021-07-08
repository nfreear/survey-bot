/**
 *
 * @copyright © Nick Freear, 19-May-2021.
 */

export class FormData {

  //.
  constructor(formSelector = '#form_id') {
    this.form = document.querySelector(formSelector);
  }

  on(type, listenerFunc, useCapture = false) {
    this.form.addEventListener(type, listenerFunc, useCapture);
  }

  setFromUrlParams() {
    let data = {};

    this.inputFields().forEach(el => {
      const re = new RegExp(`${el.id}=${el.dataset.regex ? el.dataset.regex : '([^&]+)'}`);

      el.value = this.param(re, el.value);
      const value = el.value.replace(/ /g, '-');
      document.body.classList.add(`fl-${el.id}-${value}`);
      data[el.id] = el.value;
    });

    return data;
  }

  getDataFromEvent(ev = null) {
    const form = ev ? ev.target : this.form;

    let data = {};
    this.inputFields(form).forEach(el => {
      const isNum = el.type === 'number';
      const re = el.dataset.regex ? new RegExp(`^${el.dataset.regex}$`) : null;
      data[el.id] = isNum ? parseFloat(el.value) : re && re.test(el.value) ? el.value : null;
    });

    return data;
  }

  inputFields(form) {
    form = form || this.form;

    return [...form.elements].filter(el => el.nodeName !== 'BUTTON');
  }

  param(regex, def = null) {
    const matches = window.location.href.match(regex);

    return matches ? decodeURIComponent(matches[1]) : def;
  }
}
