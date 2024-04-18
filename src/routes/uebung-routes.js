const express = require('express');
const Uebungen = require('../models/uebung-model');
const {json} = require("express");
const router = express.Router();

// Get all Uebungen
router.get("/", async (req, res) => {
    try {
        const uebungen = await Uebungen.find();
        console.log(uebungen)
        res.json(uebungen);
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