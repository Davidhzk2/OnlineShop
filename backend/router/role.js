const express = require("express");
const { mongoose } = require("mongoose");
const router = express.Router();

const Role = require("../models/role");
const Auth = require("../middleware/auth");

router.post("/registerRole", Auth, async (req, res) =>{
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

router.get("/listRole", Auth, async (req, res) =>{
    const role = await Role.find();
    if(!role) return res.status(400).send("There are not Role");
    return res.status(200).send({role});
});

router.put("/updateRole", Auth, async (req, res) =>{
    if(!req.body._id || !req.body.name  || !req.body.description) return res.status(400).send("Incomplete Data!");
    
    const role =  await Role.findByIdAndUpdate(req.body._id,{
        name:req.body.name,
        description:req.body.description
    });
    if(!role) return res.status(400).send("Process Failed: Error editing  role.");
    return res.status(200).send({role});
});

router.put("/deactivateRole", Auth, async (req, res)=>{
    if(!req.body._id || !req.body.name  || !req.body.description) return res.status(400).send("Incomplete data.");
    
    const role = await Role.findByIdAndUpdate(req.body._id,{
    name: req.body.name,
    description:req.body.description,
    status: false 
    });
    if(!role) return res.status(400).send("Process Failed: Error deleting role.");
    return res.status(200).send({role});
});

router.put("/activateRole", async (req, res)=>{
    if(!req.body._id || !req.body.name  || !req.body.description) return res.status(400).send("Incomplete data.");
    
    const role = await Role.findByIdAndUpdate(req.body._id,{
    name: req.body.name,
    description:req.body.description,
    status: true 
    });
    if(!role) return res.status(400).send("Process Failed: Error deleting role.");
    return res.status(200).send({role});
});




module.exports = router;
