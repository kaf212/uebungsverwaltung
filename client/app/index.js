import {postNewUebung} from "../api/send-data.js"

document.getElementById("uebForm").addEventListener("submit", (event)=>{
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    console.log(data.get("title"))
    console.log(data.getAll("people[]"))
    const newUebungJson = {
        "title": data.get("title"),
        "date": data.get("date").toLocaleString(),
        "program": data.get("program"),
        "people": data.getAll("people[]")
    }
    console.log(newUebungJson)
    postNewUebung(newUebungJson)
})

