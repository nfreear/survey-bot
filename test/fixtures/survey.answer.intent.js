/**
 * @intent survey.answer
 */

module.exports = [
  {
    message: "I'm no", // I'm called Nick.
    channel: 'directline',
    app: 'default',
    from: { id: 'nick', name: 'Nick User', role: 'user' },
    activity: {
      channelData: {
        surveyData: { qIndex: 0 },
        clientActivityID: '1622446997389vlyanmhkvsb',
        clientTimestamp: '2021-05-31T07:43:17.389Z'
      },
      text: "I'm no",
      textFormat: 'plain',
      type: 'message',
      channelId: 'emulator',
      from: { id: 'nick', name: 'Nick User', role: 'user' },
      locale: 'en-US',
      timestamp: '2021-05-31T07:43:17.389Z',
      serviceUrl: 'http://localhost:3000',
      conversation: { id: 'f9a60274-1196-49aa-1789-35ae1db27503' },
      address: { conversation: {} },
      id: '82bd4e57-7597-f4ec-8f55-4985d8203608'
    },
    locale: 'en',
    utterance: "I'm no",
    languageGuessed: true,
    localeIso2: 'en',
    language: 'English',
    nluAnswer: {
      classifications: [ {}, {}, {}, {} ], // 4.
      entities: undefined,
      explanation: undefined
    },
    classifications: [
      { intent: 'survey.answer', score: 0.8337598858853986 },
      { intent: 'survey.start', score: 0.08543307621782124 },
      { intent: 'survey.end.early', score: 0.07988892315998217 },
      { intent: 'i.need.help.stammer', score: 0.00091811473679787 }
    ],
    intent: 'survey.answer',
    score: 0.8337598858853986,
    domain: 'default',
    entities: [],
    sourceEntities: [],
    answers: [],
    answer: undefined,
    _answer: '_Question 2 of 4._ Can you tell me your age?',
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
    _text: '_Question 2 of 4._ Can you tell me your age?',
    _inputHint: 'expectingInput',
    _Answer: {
      intent: 'survey.answer',
      theEnd: false,
      qIndex: 1,
      question: '_Question 2 of 4._ Can you tell me your age?'
    }
  },


  {
    message: 'Cancelled', // I'm 34 years old.
    channel: 'directline',
    app: 'default',
    from: { id: 'nick', name: 'Nick User', role: 'user' },
    activity: {
      channelData: {
        surveyData: { qIndex: 1 },
        clientActivityID: '16224470160320mczrb7dh82',
        clientTimestamp: '2021-05-31T07:43:36.032Z'
      },
      text: 'Cancelled',
      textFormat: 'plain',
      type: 'message',
      channelId: 'emulator',
      from: { id: 'nick', name: 'Nick User', role: 'user' },
      locale: 'en-US',
      timestamp: '2021-05-31T07:43:36.032Z',
      serviceUrl: 'http://localhost:3000',
      conversation: { id: 'f9a60274-1196-49aa-1789-35ae1db27503' },
      address: { conversation: {} },
      id: '0c7f2d57-4569-e8f7-0c59-375254e8194a'
    },
    locale: 'en',
    utterance: 'Cancelled',
    languageGuessed: true,
    localeIso2: 'en',
    language: 'English',
    nluAnswer: {
      classifications: [ {}, {}, {}, {}, {}, {}, {} ], // 7.
      entities: undefined,
      explanation: undefined
    },
    classifications: [
      { intent: 'survey.start', score: 0 },
      { intent: 'survey.end.early', score: 0 },
      { intent: 'survey.repeat.question', score: 0 },
      { intent: 'agent.birthday', score: 0 },
      { intent: 'survey.answer', score: 0 },
      { intent: 'do.you.stammer', score: 0 },
      { intent: 'i.need.help.stammer', score: 0 }
    ],
    intent: 'None',
    score: 1,
    domain: 'default',
    entities: [],
    sourceEntities: [],
    answers: [],
    _answer: '_Question 3 of 4._ And what is your complete address?',
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
    _text: '_Question 3 of 4._ And what is your complete address?',
    _inputHint: 'expectingInput',
    _Answer: {
      intent: 'None',
      theEnd: false,
      qIndex: 2,
      question: '_Question 3 of 4._ And what is your complete address?'
    }
  },


  {
    message: 'Baker Street', // I live at 221 B Baker Street, London.
    channel: 'directline',
    app: 'default',
    from: { id: 'nick', name: 'Nick User', role: 'user' },
    activity: {
      channelData: {
        surveyData: { qIndex: 2 },
        clientActivityID: '162244703536858b9rwj6r5p',
        clientTimestamp: '2021-05-31T07:43:55.368Z'
      },
      text: 'Baker Street',
      textFormat: 'plain',
      type: 'message',
      channelId: 'emulator',
      from: { id: 'nick', name: 'Nick User', role: 'user' },
      locale: 'en-US',
      timestamp: '2021-05-31T07:43:55.368Z',
      serviceUrl: 'http://localhost:3000',
      conversation: { id: 'f9a60274-1196-49aa-1789-35ae1db27503' },
      address: { conversation: {} },
      id: 'd9e4b2c0-267a-afdc-28e4-3431c4871994'
    },
    locale: 'en',
    utterance: 'Baker Street',
    languageGuessed: true,
    localeIso2: 'en',
    language: 'English',
    nluAnswer: {
      classifications: [ {}, {}, {}, {}, {}, {} ], // 6.
      entities: undefined,
      explanation: undefined
    },
    classifications: [
      { intent: 'survey.answer', score: 1 },
      { intent: 'survey.start', score: 0 },
      { intent: 'survey.end.early', score: 0 },
      { intent: 'survey.repeat.question', score: 0 },
      { intent: 'agent.birthday', score: 0 },
      { intent: 'do.you.stammer', score: 0 }
    ],
    intent: 'survey.answer',
    score: 1,
    domain: 'default',
    entities: [],
    sourceEntities: [],
    answers: [],
    answer: '_Question 4 of 4._ Can you read: “If you can keep your head when all about you Are losing theirs and blaming it on you …”?',
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
    text: '_Question 4 of 4._ Can you read: “If you can keep your head when all about you Are losing theirs and blaming it on you …”?',
    inputHint: 'expectingInput',
    _Answer: {
      intent: 'survey.answer',
      theEnd: false,
      qIndex: 3,
      question: '_Question 4 of 4._ Can you read: “If you can keep your head when all about you Are losing theirs and blaming it on you …”?'
    }
  },


  {
    message: 'If you can keep your head when all about you are losing theirs and blaming it on you',
    channel: 'directline',
    app: 'default',
    from: { id: 'nick', name: 'Nick User', role: 'user' },
    activity: {
      channelData: {
        surveyData: { qIndex: 3 },
        clientActivityID: '1622447061062j40zoasp46',
        clientTimestamp: '2021-05-31T07:44:21.063Z'
      },
      text: 'If you can keep your head when all about you are losing theirs and blaming it on you',
      textFormat: 'plain',
      type: 'message',
      channelId: 'emulator',
      from: { id: 'nick', name: 'Nick User', role: 'user' },
      locale: 'en-US',
      timestamp: '2021-05-31T07:44:21.063Z',
      serviceUrl: 'http://localhost:3000',
      conversation: { id: 'f9a60274-1196-49aa-1789-35ae1db27503' },
      address: { conversation: {} },
      id: '215f4ee3-cef8-b741-7ded-6130cbd97789'
    },
    locale: 'en',
    utterance: 'If you can keep your head when all about you are losing theirs and blaming it on you',
    languageGuessed: true,
    localeIso2: 'en',
    language: 'English',
    nluAnswer: {
      classifications: [ {} ],
      entities: undefined,
      explanation: undefined
    },
    classifications: [ { intent: 'survey.answer', score: 1 } ],
    intent: 'survey.answer',
    score: 1,
    domain: 'default',
    entities: [],
    sourceEntities: [],
    answers: [],
    answer: "Thank you for your help! That's the end ;)",
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
    text: "Thank you for your help! That's the end ;)",
    inputHint: 'expectingInput',
    _Answer: {
      intent: 'survey.answer',
      theEnd: true,
      qIndex: null,
      question: "Thank you for your help! That's the end ;)"
    }
  }

];
