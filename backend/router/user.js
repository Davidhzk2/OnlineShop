const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/user");
const Role = require("../models/role");

const Auth = require("../middleware/auth");

router.post("/registerUser/", async (req, res)=>{
    if(!req.body.name || !req.body.email || !req.body.password ) return res.status(400).send("Incomplete data.");

    let user = await User.findOne({email: req.body.email});
    if(user) return res.status(400).send("Email already exists!");

    const hash = await  bcrypt.hash(req.body.password, 10);

    const role = await Role.findOne({name: "client"});
    if(!role) return res.status(400).send("No role assigned");

    user = new  User({
        roleId: role._id,
        fullname : req.body.name,
        email: req.body.email,
        password: hash,
        status: true,
    });
    try {
        const result = await user.save()
        if(!result) return res.status(400).send("Fialed to register user!");
        const jwtToken = user.generateJWT();
        res.status(200).send({jwtToken});
    } catch (error) {
        console.log(error);
        return res.status(400).send("Failed to register user.");
    }
});

router.put("/updateUser",Auth, async (req, res)=>{
    if(!req.body._id || !req.body.name || !req.body.email || !req.body.password || !req.body.roleId) return res.status(400).send("Incomplete data.");

    const hash = await  bcrypt.hash(req.body.password, 10);

    const user  = await User.findByIdAndUpdate(req.body._id,{
        roleId: req.body.roleId,
        fullname: req.body.name,
        email: req.body.email,
        password: hash,
        phone: req.body.phone,
        status: true
    });

    if(!user) return res.status.send("Process failed: Error editing user.");
    return res.status(200).send({user});
});

router.put("/deactivateUser",Auth, async (req, res)=>{
    if(!req.body._id || !req.body.name || !req.body.email || !req.body.password || !req.body.roleId) return res.status(400).send("Incomplete data.");

    const hash = await  bcrypt.hash(req.body.password, 10);

    const user  = await User.findByIdAndUpdate(req.body._id,{
        roleId: req.body.roleId,
        fullname: req.body.name,
        email: req.body.email,
        password: hash,
        phone: req.body.phone,
        status: false
    });

    if(!user) return res.status.send("Process failed: Errordeliting user.");
    return res.status(200).send({user});
});

module.exports = router;