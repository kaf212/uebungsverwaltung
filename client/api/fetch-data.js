


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


function loadUebungenPreview() {
    fetch("http://localhost:3000/api/uebungen").then(res => res.json()).then(res => {
        res.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        });
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
            document.getElementById(targetPreview).innerHTML += `<div>${item.date}: <b><a class="preview-link">${item.title}</a></b><br>${leiterString}<br>Ort: ${item.place}</div>`
            document.getElementById(targetPreview).lastChild.setAttribute("data-id", item._id)

        })
        addPreviewEventListeners()
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
            window.open(`../app/pages/uebung.html?id=${itemId}`, "_blank") // ChatGPT
        })
    })
}

export {loadUebungenPreview, getSingleUebung, loadSingleUebung}