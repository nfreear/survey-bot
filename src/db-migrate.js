/**
 * CLI utility :~ Create, migrate or drop database table(s).
 *
 * @copyright © Nick Freear, 14-June-2021.
 */

// DROP TABLE `speech_survey_bot`.`run_transcript`;
// DROP TABLE `speech_survey_bot`.`onhear_transcript`;

const { database, TBL_ONHEAR, TBL_TRANSCRIPT } = require('./database');

// See :~ https://dev.mysql.com/doc/refman/8.0/en/charset-unicode-sets.html#charset-unicode-sets-general-versus-unicode
const COLLATION = 'utf8_unicode_ci';

(async () => {
  try {
    // Was: CREATE TABLE \`${TBL_ONHEAR}\`
    const resCreate = await database.execute(`
      CREATE TABLE \`${TBL_TRANSCRIPT}\` (
        id int unsigned NOT NULL AUTO_INCREMENT,
        user_id varchar(64) NOT NULL COMMENT 'From the Webchat userID.',
        conversation_id varchar(64) NOT NULL COMMENT 'Character count: 36.',
        text text COMMENT 'Utterance / message from user.',
        answer text DEFAULT NULL COMMENT 'Response from the Bot.',
        intent varchar(64) DEFAULT NULL 'The top intent.',
        score DECIMAL(6, 4) DEFAULT NULL 'The score for the top intent.',
        payload json DEFAULT NULL COMMENT 'Entire "conversation" object.',
        created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (\`id\`),
        KEY onhear_transcript_userid_idx (\`user_id\`),
        KEY onhear_transcript_convid_idx (\`conversation_id\`)
      )
      ENGINE InnoDB CHARACTER SET utf8 COLLATE ${COLLATION}
    `); // Was: AUTO_INCREMENT=13;

    console.log('Database ~ Create table:', TBL_TRANSCRIPT, resCreate);
  } catch (err) {
    const { code, errno, sqlState, sqlMessage } = err;
    if (sqlState) {
      console.error(`Database ERROR: ${sqlMessage}, ${code}, ${errno}`, typeof err);
    } else {
      console.error(`ERROR:`, err);

      // ERROR: TypeError: (intermediate value) is not iterable
    }
    // process.exit(1);
  }

  const [ resShow ] = await database.execute('SHOW TABLES'); // BinaryRow { Tables_in_speech_survey_bot: 'run_transcript' }

  console.log(`Database ~ Show tables:`, resShow[0]);

  const [ resT ] = await database.execute(`SHOW CREATE TABLE ${TBL_TRANSCRIPT}`);
  const table = resT[0].Table;
  const createSql = resT[0]['Create Table'];

  console.log(`Database ~ Show create table: ${table}\n${createSql}`);

  process.exit();
})();
