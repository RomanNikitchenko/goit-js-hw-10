import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');


searchBox.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function clearLines() {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
}

function onSearch(e) {
    e.preventDefault();

    if (e.target.value.length > 1) {
        fetchCountries(e.target.value)
            .then(r => {
                createCardsCountrieslist(r);
                countryInformationCard(r);
            })
            .catch(() => {
                Notify.failure("Oops, there is no country with that name");
                clearLines();
            });
    } else if (e.target.value.length === 1) {
        Notify.info("Too many matches found. Please enter a more specific name.");
        clearLines();
    } else if (e.target.value.length === 0) {
        clearLines();
    };
};


function fetchCountries(name) {
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
        .then(r => {
            return r.json();
        });
};


function createCardsCountrieslist(Items) {
    if (Items.length <= 10) {
        const listCountries = Items.map(({ name, flags }) => {
            return `
                <li>
                    ${name.official}
                    <svg class="icon" width="24" height="24">
                        <use href="${flags.svg}"></use>
                    </svg>
                </li>
            `
      
        }).join("");

        countryList.innerHTML = listCountries;
    } else if (Items.length > 10) {
        clearLines();
        Notify.info("Too many matches found. Please enter a more specific name.");
    }
};


function countryInformationCard(Items) {
    const countryInformation = Items.map(({ capital, population, languages }) => {
        if (Items.length === 1) {

            const values = Object.values(languages);
        
            const listLanguages = []
            for (const value of values) {
                listLanguages.push(value);
            }
            const languagesLine = listLanguages.join(" ");

            const capitals = [];
            for (const item of capital) {
                capitals.push(item)
            };
            const capitalsLine = capitals.join(" ");

            return `
                <ul class="list">
                    <li class="list__item">Capital: ${capitalsLine}</li>
                    <li class="list__item">Population: ${population}</li>
                    <li class="list__item">Languages: ${languagesLine}</li>
                </ul>
            `
        };
    }).join("");

    countryInfo.innerHTML = countryInformation;
};
