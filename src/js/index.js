// index.js
import SlimSelect from 'slim-select';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

// Отримання посилань на DOM-елементи
const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const errorDisplay = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');
const catImage = document.querySelector('.cat-image');
const breedName = document.querySelector('.breed-name');
const description = document.querySelector('.description');
const temperament = document.querySelector('.temperament');

// Відображення завантажувача при початковому завантаженні
loader.style.display = 'block';

// Отримання колекції порід та заповнення вибірки порід
fetchBreeds()
  .then(breeds => {
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
    // Активація вибірки порід після завершення завантаження
    breedSelect.removeAttribute('disabled');
    loader.style.display = 'none'; // Приховання завантажувача
  })
  .catch(error => {
    loader.style.display = 'none'; // Приховання завантажувача
    errorDisplay.style.display = 'block'; // Відображення повідомлення про помилку
    console.error('Error fetching breeds:', error);
  });

// Обробник події зміни вибору породи
breedSelect.addEventListener('change', event => {
  const selectedBreedId = event.target.value;
  if (selectedBreedId) {
    loader.style.display = 'block'; // Відображення завантажувача
    // Отримання інформації про кота за обраною породою
    fetchCatByBreed(selectedBreedId)
      .then(catData => {
        const cat = catData[0];
        // Відображення інформації про кота
        catImage.src = cat.url;
        breedName.textContent = cat.breeds[0].name;
        description.textContent = cat.breeds[0].description;
        temperament.textContent = cat.breeds[0].temperament;
        catInfo.style.display = 'block'; // Відображення блоку інформації про кота
        loader.style.display = 'none'; // Приховання завантажувача
      })
      .catch(error => {
        loader.style.display = 'none'; // Приховання завантажувача
        errorDisplay.style.display = 'block'; // Відображення повідомлення про помилку
        console.error('Error fetching cat by breed:', error);
      });
  }
});
