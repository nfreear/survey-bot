
const { name, locale, data } = require('../bot/corpus-en.json');

describe('NLP.js Corpus:', () => {
  // .

  it('Should contain a valid `locale`.', () => {
    expect(locale).toBe('en-GB');
  });

  it('Should contain a `data` array.', () => {
    expect(data).toHaveLength(7);
    // expect(data.length).toBe(7);

    data.forEach(item => {
      expect(item.intent).toMatch(/[a-z\.]+/);
      expect(item.utterances.length).toBeGreaterThan(1);
    })
  });
});
