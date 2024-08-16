
const uebURL = 'http:localhost:3000/api/uebungen'; // TODO: change back to /api/...
//const uebURL = '/uebungen';


function postNewUebung(json) {
    // Quelle: https://www.freecodecamp.org/news/javascript-post-request-how-to-send-an-http-post-request-in-js/
    fetch(uebURL, {
        method: "POST",
        body: JSON.stringify(json),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
}


function putNewUebung(json) {
    fetch(uebURL, {
        method: "PUT",
        body: JSON.stringify(json),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
}

export {postNewUebung, putNewUebung}