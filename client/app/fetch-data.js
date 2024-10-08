let apiUrl = "http://localhost:3000/api"

async function getAllUebungen() {
    let json = undefined

    const response = await fetch(`${apiUrl}/uebungen`);
    json = await response.json();
    return json
}

async function searchUebung(query) {
    const response = await fetch(`${apiUrl}/uebungen/search?q=${encodeURIComponent(query)}`);
    return await response.json()
}

async function getSingleUebung(id) {
    let uebung = undefined

    const response = await fetch(`${apiUrl}/uebungen/${id}`);
    uebung = await response.json();
    return uebung
}

async function loadSingleUebung(id) {
    const uebung = await getSingleUebung(id)
    document.getElementsByClassName("main-container")[0].innerHTML += `<div><h1>${uebung.date}: <b>${uebung.title}</h1></b><br><h3>${uebung.people}</h3><br><h3>${uebung.place}</h3><br>${uebung.program}</div>`
}


function loadUebungenPreview() {
    // Remove all elements from Uebungen Previews
    Array.from(document.getElementById("pastPreview").querySelectorAll("div")).forEach(ueb => ueb.remove())
    Array.from(document.getElementById("futurePreview").querySelectorAll("div")).forEach(ueb => ueb.remove())

        fetch(`${apiUrl}/uebungen`).then(res => res.json()).then(res => {
        res.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        });
        generateAndInsertPreviewHTML(res, false)
        addPreviewEventListeners()
    })
}

function loadSearchPreview(searchTerm) {
    searchUebung(searchTerm).then(data => {
        generateAndInsertPreviewHTML(data, true)
        if (document.getElementById("searchPreview").innerHTML === "") {
            document.getElementById("searchPreview").innerHTML = "<p>Keine Resultate gefunden.</p>"
        }
    })
}

function generateAndInsertPreviewHTML(json, isForSearchPreview) {
    json.forEach(item =>{

        let leiterString = "Leitpersonen: "
        leiterString += item.people[0]
        for (let i=1;i<item.people.length;i++) {
            leiterString += `, ${item.people[i]}`
        }
        let targetPreview = undefined
        if (isForSearchPreview) {
            targetPreview = "searchPreview"
        }
        else if (new Date(item.date) > new Date()) {
            targetPreview = "futurePreview"
        }
        else {
            targetPreview = "pastPreview"
        }

        let imgSrc = undefined

        if (item.level === "wolf") {
            imgSrc = "woelfe.png"
        }
        else {
            imgSrc = "pfadis.png"
        }
        document.getElementById(targetPreview).innerHTML += `<div class="uebungen-preview-uebung-container"><div class="uebungen-preview-text-container"><p>${item.date}: ${item.title}<br>${leiterString}<br>Ort: ${item.place}</p></div> <div class="uebungen-preview-img-container"><img class="uebungen-preview-img" src="./img/${imgSrc}" alt=""></div></div>`
        document.getElementById(targetPreview).lastChild.setAttribute("data-id", item._id)

    })
}

function addPreviewEventListeners() {
    let allPreviewUebungElements = []
    Array.from(document.getElementsByClassName("uebungen-preview")).forEach(previewList =>{
        Array.from(previewList.children).forEach(elem =>{
            allPreviewUebungElements.push(elem)

        })
    })

    allPreviewUebungElements.forEach(item =>{
        item.addEventListener("click", (event)=>{
            const itemId = event.currentTarget.getAttribute('data-id')
            window.location = `./pages/uebung.html?id=${itemId}`
        })
    })
}

export {loadUebungenPreview, getSingleUebung, loadSingleUebung, addPreviewEventListeners, getAllUebungen, loadSearchPreview}