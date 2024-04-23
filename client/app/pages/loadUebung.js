import {loadSingleUebung} from "../../api/fetch-data.js";

const params = new URLSearchParams(window.location.search);
const itemId = params.get('id');

loadSingleUebung(itemId)





