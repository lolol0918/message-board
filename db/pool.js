require("dotenv").config();
const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = new Pool({
  connectionString: process.env.DATABASE_URL,
});
