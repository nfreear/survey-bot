
const CONF = require('../conf.json');

describe('NLP.js Chat-bot configuration:', () => {
  // .

  it('Should contain a `use` array.', () => {
    expect(CONF.use).toHaveLength(4);
  });

  it('Should contain an `nlp.corpora` array.', () => {
    expect(CONF.settings.nlp.corpora).toHaveLength(1);
  });

  it('Should contain a port number.', () => {
    expect(CONF.settings['api-server'].port).toEqual(3000);
  });
});
