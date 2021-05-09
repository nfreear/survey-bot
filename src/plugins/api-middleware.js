/**
 * Plugin to serve ".env" configuration variables via JSON.
 *
 * @copyright © Nick Freear 2021.
 * @author Nick Freear, 22-Jul-2020.
 */

const { defaultContainer, Clonable } = require('@nlpjs/core');

// const { PluginBase, defaultContainer } = require('../plugin-base');

class ServeApiMiddleware extends Clonable {
  constructor (settings = {}, container) {
    super({
      settings: {},
      container: settings.container || container || defaultContainer
    },
    container
    );

    this.name = 'serveApiMiddleware';

    const { API_ENABLE } = process.env;

    this.apiEnable = API_ENABLE;

    console.log('apiEnable:', API_ENABLE);
  }

  run (input) {
    this.logger.info(`${this.name}.run() ~ NO-OP!`);

    return input;
  }

  start () {
    const {
      speechSubscriptionKey, speechRegion, speechDefaultTimeout, speechUseAdaptive
    } = process.env;

    const server = this.container.get('api-server').app;

    this.logger.info(`${this.name}.start()`, server);

    if (!server) {
      throw new Error('No api-server found');
    }

    this.app = server;

    // this.app.use(express.static(PUBLIC_PATH));

    if (this.apiEnable) {
      this.app.get('/api/config.json', async (req, res) => {
        try {
          const CONFIG = {
            _: this.name,
            speech: {
              region: speechRegion,
              subscriptionKey: speechSubscriptionKey,
              defaultTimeout: parseFloat(speechDefaultTimeout),
              useAdaptive: speechUseAdaptive,
            }
          };
          // res.header('Content-Type', 'text/plain; charset=utf-8');
          res.json(CONFIG);
          console.log('/api/config.json:', CONFIG);
        } catch (err) {
          this.logger.error('Error in "/api/config.json" route.');
          this.logger.error(err);
          res.status(500).send('Something broke!');
        }
      });
    }

    // this.app.use(this.useMiddleware());
  }
}

module.exports = ServeApiMiddleware;
