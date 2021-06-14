/**
 * Manage a MySQL database connection, and DB inserts.
 *
 * @copyright © Nick Freear, 07-June-2021.
 * @see https://npmjs.com/package/mysql2;
 */

const mysql = require('mysql2');
// const mysql = require('mysql2/promise');

const { loadSanitizeEnv } = require('./load-sanitize-env');

// Table names.
const TBL_ONHEAR = 'onhear_transcript';

class Database {
  constructor() {
    this.connection = null;
  }

  getConnection () {
    if (!this.connection) {
      this.connection = this.connect();
    }
    return this.connection;
  }

  connect () { // NOT: 'async'
    const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DATABASE, DB_DEBUG } = loadSanitizeEnv();

    // create the connection
    const conn = mysql.createConnection({
      host: DB_HOST || 'localhost',
      port: DB_PORT ? parseInt(DB_PORT) : 3306,
      user: DB_USER || 'root',
      password: DB_PASSWORD || '',
      database: DATABASE || 'test',
      charset: 'UTF8_GENERAL_CI',
      debug: DB_DEBUG || false,
    });

    // Query database
    // const [rows, fields] = await conn.execute('SELECT * FROM `table` WHERE `name` = ? AND `age` > ?', ['Morty', 14]);

    console.log('dbConnect:', DATABASE, conn.threadId);

    return conn;
  }

  query(sqlQueryStr, dataArray = []) {
    return this.execute(sqlQueryStr, dataArray);
  }

  execute(sqlQueryStr, dataArray = []) {
    const conn = this.getConnection();

    const promise = new Promise((resolve, reject) => {
      conn.execute(
        sqlQueryStr, dataArray, (err, results, fields) => {
          if (err) {
            return reject(err);
          }

          if (fields) {
            resolve([ results, fields ]);
          } else {
            resolve(results);
          }
        }
      );
    });

    return promise;
  }

  onHearInsert(userID, conversationId, text, payloadObj) { // Not: 'async' !
    return this.execute(
      `INSERT INTO \`${TBL_ONHEAR}\` (user_id, conversation_id, text, payload) VALUES (?, ?, ?, ?)`,
      [ userID, conversationId, text, JSON.stringify(payloadObj) ]
    );
  }
}

// The singleton database connection.
const database = new Database();

/* onHearInsert ~ Result: [
  ResultSetHeader {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 1,
    info: '',
    serverStatus: 2,
    warningStatus: 0
  },
  undefined
] */

module.exports = { database, TBL_ONHEAR }; // { getConnection, onHearInsert };
