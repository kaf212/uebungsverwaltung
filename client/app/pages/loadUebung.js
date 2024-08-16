import {loadSingleUebung} from "../fetch-data.js";

const params = new URLSearchParams(window.location.search);
const itemId = params.get('id');

loadSingleUebung(itemId)





