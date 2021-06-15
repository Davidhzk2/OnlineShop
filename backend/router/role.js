const express = require("express");
const router = express.Router();

const Role = require("../models/role");

router.post("/registerRole", async (req, res) =>{
    if(!req.body.name || !req.body.description) return res.status(400).send("Incomplete Data!");

    const roleExist = await Role.findOne({name: req.body.name});
    if(roleExist) return res.status(400).send("Role already Exists !");
    
    const role  = new Role({
        name : req.body.name,
        description: req.body.description,
        status : true, 
    });

    const result = await role.save();

    if(!result) return res.status(400).send("Error: to register role");
    return res.status(200).send({result});
});

router.get("/listRole", async (req, res) =>{
    const role = await Role.find();
    if(!role) return res.status(400).send("There are not Role");
    return res.status(200).send({role});
});

module.exports = router;
