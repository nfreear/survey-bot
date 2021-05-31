/**
 * @intent survey.start
 */

module.exports = [
  {
    message: 'Start the survey',
    channel: 'directline',
    app: 'default',
    from: { id: 'nick', name: 'Nick User', role: 'user' },
    activity: {
      channelData: {
        surveyData: {},
        clientActivityID: '1622446978498t4oi9vjv0q',
        clientTimestamp: '2021-05-31T07:42:58.498Z'
      },
      text: 'Start the survey',
      textFormat: 'plain',
      type: 'message',
      channelId: 'emulator',
      from: { id: 'nick', name: 'Nick User', role: 'user' },
      locale: 'en-US',
      timestamp: '2021-05-31T07:42:58.498Z',
      entities: [ {} ],
      serviceUrl: 'http://localhost:3000',
      conversation: { id: 'f9a60274-1196-49aa-1789-35ae1db27503' },
      address: { conversation: {} },
      id: 'cdea266e-c63b-de89-b10a-5b5fa7112d72'
    },
    locale: 'en',
    utterance: 'Start the survey',
    languageGuessed: true,
    localeIso2: 'en',
    language: 'English',
    explanation: [ { token: '', stem: '##exact', weight: 1 } ],
    classifications: [
      { intent: 'survey.start', score: 1 },
      { intent: 'agent.birthday', score: 0 },
      { intent: 'do.you.stammer', score: 0 },
      { intent: 'i.need.help.stammer', score: 0 },
      { intent: 'survey.end.early', score: 0 },
      { intent: 'survey.repeat.question', score: 0 },
      { intent: 'survey.answer', score: 0 }
    ],
    intent: 'survey.start',
    score: 1,
    domain: 'default',
    entities: [],
    sourceEntities: [],
    answers: [],
    answer: undefined,
    _answer: '_Question 1 of 4._ What is your full name please?',
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
    _text: '_Question 1 of 4._ What is your full name please?',
    _inputHint: 'expectingInput',
    _Answer: {
      intent: 'survey.start',
      theEnd: false,
      qIndex: 0,
      question: '_Question 1 of 4._ What is your full name please?'
    }
  }
];

/* module.exports._OLD = {

  message: 'Go',
  channel: 'directline',
  app: 'default',
  from: { id: 'nick', name: 'Nick User', role: 'user' },
  activity: {
    channelData: {
      surveyData: {},
      clientActivityID: '1622445445119y1kd5q47hj',
      clientTimestamp: '2021-05-31T07:17:25.119Z'
    },
    text: 'Go',
    textFormat: 'plain',
    type: 'message',
    channelId: 'emulator',
    from: { id: 'nick', name: 'Nick User', role: 'user' },
    locale: 'en-US',
    timestamp: '2021-05-31T07:17:25.119Z',
    entities: [ {} ],
    serviceUrl: 'http://localhost:3000',
    conversation: { id: 'ac9a0abd-b9bd-a0c6-3da6-7f6d53e09659' },
    address: { conversation: {} },
    id: '507eaa09-afb0-08b5-2c31-02f527195950'
  },
  locale: 'en',
  utterance: 'Go',
  languageGuessed: true,
  localeIso2: 'en',
  language: 'English',
  explanation: [ { token: '', stem: '##exact', weight: 1 } ],
  classifications: [
    { intent: 'survey.start', score: 1 },
    { intent: 'agent.birthday', score: 0 },
    { intent: 'do.you.stammer', score: 0 },
    { intent: 'i.need.help.stammer', score: 0 },
    { intent: 'survey.end.early', score: 0 },
    { intent: 'survey.repeat.question', score: 0 },
    { intent: 'survey.answer', score: 0 }
  ],
  intent: 'survey.start',
  score: 1,
  domain: 'default',
  entities: [],
  sourceEntities: [],
  answers: [],
  answer: undefined,
  actions: [],
  sentiment: {
    score: 0,
    numWords: 0,
    numHits: 0,
    average: 0,
    type: undefined,
    locale: undefined,
    vote: 'neutral'
  }

}; */
