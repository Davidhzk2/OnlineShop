const express = require('express');
require("dotenv").config();
const {dbConnection} = require("./db/db");

const Auth = require("./router/auth");
const User = require("./router/user");
const Role = require("./router/role");
const Category = require("./router/category");

const app = express();

app.use(express.json());

app.use("/api/role/", Role);
app.use("/api/user/", User);
app.use("/api/auth/", Auth);
app.use("/api/category/", Category);

app.listen(process.env.PORT , () =>
    console.log("Server Running on port:" + process.env.PORT)
);

dbConnection();
