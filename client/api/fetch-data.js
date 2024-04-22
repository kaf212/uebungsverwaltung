


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

            document.getElementById("preview").innerHTML += `<div>${item.date}: <b><a class="preview-link">${item.title}</a></b><br>${leiterString}<br>Ort: ${item.place}</div>`
            document.getElementById("preview").lastChild.style.color = "red"
            console.log(document.getElementById("preview").lastChild)
            document.getElementById("preview").lastChild.setAttribute("data-id", item._id)

        })
        addPreviewEventListeners()
    })
}

function addPreviewEventListeners() {
    Array.from(document.getElementById("preview").children).forEach(item =>{
        item.addEventListener("click", (event)=>{
            const itemId = event.currentTarget.getAttribute('data-id')
            window.location = `../app/pages/uebung.html?id=${itemId}`; // ChatGPT
        })
    })
}

export {loadUebungenPreview, getSingleUebung, loadSingleUebung}