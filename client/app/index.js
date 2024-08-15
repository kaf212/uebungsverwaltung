import {postNewUebung} from "./send-data.js"
import {loadUebungenPreview} from "./fetch-data.js";



function addUebFormEventListener() {
    document.getElementById("uebForm").addEventListener("submit", (event)=>{
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        const newUebungJson = {
            "title": data.get("title"),
            "date": data.get("date").toLocaleString(),
            "level": data.get("level"),
            "place": data.get("place"),
            "program": data.get("program"),
            "people": data.getAll("people[]")
        }
        postNewUebung(newUebungJson)
        event.currentTarget.reset()
        loadUebungenPreview()
    })
}


addUebFormEventListener()

loadUebungenPreview()




