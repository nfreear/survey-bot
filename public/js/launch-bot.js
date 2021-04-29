/*!

*/

const WebChat = window.WebChat;
// const simpleUpdateIn = window.simpleUpdateIn;

launchBot();

function launchBot () {
  // https://github.com/microsoft/BotFramework-WebChat/issues/2377#issuecomment-527895197
  // https://github.com/microsoft/BotFramework-WebChat/tree/main/samples/04.api/b.piggyback-on-outgoing-activities#
  // https://github.com/microsoft/BotFramework-WebChat/issues/2555#issuecomment-549454620
  const store = WebChat.createStore(
    {},
    () => (next) => (action) => {
      if (action.type === 'DIRECT_LINE/POST_ACTIVITY') {
        console.warn('postActivity:', action);

        action.payload.activity.channelData = {
          customEmail: 'j.doe@example.com'
        };
        // We are using the simple-update-in package to update "action" with partial deep cloning.
        // action = simpleUpdateIn(action, ['payload', 'activity', 'channelData', 'email'], () => 'j.doe@example.com');
      }

      return next(action);
    }
  /* function () {
    return function (next) {
      return function (action) {
        if (action.type === 'DIRECT_LINE/POST_ACTIVITY') { ... }

        return next(action);
      }
    }
  } */
  );

  WebChat.renderWebChat(
    {
      directLine: WebChat.createDirectLine({
        domain: '/directline',
        webSocket: false,
        // token: 'YOUR_DIRECT_LINE_TOKEN'
      }),
      userID: 'nick', // 'YOUR_USER_ID',
      username: 'Nick User',
      locale: 'en-US',
      store
    },
    document.getElementById('webchat')
  );
}
