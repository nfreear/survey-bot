/**
 *
 * @author Nick Freear, 31-May-2021.
 */

const SurveyBot = require('../src/plugins/survey-bot');

const startInput = require('./fixtures/survey.start.intent')[0];
const endEarlyInput = require('./fixtures/survey.end.early.intent')[0];

describe('Survey Bot plugin', () => {

  describe('Constructor', () => {
    const plugin = new SurveyBot();

    it('Should create an instance', () => {
      // const plugin = new SurveyBot();
      expect(plugin).toBeDefined();
    });

    it('Should contain a survey', () => {
      // const plugin = new SurveyBot();

      expect(plugin.get('questions').length).toBe(4);
      expect(plugin.get('introTexts').length).toBe(2);
      expect(plugin.get('endTexts').length).toBe(2);
      expect(plugin.get('locale')).toBe('en-GB');
    });
  });

  describe('Run method', () => {
    const plugin = new SurveyBot();

    it('Should respond OK to the `survey.start` intent', () => {
      // const plugin = new SurveyBot();
      const output = plugin.run(startInput);
      expect(output.answer).toContain('Question 1 of 4');
    });

    it('Should respond OK to the `survey.end.early` intent', () => {
      const output = plugin.run(endEarlyInput);
      expect(output.answer).toContain('Good bye');
    });
  });
});
