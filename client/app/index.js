import {postNewUebung} from "../api/send-data.js"
import {loadUebungenPreview} from "../api/fetch-data.js";

document.getElementById("uebForm").addEventListener("submit", (event)=>{
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const newUebungJson = {
        "title": data.get("title"),
        "date": data.get("date").toLocaleString(),
        "place": data.get("place"),
        "program": data.get("program"),
        "people": data.getAll("people[]")
    }
    postNewUebung(newUebungJson)
    event.currentTarget.reset()
    loadUebungenPreview()
})


loadUebungenPreview()



