
[![CI test status][gh-badge]][gh-link]

# survey-bot

A speech-enabled, server-based Chat-bot.

Get the user to answer questions and talk about themselves!

Uses:

* [Node.js][]
* [NLP.js][]
* [Webchat.js][]
* [MS Speech SDK][speech-sdk]
* [pm2][]

## Usage

```sh
npm install
cp -n .env.example .env
vi .env # Edit '.env'
npm start
npm test
```

## Server

Daemon / pm2 usage:

```sh
sudo service pm2-pm2 restart
sudo service pm2-pm2 reload
sudo service pm2-pm2 stop
```

* See: [docs/SERVER.md][]

Legacy:

```sh
npm run pm:start
npm run pm:stop
npm run pm:logs # Run tail on the logs.
npm run pm:list
```

---
<!-- © 2021 Nick Freear. -->

[node.js]: https://nodejs.org/
  "Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine."
[nlp.js]: https://github.com/axa-group/nlp.js
  "'NLP.js' is a general natural language utility for Node.js"
[webchat.js]: https://github.com/microsoft/BotFramework-WebChat/releases/tag/v4.13.0
  "Bot Framework Web Chat Javascript component"
[speech-sdk]: https://github.com/microsoft/cognitive-services-speech-sdk-js
  "Microsoft Cognitive Services Speech SDK for JavaScript"
[speech-cdn]: https://jsdelivr.com/package/npm/microsoft-cognitiveservices-speech-sdk?path=distrib%2Fbrowser
[speech-raw]: https://aka.ms/csspeech/jsbrowserpackageraw
  "Via: github.com/Azure-Samples/cognitive-services-speech-sdk/.."
[pm2]: https://pm2.keymetrics.io/docs/usage/process-management/
  "PM2 is a daemon process manager that will help you manage and keep your application online 24/7."

[gh-badge]: https://github.com/nfreear/survey-bot/actions/workflows/node.js.yml/badge.svg
[gh-link]: https://github.com/nfreear/survey-bot/actions "Test status ~ 'Node.js CI'"
