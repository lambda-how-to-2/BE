const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authmw = require("../auth/auth-middleware.js");
const welcomeRouter = require("../howtodos/welcome");
const HowtodosRouter = require("../howtodos/howtodos-router");
const authRouter = require("../auth/auth-router");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/", welcomeRouter);
server.use("/api/auth", authRouter);
server.use("/api/howtodos", authmw.loginValid("normal"), HowtodosRouter);

module.exports = server;
