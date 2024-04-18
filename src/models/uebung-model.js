const mongoose = require('mongoose');


const uebungSchema = new mongoose.Schema({
    title: String,
    date: String,
    place: String,
    program: String,
    people: Array
});


const Uebung = mongoose.model("uebungen", uebungSchema, "uebungen");

module.exports = Uebung;
