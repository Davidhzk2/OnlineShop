const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/user");

router.post("/login/", async (req, res) =>{
    if(!req.body.email || !req.body.password) return res.status(400).send("Incomplete Data.");

    let user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send("Correo y/o contraseña incorrecta.");

    const hash = await bcrypt.compare(req.body.password, user.password);
    if(!hash) return res.status(400).send("Correo y/o contraseña incorrecta.");

    try {
        const jwtToken = await user.generateJWT();
        return res.status(200).send({jwtToken});
    } catch (error) {
        return res.status(400).send("Login Error");
    }

});

module.exports = router;