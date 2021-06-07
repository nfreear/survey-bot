/**
 * @intent do.you.stammer
 * @intent i.need.help.stammer
 */

module.exports = [
  {
    message: 'Do you have a stutter?',
    from: { id: 'nick', name: 'Nick User', role: 'user' },
    activity: { channelData: {} },

    intent: 'do.you.stammer',
    score: 0.888,
    answer: undefined
  }, {
    message: 'I need help with my stammer',
    from: { id: 'nick', name: 'Nick User', role: 'user' },
    activity: { channelData: {} },

    intent: 'i.need.help.stammer',
    score: 0.888
  }
];
