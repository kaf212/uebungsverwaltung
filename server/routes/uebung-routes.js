const express = require('express');
const Uebungen = require('../models/uebung-model');
const mongo = require("mongodb")
const {json} = require("express");
const router = express.Router();


// All endpoints need to be listed before "/" and "/:id" !
router.get('/search', async (req, res) => {
    const searchTerm = req.query.q;

    console.log(searchTerm); // Sanity check

    try {
        const results = await Uebungen.find({
            "title": { $regex: new RegExp(searchTerm, 'i') }, // Case-insensitive regex on 'title'
            "_id": { $exists: true } // Ensuring it's not querying on `_id`
        });

        res.json(results);
    } catch (err) {
        res.status(501)
    }
});

// Get all Uebungen
router.get("/", async (req, res) => {
    try {
        const uebungen = await Uebungen.find();
        res.json(uebungen);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
})

router.get("/:id", async (req, res)=>{
    try {
        const uebung = await Uebungen.findOne({"_id": new mongo.ObjectId(req.params.id)});
        res.json(uebung);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
})



// Create new Uebung
router.post("/", async (req, res) => {
    try {
        delete req.body._id;
        await Uebungen.insertMany([req.body]);
        res.send(200)
    } catch (err) {
        res.status(500).json({message: err.message});
    }
})

router.put("/", async (req, res) => {
    try {
        console.log(req.body);

        // Delete the original document by ID
        await Uebungen.findByIdAndDelete(req.body._id);

        // Insert the updated document
        await Uebungen.insertMany([req.body]);

        res.sendStatus(200);
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.error(err);
    }
});


module.exports = router;