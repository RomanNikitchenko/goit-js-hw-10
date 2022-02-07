import './css/styles.css';

const DEBOUNCE_DELAY = 300;

// fetch(`https://restcountries.com/v3.1/name/germany?fields=name,capital,population,flags,languages`)
//     .then(r => r.json())
//     .then(r => {
//         console.log(r[0]);
//         const { flags, name, capital, languages, population } = r[0];
//         console.log(flags, name, capital, languages, population);
//     });

fetch('https://restcountries.com/v3.1/all?fields=name,capital,population,flags,languages')
    .then(r => r.json())
    .then(console.log);
