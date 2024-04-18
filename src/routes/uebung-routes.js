const express = require('express');
const Uebung = require('../models/uebung-model');
const router = express.Router();


// Get all Uebungen
router.get("/", async (req, res)=>{
    try {
        const uebungen = await Uebung.find();
        res.json(uebungen);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})


module.exports = router;