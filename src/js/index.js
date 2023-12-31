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

// Приховання селекту та відображення завантажувача при початковому завантаженні
breedSelect.style.display = 'none';
loader.style.display = 'block';

// Ініціалізація SlimSelect для стилізації селекту
new SlimSelect('.breed-select');

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
    // Приховання завантажувача та відображення селекту
    loader.style.display = 'none';
    breedSelect.style.display = 'inline-block';
  })
  .catch(error => {
    // Приховання завантажувача та відображення повідомлення про помилку
    loader.style.display = 'none';
    errorDisplay.style.display = 'block';
    console.error('Error fetching breeds:', error);
  });

// Обробник події зміни вибору породи
breedSelect.addEventListener('change', event => {
  const selectedBreedId = event.target.value;
  if (selectedBreedId) {
    loader.style.display = 'block'; // Відображення завантажувача
    catInfo.style.display = 'none'; // Приховання блоку інформації про кота

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
        // Відображення повідомлення про помилку за допомогою iziToast
        iziToast.error({
          title: 'Error',
          message: 'Failed to fetch cat data. Please try again.',
          position: 'topRight',
        });
        console.error('Error fetching cat by breed:', error);
      });
  }
});
