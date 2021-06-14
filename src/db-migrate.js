/**
 * Create, migrate or drop database table(s).
 *
 * @author NDF, 14-Jun-2021.
 */

const { database, TBL_ONHEAR } = require('./database');

(async () => {
  try {
    const [result, fields] = await database.execute(`
      CREATE TABLE \`${TBL_ONHEAR}\` (
        id int unsigned NOT NULL AUTO_INCREMENT,
        user_id varchar(64) NOT NULL COMMENT 'From the Webchat userID.',
        conversation_id varchar(64) NOT NULL COMMENT 'Character count: 37.',
        text text COMMENT 'Utterance / message from user.',
        payload json DEFAULT NULL,
        created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (\`id\`),
        KEY onhear_transcript_user_id_index (\`user_id\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8
    `); // Was: AUTO_INCREMENT=13;

    console.log('Database ~ Create table:', TBL_ONHEAR, result, fields);
  } catch (err) {
    const { code, errno, sqlState, sqlMessage } = err;
    console.error(`Database ERROR: ${sqlMessage}, ${code}, ${errno}`, typeof err);

    process.exit(1);
  }

  process.exit();
})();
