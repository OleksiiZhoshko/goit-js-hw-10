import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchBox.addEventListener('input', debounce(inputValue, DEBOUNCE_DELAY));

function inputValue(evt) {
  const inputText = evt.target.value.trim();
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
  if (!inputText) {
    return;
  }
    fetchCountries(inputText)
      console.log(inputText)
    .then(country => {
      if (country.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }
      renderCountryList(country);
    })
    .catch(err => Notify.failure('Oops, there is no country with that name'));
}

function renderCountryList(arr) {
  if (arr.length === 1) {
    return (countryInfo.innerHTML = arr
      .map(country => {
        return `<img class="country-svg" src="${country.flags.svg}" alt="${country.name}" width="50px">
                <h2>${country.name.official}</h2>
                <p class="country-text">Capital:${country.capital}</p>
                <p class="country-text">Population:${country.population}</p>
                <p class="country-text">Languages:${country.languages}</p>`;
      })
      .join(''));
  }
  countryList.innerHTML = arr
    .map(country => {
      return `<li class="country-item">
            <img class="country-svg" src="${country.flags.svg}" alt="${country.name}" width="50px">
            <h2>${country.name.official}</h2>
            </li>`;
    })
    .join('');
}