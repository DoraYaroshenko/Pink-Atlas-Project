import { declareEvents, doApi, searchCountry } from "./countriesList.js";

const init = () => {
    doApi("Israel");
    searchCountry();
    declareEvents();
}

init();