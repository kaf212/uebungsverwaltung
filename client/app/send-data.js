let apiUrl = undefined

try {
    apiUrl = process.env.API_URL
} catch (err) {
    apiUrl ="http://localhost:3000/api"
}


function postNewUebung(json) {
    // Quelle: https://www.freecodecamp.org/news/javascript-post-request-how-to-send-an-http-post-request-in-js/
    fetch(`${apiUrl}/uebungen`, {
        method: "POST",
        body: JSON.stringify(json),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
}


function putNewUebung(json) {
    fetch(`${apiUrl}/uebungen`, {
        method: "PUT",
        body: JSON.stringify(json),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
}

export {postNewUebung, putNewUebung}