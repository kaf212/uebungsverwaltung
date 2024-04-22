const express = require('express');
const Uebungen = require('../models/uebung-model');
const mongo = require("mongodb")
const {json} = require("express");
const router = express.Router();

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
        console.log(`found uebung ${uebung}`)
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


module.exports = router;