import CountryClass from "./countryClass.js";

export const doApi = async (req) => {
    try {
        document.querySelector("#id_map").src = "";
        document.querySelector("#id_parent").innerHTML = `<h2 class="display-2 mt-5 pt-5">Loading <i class="fa fa-spinner" aria-hidden="true"></i></h2>`;
        let url = `https://restcountries.com/v3.1/name/${req}/?fullText=true`;
        let resp = await fetch(url);
        let data = await resp.json();
        createCountry(data[0]);
    }
    catch (err) {
        document.querySelector("#id_parent").innerHTML = `<h1 class="pt-3 text-center">This country does not exist, please try again</h1>`;
    }
}

const createCountry = (data) => {
    let country = new CountryClass("#id_parent", data, searchBorder);
    document.querySelector("#id_parent").innerHTML = "";
    country.render();
    document.querySelector("#id_map").src = `https://maps.google.com/maps?q=${data.latlng[0]},${data.latlng[1]}&z=5&ie=UTF8&iwloc=&output=embed`;
}

export const searchCountry = () => {
    let searchReq = document.querySelector("#id_input");
    let search_btn = document.querySelector("#btn_search");
    search_btn.addEventListener("click", () => {
        doApi(searchReq.value);
    })
    searchReq.addEventListener("keydown", (e) => {
        if (e.key == "Enter") {
            doApi(searchReq.value);
        }
    })
}

export const declareEvents = () => {
    let countries_list = document.querySelectorAll(".country");
    countries_list.forEach(item => {
        item.addEventListener("click", () => {
            doApi(item.innerHTML);
        })
    })
}

const searchBorder = (_borders) =>{
    if (_borders) {
        _borders.forEach(async (item) => {
            try {
                let url = `https://restcountries.com/v3.1/alpha/${item}`;
                let resp = await fetch(url);
                let data = await resp.json();
                let country_name = data[0].name.common;
                let border_btn = document.createElement("button");
                document.querySelector("#id_p").append(border_btn);
                border_btn.innerHTML = country_name;
                border_btn.className = "border-0 bg-transparent myBtn text-decoration-underline";
                border_btn.addEventListener("click", () => {
                    doApi(country_name);
                })
            }
            catch (err) {
                console.log(err);
            }
        })
    }
    else {
        document.querySelector("#id_p").innerHTML += "none";
    }
}