/**
 * Plugin to save conversation transcript to database.
 *
 * @copyright © Nick Freear, 06-June-2021.
 */

const { defaultContainer, Clonable } = require('@nlpjs/core');

const { database } = require('../database');
const { loadSanitizeEnv } = require('../load-sanitize-env');

class LogToDatabase extends Clonable {
  constructor (settings = {}, container) {
    super({
      settings: {},
      container: settings.container || container || defaultContainer
    },
    container
    );

    this.name = 'logToDatabase';

    const { LOG_TO_DB } = loadSanitizeEnv();

    this.enableDb = LOG_TO_DB;

    this.logger.info(`${this.name}. Enabled? ${this.enableDb}`);

    // WAS: this.initialize();
  }

  run (input) {
    const ACT = input.activity;
    const userID = ACT.from.id; // OR: input.activity.from.id;
    const convID = ACT.conversation.id;
    const text = ACT.text;

    this.logger.info(`${this.name}.run(): userID=${userID}`);

    // console.log(JSON.stringify(input, null, 2));

    if (this.enableDb) {
      const intent = input.intent || null;
      const score = input.score || null;
      const answer = input.answer || null;

      database
        .logTranscript(userID, convID, text, answer, intent, score, input)
        .then(res => {
          this.logger.log(`Saved OK ~ convId:${convID}, userId:${userID}, insertId:${res.insertId}, "${text}"`);
        });
    }

    return input;
  }

  /** @TODO ~ Deprecated / To DELETE ?!
  */
  initialize () {
    const directlineCon = this.directlineCon = this.container.get('directline');

    if (!directlineCon) {
      return this.logger.warn(`Warning: directline connector missing? (${this.name})`);
    }

    // console.log('DL connector:', directlineCon);

    directlineCon.onHear = (ctr, conv) => { // NOT 'async' ?!
      const userID = conv.activity.from.id;
      const convID = conv.activity.conversation.id;
      const text = conv.activity.text;

      this.logger.log(`onHear ~ userId:${userID} "${text}" `);

      // console.log('onHear:', JSON.stringify(conv, null, 2));

      return new Promise((resolve, reject) => {
        database.onHearInsert(userID, convID, text, conv.activity) // WAS: `conv`
          .then(res => {
            this.logger.log(`onHearInsert OK ~ convId:${convID}, userId:${userID}, insertId:${res.insertId}, "${text}"`);

            resolve(res.insertId);
          });

        // TODO: We can resolve immediately ?!
      });
    };
  }
}

module.exports = LogToDatabase;


/* onHear: {
  "message": "Go",
  "channel": "directline",
  "app": "default",
  "from": {
    "id": "jxb1234", "name": "User Jo", "role": "user"
  },
  "activity": {
    "channelData": {
      "surveyData": { "theEnd": false },
      "speechOpt": {
        "region": "uksouth", "subscriptionKey": "XXXX", "defaultTimeout": 0.5, "useAdaptive": true, "endSilenceTimeoutMs": 500
      },
      "metaMethod": "speech",
      "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36",
      "clientActivityID": "1622982408536pqv3rxg1hl",
      "clientTimestamp": "2021-06-06T12:26:48.536Z"
    },
    "text": "Go",
    "textFormat": "plain",
    "type": "message",
    "channelId": "emulator",
    "from": {
      "id": "jxb1234", "name": "User Jo", "role": "user"
    },
    "locale": "en-GB",
    "timestamp": "2021-06-06T12:26:48.536Z",
    "entities": [
      {
        "requiresBotState": true,
        "supportsListening": true,
        "supportsTts": true,
        "type": "ClientCapabilities"
      }
    ],
    "serviceUrl": "http://localhost:3000",
    "conversation": { "id": "9e9c25a1-a056-fbd7-6236-ac5d1c76eaef" },
    "address": {
      "conversation": { "id": "9e9c25a1-a056-fbd7-6236-ac5d1c76eaef" }
    },
    "id": "d3e1350b-1a51-c788-e937-b9bb9fdbc131"
  }
} */

// End.
