/**
 *
 * @author NDF, 06-June-2021.
 */

module.exports = {

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
        "region": "uksouth", "subscriptionKey": "xxx", "defaultTimeout": 0.5, "useAdaptive": true, "endSilenceTimeoutMs": 500
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
};
