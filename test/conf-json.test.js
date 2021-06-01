/**
 * Unit test for `bot-config.json`
 */

const CONF = require('../bot-config.json'); // Was: '../conf.json'

describe('NLP.js Chat-bot configuration:', () => {
  // .

  it('Should contain a `use` array.', () => {
    expect(CONF.use).toHaveLength(4);
  });

  it('Should contain an `nlp.corpora` array.', () => {
    expect(CONF.settings.nlp.corpora).toHaveLength(1);
    expect(CONF).toHaveProperty('settings.nlp.corpora', [ './bot/corpus-en.json' ]);
  });

  it('Should contain a server `port` number.', () => {
    expect(CONF.settings['api-server'].port).toEqual(3000);
    expect(CONF).toHaveProperty('settings.api-server.port', 3000);
  });

  it('Should contain a server client-path.', () => {
    expect(CONF).toHaveProperty('settings.api-server.clientPath', './public');
  });

  it('Should contain a valid plugins path.', () => {
    expect(CONF).toHaveProperty('pathPlugins', './src/plugins');
  });
});
