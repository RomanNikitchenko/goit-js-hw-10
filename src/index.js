import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');


searchBox.addEventListener('input', onSearch);

function onSearch(e) {
    if (e.currentTarget.value.length > 1) {
        fetchCountries(e.currentTarget.value)
            .then(r => {
                countryList.innerHTML = createCardsMarcup(r);
                countryInfo.innerHTML = createCards(r);
            })
            .catch(error => console.log(error));
    } else if (e.currentTarget.value.length === 1) {
        console.log("Too many matches found. Please enter a more specific name.");
        countryList.innerHTML = '';
    };
};


function fetchCountries(name) {
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
        .then(r => {
            return r.json();
        });
};


function createCardsMarcup(Items) {

    return Items.map(({ name, flags }) => {

        if (Items.length >= 1) {
            return `
                <li>
                    ${name.official}
                    <svg class="icon" width="24" height="24">
                        <use href="${flags.svg}"></use>
                    </svg>
                </li>
            `
        };
    }).join("");
};


function createCards(Items) {

    return Items.map(({ name, capital, population, flags, languages }) => {

        const keys = Object.keys(languages);

        let capitals = "";
        for (const item of capital) {
            capitals = item
        };

        console.log(name.official, capitals, population, flags.svg, languages[keys]);

        if (Items.length === 1) {
            return `
                <li>
                    ${name.official}, one item
                    <svg class="icon" width="24" height="24">
                        <use href="${flags.svg}"></use>
                    </svg>
                </li>
            `
        };
    }).join("");
};
