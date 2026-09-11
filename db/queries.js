const db = require("./pool");

const createMessage = async (text, author) => {
  await db.query(`INSERT INTO messages (text, "author") VALUES ($1, $2)`, [
    text,
    author,
  ]);
};

const getMessage = async (id) => {
  const result = await db.query(`SELECT * FROM messages WHERE id = $1`, [id]);

  return result.rows[0];
};

const getMessages = async () => {
  const result = await db.query(`SELECT * FROM messages`);

  return result.rows;
};

module.exports = {
  createMessage,
  getMessage,
  getMessages,
};
