require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const postRouter = require("./posts/postRouter");
const userRouter = require("./users/userRouter");

const server = express();

server.use(express.json());
server.use(morgan("dev"));
server.use(helmet());

server.use("/api/posts", logger, postRouter);
server.use("/api/users", logger, userRouter);

const secret = process.env.SECRET || "";

server.get("/", logger, (req, res) => {
    res.send(`<h1>User and Post API${secret}</h1>`);
})

function logger(req, res, next) {

    let currentTime = new Date();
    console.log( req.method, req.originalUrl, "at", currentTime.toLocaleTimeString());

    next();
}

const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log("\r\n Server running on http://localhost:" + port + "\r\n");
})