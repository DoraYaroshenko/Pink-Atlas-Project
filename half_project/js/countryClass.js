export default class CountryClass {
    constructor(_parent, _item, _func) {
        this.parent = _parent;
        this.name = _item.name.common;
        this.flag = _item.flags.png;
        this.capital = _item.capital;
        this.pop = _item.population.toLocaleString();
        this.region = _item.region;
        this.lang = _item.languages;
        this.currency = _item.currencies;
        this.borders = _item.borders;
        this.func = _func;
    }
    render() {
        let div = document.createElement("div");
        div.className = "p-2 col-12 mt-3 text-center text-md-start";
        document.querySelector(this.parent).appendChild(div);

        div.innerHTML = `
        <h2 class="text-center display-4">${this.name}</h2>
                <img src="${this.flag}" class="img-fluid float-md-end mb-3 mb-md-0">
                <div>Population: ${this.pop}</div>
                <div>Region: ${this.region}</div>
                <div>Languages: ${Object.values(this.lang)}</div>
                <div>Currency: ${Object.keys(this.currency)}, ${Object.values(Object.entries(this.currency)[0][1])[0]}</div>
                <div>Capital: ${this.capital ? this.capital : "none"}</div>
                <div id="id_p">States with borders: </div>
        `
        this.func(this.borders);
    }
    
}