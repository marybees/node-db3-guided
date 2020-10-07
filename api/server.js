const express = require("express");
const helmet = require("helmet");
const dbConfig = require("../data/db-config.js");

const UserRouter = require("../users/user-router.js");

const server = express();

server.use(helmet());
server.use(express.json());

server.use("/api/users", UserRouter);

server.get("/api/posts", (req, res) => {
  dbConfig("posts as p")
    .join("users as u", "p.user_id", "=", "u.id")
    .select("p.id", "p.contents", "u.username as postedBy")
    .then((posts) => {
      res.status(200).json({ data: posts });
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

module.exports = server;
