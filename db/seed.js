const db = require("../db/queries");

const seed = async () => {
  await db.createMessage("Hi there!", "Amando");
  await db.createMessage("Hello World!", "Charles");
  await db.createMessage("What's everyone up to?", "Derek");
  await db.createMessage("Learning PostgreSQL!", "Alice");

  console.log("Database populated!");
};

seed();
