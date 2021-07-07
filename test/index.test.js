/**
 * Unit test for `index.js`.
 */

const { SurveyBot, botConfig } = require('../index');

describe('Exports in index.js:', () => {

  describe('SurveyBot Constructor', () => {
    const plugin = new SurveyBot();

    it('Should create an instance', () => {
      // const plugin = new SurveyBot();
      expect(plugin).toBeDefined();
    });
  });

  describe('botConfig:', () => {
    it('Should be defined', () => {
      expect(botConfig).toBeDefined();
    });

    it('Should contain a pipeline path', () => {
      expect(botConfig).toHaveProperty('pathPipeline', './bot/pipelines.md');
    });

    it('Should contain a corpus path', () => {
      expect(botConfig).toHaveProperty('settings.nlp.corpora');
    });

    it('Should contain a survey path', () => {
      expect(botConfig).toHaveProperty('settings.surveyBot.surveys');
    });

    it('Should NOT contain a `use` property', () => {
      expect(botConfig).not.toHaveProperty('use');
    });

    it('Should NOT contain an `api-server` property', () => {
      expect(botConfig).not.toHaveProperty('settings.api-server');
    });
  });
});
