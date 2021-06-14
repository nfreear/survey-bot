/**
 *
 * @author NDF, 14-Jun-2021.
 */

const { database, TBL_ONHEAR } = require('./database');

(async () => {
  const DB = database;

  const [resC, fieldC] = await DB.query(`SELECT COUNT(*) as count FROM ${TBL_ONHEAR}`);

  console.log('DB count rows:', resC[0].count);

  const [resL] = await DB.query(`SELECT *,payload->"$.activity.channelData.userAgent" AS ua FROM ${TBL_ONHEAR} ORDER BY created_at DESC LIMIT 1`); // ,payload->"$."

  const { id,user_id,conversation_id,text,created_at, payload, ua } = resL[0];

  console.log(`Last row: ${conversation_id}, "${text}", ${ua}`, JSON.stringify(payload.activity, null, 2));

  process.exit();
})();
