import {postNewUebung} from "../send-data.js"
import {loadUebungenPreview} from "../fetch-data.js";



function addUebFormEventListener() {
    const checkUebForm = setInterval(() => {
        const uebForm = document.getElementById("uebForm");
        if (uebForm) {
            clearInterval(checkUebForm);
            uebForm.addEventListener("submit", (event) => {
                event.preventDefault();
                const data = new FormData(event.currentTarget);
                const newUebungJson = {
                    "title": data.get("title"),
                    "date": new Date(data.get("date")).toDateString(),
                    "level": data.get("level"),
                    "place": data.get("place"),
                    "program": data.get("program"),
                    "people": data.getAll("people[]")
                };
                postNewUebung(newUebungJson);
                event.currentTarget.reset();
                setTimeout(()=>{
                    loadUebungenPreview();

                }, 100)
            });
        }
    }, 100);
}

function displayInfoBanner() {
    if (! localStorage.getItem("acknowledge_info_banner")) {
        document.querySelector(".banner").style.display = "block"
    }
    else {
        document.querySelector(".banner").style.display = "none"


}}

document.getElementById("infoBannerCloseButton").addEventListener("click", event => {
    event.currentTarget.parentElement.parentElement.remove()
    localStorage.setItem("acknowledge_info_banner", true)
})

addUebFormEventListener()

loadUebungenPreview()

displayInfoBanner()





