const { Router } = require("express");
const { body, validationResult } = require("express-validator");
const db = require("../db/queries.js");

const indexRouter = Router();

const validateMessage = [
  body("author")
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage("Name is required (max 50 characters)"),
  body("message")
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage("Message is required (max 255 characters)"),
];

// const messages = [
//   {
//     text: "Hi there!",
//     user: "Amando",
//     added: new Date(),
//   },
//   {
//     text: "Hello World!",
//     user: "Charles",
//     added: new Date(),
//   },
// ];
//
indexRouter.get("/", async (req, res) => {
  const messages = await db.getMessages();

  res.render("index", {
    title: "Mini Messageboard",
    messages: messages,
  });
});

indexRouter.get("/new", (req, res) => {
  res.render("form");
});

indexRouter.post("/new", validateMessage, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("form", {
      errors: errors.array(),
      author: req.body.author,
      message: req.body.message,
    });
  }
  await db.createMessage(req.body.message, req.body.author);
  res.redirect("/");
});

indexRouter.get("/message/:id", async (req, res) => {
  const message = await db.getMessage(req.params.id);
  res.render("message", {
    message: message,
  });
});

module.exports = indexRouter;
