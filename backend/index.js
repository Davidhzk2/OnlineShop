const express = require('express');
require("dotenv").config();
const {dbConnection} = require("./db/db");

const Role = require("./router/role");
const User = require("./router/user");
const Auth = require("./router/auth");

const app = express();

app.use(express.json());

app.use("/api/role/", Role);
app.use("/api/user/", User);
app.use("/api/auth/", Auth);

app.listen(process.env.PORT , () =>
    console.log("Server Running on port:" + process.env.PORT)
);

dbConnection();
