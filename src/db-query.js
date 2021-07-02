/**
 * CLI utility :~ Query the database.
 *
 * @copyright © Nick Freear, 14-June-2021.
 */

const { database, TBL_ONHEAR, TBL_TRANSCRIPT } = require('./database');

(async () => {
  const DB = database;

  const [resC, fieldC] = await DB.query(`SELECT COUNT(*) as count FROM ${TBL_TRANSCRIPT}`);
  const COUNT = resC[0].count

  console.log(`DB count rows: ${COUNT}`);

  if (!COUNT) {
    process.exit();
  }

  // Get the last row.
  const [resL, fieldL] = await DB.query(
    `SELECT *, payload->"$.activity.channelData.userAgent" AS agent, payload->"$._Answer.qIndex" AS qid
    FROM ${TBL_TRANSCRIPT} ORDER BY created_at DESC LIMIT 1`
  );

  const { id, user_id, conversation_id, text, intent, created_at, payload, agent, qid } = resL[0];

  console.log(`Last row: convID=${conversation_id}, userID=${user_id}, ${intent} "${text}" ${agent}`); // , JSON.stringify(payload.activity, null, 2));

  const [resA] = await DB.query(
    `SELECT *, payload->"$._Answer.qIndex" AS qid, payload->"$.activity.channelData.surveyData.question" AS question
    FROM ${TBL_TRANSCRIPT} WHERE conversation_id = ? ORDER BY created_at ASC`,
    [ conversation_id ]
  );

  resA.forEach(row => {
    const { id, text, intent, score, answer, created_at, qid, question } = row;
    console.log(`R: ${qid}, ${intent} ${score} "${text}", "${answer}" (${question})`);
  });

  process.exit();
})();
