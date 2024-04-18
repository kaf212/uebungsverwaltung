const express = require("express");
const app = express();
const uebungRoutes = require("./routes/uebung-routes.js");
const {connect} = require("mongoose");
const Uebungen = require('./models/uebung-model');
const cors = require("cors")

// Allow requests from localhost:63342
app.use(cors({
    origin: 'http://localhost:63342'
}));


app.use(express.json())
app.use("/uebungen", uebungRoutes)


// MongoDB connection
connect('mongodb://127.0.0.1:27017/uebungsverwaltung', {
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

insertTestdata().then(()=>{
    console.log("Testdata inserted")
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});