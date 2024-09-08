const express = require("express");
const server = express();
const uebungRoutes = require("./routes/uebung-routes.js");
const {connect} = require("mongoose");
const Uebungen = require('./models/uebung-model');
const cors = require("cors")

// Allow requests from localhost:63342
server.use(cors({
    origin: 'http://localhost:63342'
}));


server.use(express.json())
server.use("/api/uebungen", uebungRoutes)
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/uebungsverwaltung';

// MongoDB connection
connect(mongoUri, {
    useNewUrlParser: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


async function insertTestdata() {
    // insert testdata into DB
    await Uebungen.insertMany([
        {
            title: "Testübung",
            date: "24-02-2006",
            place: "Wald",
            program: "Dies ist ein Test",
            people: ["Leiter1", "Leiterin2"]
        }
    ]);
}

/*
insertTestdata().then(()=>{
    console.log("Testdata inserted")
})
 */

server.get("/api/260124", (req, res)=>{
    res.send("I.C. <3")
})




const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});