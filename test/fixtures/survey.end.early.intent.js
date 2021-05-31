/**
 * @intent survey.end.early
 */

module.exports = [
  /* onCreateConversation: {
    conversationId: 'a1d630a9-ccae-f881-57ae-9f94607e6615',
    expiresIn: 1800
  }
  [1622448496171] INFO (8610 on MCL258198): surveyBot.run()
  */
  {
    message: 'Stop the quiz',
    channel: 'directline',
    app: 'default',
    from: { id: 'nick', name: 'Nick User', role: 'user' },
    activity: {
      channelData: {
        surveyData: {},
        clientActivityID: '1622448496114ul1qpo1de5',
        clientTimestamp: '2021-05-31T08:08:16.114Z'
      },
      text: 'Stop the quiz',
      textFormat: 'plain',
      type: 'message',
      channelId: 'emulator',
      from: { id: 'nick', name: 'Nick User', role: 'user' },
      locale: 'en-US',
      timestamp: '2021-05-31T08:08:16.114Z',
      entities: [ {} ],
      serviceUrl: 'http://localhost:3000',
      conversation: { id: 'a1d630a9-ccae-f881-57ae-9f94607e6615' },
      address: { conversation: {} },
      id: '6d0d1480-0d70-a639-0e59-fe0f9fa5d004'
    },
    locale: 'en',
    utterance: 'Stop the quiz',
    languageGuessed: true,
    localeIso2: 'en',
    language: 'English',
    explanation: [ { token: '', stem: '##exact', weight: 1 } ],
    classifications: [
      { intent: 'survey.end.early', score: 1 },
      { intent: 'agent.birthday', score: 0 },
      { intent: 'do.you.stammer', score: 0 },
      { intent: 'i.need.help.stammer', score: 0 },
      { intent: 'survey.start', score: 0 },
      { intent: 'survey.repeat.question', score: 0 },
      { intent: 'survey.answer', score: 0 }
    ],
    intent: 'survey.end.early',
    score: 1,
    domain: 'default',
    entities: [],
    sourceEntities: [],
    answers: [],
    answer: undefined,
    _answer: "OK. You'd like to end the survey. Good bye-ee!",
    actions: [],
    sentiment: {
      score: 0,
      numWords: 0,
      numHits: 0,
      average: 0,
      type: undefined,
      locale: undefined,
      vote: 'neutral'
    },
    _text: "OK. You'd like to end the survey. Good bye-ee!",
    _inputHint: 'expectingInput',
    _Answer: {
      intent: 'survey.end.early',
      theEnd: false,
      question: "OK. You'd like to end the survey. Good bye-ee!"
    }
  }
];
