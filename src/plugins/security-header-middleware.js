/**
 * Middleware plugin to set a 'Content-Security-Policy' HTTP header.
 *
 * @see https://content-security-policy.com/examples/express-js/
 * @see https://helmetjs.github.io/
 * @see https://csp-evaluator.withgoogle.com/
 *
 * @copyright © Nick Freear, 27-May-2021.
 */

const { defaultContainer, Clonable } = require('@nlpjs/core');

// Sub-resource integrity SRI hashes.
const HASH = {
  // https://cdn.jsdelivr.net
  speechSdk: 'sha256-3MdAqrhcGF93/hagMad554ZADRPxR8tbodfTd3tmY0Q=',
  // https://cdn.botframework.com
  webchat: 'sha384-hXz10Qsp8m3FpR+4hxcQCYezS77mZKSB/k/G62JsQqdgIAn23zLkarnuK+5Qrjz2'
}

const SECURITY_POLICY = [
  "default-src 'self'",
  "connect-src 'self' https://*.tts.speech.microsoft.com wss://*.stt.speech.microsoft.com",
  "frame-ancestors 'self' http://localhost:* https://*.nquire.org.uk https://*.onlinesurveys.ac.uk",
  "img-src 'self' blob: data: https://www.google-analytics.com",
  "object-src 'none'",
  `script-src 'self' '${HASH.webchat}' '${HASH.speechSdk}' https://www.google-analytics.com https://nfreear.github.io`, // https://unpkg.com;
  "style-src 'self' 'unsafe-inline'",
  "worker-src 'self' blob: "
];

const PAGE_URL_REGEX = /^\/(index\.html)?(\?.+)?$/;

class SecurityHeaderMiddleware extends Clonable {
  constructor (settings = {}, container) {
    super({
      settings: {},
      container: settings.container || container || defaultContainer
    },
    container
    );

    this.name = 'securityHeaderMiddleware';

    const { API_ENABLE } = process.env;

    this.apiEnable = API_ENABLE;

    // console.log('apiEnable:', API_ENABLE);

    this.initialize();
  }

  run (input) {
    this.logger.info(`${this.name}.run() ~ NO-OP!`);

    return input;
  }

  initialize () {
    const apiServer = this.container.get('api-server'); // .app;

    this.logger.info(`${this.name}.initialize()`);

    if (!apiServer) {
      throw new Error('No api-server found');
    }

    if (!this.apiEnable) {
      return;
    }

    apiServer.plugins.push((req, res, next) => {
      if (PAGE_URL_REGEX.test(req.url)) {
        res.set({
          'X-My-Header': `${this.name}.via.plugins.push`,
          'Content-Security-Policy': SECURITY_POLICY.join('; ') + ';',
        });

        this.logger.info(`CSP header sent.`);
      }

      next();
    });

    // console.log(apiServer);

    return;

    /* this.app = apiServer.app;

    this.app.use((req, res, next) => {

      res.set({
        'X-My-Header': `${this.name}.via.use`,
        'Content-Security-Policy': POLICY.join('; ') + ';',
      });

      // console.log('CSP header set?');

      next();
    }); */
  }
}

module.exports = SecurityHeaderMiddleware;
