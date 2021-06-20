const express = require('express');
const router = express.Router();

const Category = require('../models/category');
const Auth = require('../middleware/auth');

router.post("/registerCategory",Auth, async (req, res) =>{
    if(!req.body.name) return res.status(400).send("Incomplete Data.");

    const categoryExist = await Category.findOne({name:req.body.name});
    if(categoryExist) return res.status(400).send("the Category alreadyt exists!");

    const category = new Category({
        name: req.body.name,
        status: true
    });

    const result = await category.save();
    
    if(!result) return res.status(400).send("Error to Register category");
    return res.status(400).send({result});
});

router.get("/listCategories", Auth, async (req, res) =>{
    const category = await Category.find();
    if(!category) return res.status(400).send("There are not categories");
    return res.status(200).send({category});
});

router.put("/updateCategory", Auth, async (req, res) =>{
    if(!req.body._id || !req.body.name ) return res.status(400).send("Incomplete Data!");
    
    const category =  await Category.findByIdAndUpdate(req.body._id,{
        name:req.body.name,
    });
    if(!category) return res.status(400).send("Process Failed: Error editing Category.");
    return res.status(200).send({category});
});

router.put("/deactivateCategory", Auth, async (req, res)=>{
    if(!req.body._id || !req.body.name) return res.status(400).send("Incomplete data.");

    const category = await Category.findByIdAndUpdate(req.body._id,{
    name: req.body.name,
    status: false 
    });
    if(!category) return res.status(400).send("Process Failed: Error deleting Category.");
    return res.status(200).send({category});
});
router.put("/activateCategory", Auth, async (req, res)=>{
    if(!req.body._id || !req.body.name) return res.status(400).send("Incomplete data.");

    const category = await Category.findByIdAndUpdate(req.body._id,{
    name: req.body.name,
    status: true
    });
    if(!category) return res.status(400).send("Process Failed: Error activando Category.");
    return res.status(200).send({category});
});


module.exports = router;