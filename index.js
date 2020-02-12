const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const postRouter = require("./posts/postRouter");
const userRouter = require("./users/userRouter");

const server = express();

server.use(express.json());
server.use(morgan("dev"));
server.use(helmet());

server.use("/api/posts", postRouter);
server.use("/api/users", userRouter);

server.get("/", (req, res) => {
    res.send("<h1>User and Post API</h1>");
})

const port = 5000;
server.listen(port, () => {
    console.log("\r\n Server running on http://localhost:" + port + "\r\n");
})