let apiUrl = "/api"


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
            window.open(`../pages/uebung.html?id=${itemId}`, "_blank") // ChatGPT
        })
    })
}

export {loadUebungenPreview, getSingleUebung, loadSingleUebung}