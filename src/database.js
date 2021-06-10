/**
 * Manage a MySQL database connection, and DB inserts.
 *
 * @copyright © Nick Freear, 07-June-2021.
 * @see https://npmjs.com/package/mysql2;
 */

const mysql = require('mysql2/promise');

// Table names.
const TBL_ONHEAR = 'onhear_transcript';

class Database {
  constructor() {
    this.connection = null;
  }

  async getConnection () {
    if (!this.connection) {
      this.connection = await this.connect();
    }
    return this.connection;
  }

  async connect () {
    const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DATABASE, DB_DEBUG } = process.env;

    console.log('Database:', DATABASE);

    // create the connection
    const conn = await mysql.createConnection({
      host: DB_HOST || 'localhost',
      port: DB_PORT ? parseInt(DB_PORT) : 3306,
      user: DB_USER || 'root',
      password: DB_PASSWORD || '',
      database: DATABASE || 'test',
      charset: 'UTF8_GENERAL_CI',
      debug: DB_DEBUG === 'true',
    });

    // Query database
    // const [rows, fields] = await conn.execute('SELECT * FROM `table` WHERE `name` = ? AND `age` > ?', ['Morty', 14]);

    // console.log('dbConnect:', conn);

    return conn;
  }

  async onHearInsert(userID, conversationId, text, payloadObj) {
    const conn = await this.getConnection();

    const result = await conn.execute(
      `INSERT INTO \`${TBL_ONHEAR}\` (user_id, conversation_id, text, payload) VALUES (?, ?, ?, ?)`,
      [ userID, conversationId, text, JSON.stringify(payloadObj) ]
    );

    return result;
  }
}

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
