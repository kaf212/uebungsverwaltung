async function getSingleUebung(id) {
    let uebung = undefined

    const response = await fetch(`http://localhost:3000/api/uebungen/${id}`);
    uebung = await response.json();
    return uebung
}

async function loadSingleUebung(id) {
    const uebung = await getSingleUebung(id)
    document.getElementsByClassName("main-container")[0].innerHTML += `<div><h1>${uebung.date}: <b>${uebung.title}</h1></b><br><h3>${uebung.people}</h3><br><h3>${uebung.place}</h3><br>${uebung.program}</div>`
}

async function getAllUebungen() {
    const response = await fetch("http://localhost:3000/api/uebungen")
    return await response.json()
}


async function loadUebungenPreview() {
    // Remove all elements from Uebungen Previews
    Array.from(document.getElementById("pastPreview").querySelectorAll("div")).forEach(ueb => ueb.remove())
    Array.from(document.getElementById("futurePreview").querySelectorAll("div")).forEach(ueb => ueb.remove())

    let res = await getAllUebungen()
    console.log(res)
    res = res.slice(0, 50) // limit preview to maximum of 50 Uebungen
    res.forEach(item =>{

        let leiterString = "Leitpersonen: "
        leiterString += item.people[0]
        for (let i=1;i<item.people.length;i++) {
            leiterString += `, ${item.people[i]}`
        }
        let targetPreview = undefined
        if (new Date(item.date) > new Date()) {
            targetPreview = "futurePreview"
        }
        else {
            targetPreview = "pastPreview"
        }

        console.log(item)

        let imgSrc = undefined

        if (item.level === "wolf") {
            imgSrc = "woelfe.png"
        }
        else {
            imgSrc = "pfadis.png"
        }
        document.getElementById(targetPreview).innerHTML += `<div><div class="uebungen-preview-text-container"><p>${item.date}: ${item.title}<br>${leiterString}<br>Ort: ${item.place}</p></div> <div class="uebungen-preview-img-container"><img class="uebungen-preview-img" src="../app/img/${imgSrc}" alt=""></div></div>`
        document.getElementById(targetPreview).lastChild.setAttribute("data-id", item._id)

        })
            document.getElementById("pastPreview").innerHTML += "<a href='../app/pages/archive.html'>Archiv</a>"
        addPreviewEventListeners()

}

function addPreviewEventListeners() {
    let allPreviewUebungElements = []
    Array.from(document.getElementsByClassName("uebungen-preview")).forEach(previewList =>{
        Array.from(previewList.children).forEach(elem =>{
            console.log(elem)
            if (elem.tagName === "div") {
                allPreviewUebungElements.push(elem)
            }

        })
    })
    allPreviewUebungElements.forEach(item =>{
        item.addEventListener("click", (event)=>{
            const itemId = event.currentTarget.getAttribute('data-id')
            window.open(`../app/pages/uebung.html?id=${itemId}`, "_blank") // ChatGPT
        })
    })
}

export {loadUebungenPreview, getSingleUebung, loadSingleUebung, getAllUebungen, addPreviewEventListeners}