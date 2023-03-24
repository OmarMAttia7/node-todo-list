import Database from 'better-sqlite3';
const db = new Database('data/task-manager.db');
db.pragma('journal_mode = WAL');

export default db;