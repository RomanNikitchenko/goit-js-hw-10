import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchCountries from './countries-service';
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

    console.log(e.target.value === '');
     
    if (e.target.value.length === 1) {
        Notify.info("Too many matches found. Please enter a more specific name.");
        clearLines();
    } else if (e.target.value.length > 1) {
        fetchCountries(e.target.value)
            .then(r => {
                createCardsCountrieslist(r);
                countryInformationCard(r);
            })
            .catch(() => {
                Notify.failure("Oops, there is no country with that name");
                clearLines();
            });
    } else if (e.target.value.length === 0) {
        clearLines();
    };
};

function createCardsCountrieslist(Items) {
    if (Items.length <= 10) {
        const listCountries = Items.map(({ name, flags }) => {
            return `
                <li class="country-list__item">
                    ${name.official}
                    <img class="country-list__img" src="${flags.svg}" alt="Сountry flag ${name.official}" width="24">
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

            const valuesLanguages = Object.values(languages).join(", ");
        
            const capitalsLine = capital.join(", ");

            return `
                <ul class="list">
                    <li class="list__item">Capital: ${capitalsLine}.</li>
                    <li class="list__item">Population: ${population}</li>
                    <li class="list__item">Languages: ${valuesLanguages}.</li>
                </ul>
            `
        };
    }).join("");

    if (Items.length === 1) {
        searchBox.value = '';
    }

    countryInfo.innerHTML = countryInformation;
};
