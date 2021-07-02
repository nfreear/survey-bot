/**
 * Unit test for the `BotSurvey` plugin.
 *
 * @copyright © Nick Freear, 31-May-2021.
 */

const { SurveyBot } = require('../index');

const startInput = require('./fixtures/survey.start.intent')[0];
const endEarlyInput = require('./fixtures/survey.end.early.intent')[0];
const answerInput = require('./fixtures/survey.answer.intent');
const otherInput = require('./fixtures/other.intent')[0];

describe('Survey Bot plugin:', () => {
  // .

  describe('Constructor', () => {
    const plugin = new SurveyBot();

    it('Should create an instance', () => {
      // const plugin = new SurveyBot();
      expect(plugin).toBeDefined();
    });

    it('Should contain a valid survey', () => {
      // const plugin = new SurveyBot();

      expect(plugin.get('questions')).toHaveLength(4);
      expect(plugin.get('introTexts')).toHaveLength(2);
      expect(plugin.get('endTexts')).toHaveLength(2);
      expect(plugin.get('questionTemplate')).toContain('{Q}');
      expect(plugin.get('locale')).toBe('en-GB');
    });
  });

  describe('Run method', () => {
    const plugin = new SurveyBot();

    it('Should respond OK to the `survey.start` intent', () => {
      const output = plugin.run(startInput);

      expect(output.answer).toContain('Question 1 of 4');
    });

    it('Should respond OK to the `survey.answer` intent', () => {
      const output = plugin.run(answerInput[0]);

      expect(output.answer).toContain('Question 2 of 4');
    });

    it('Should respond OK to the `survey.end.early` intent', () => {
      const output = plugin.run(endEarlyInput);

      expect(output.answer).toContain('Good bye');
    });

    it('Should throw an Error for the `do.you.stammer` intent', () => {
      expect(() => plugin.run(otherInput)).toThrow(Error);
      expect(() => plugin.run(otherInput)).toThrow(/Unexpected intent/);
    });
  });
});
