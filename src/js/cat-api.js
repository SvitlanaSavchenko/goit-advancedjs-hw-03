// cat-api.js

import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_rrUFXxiglyw0xkCCtldWP1dGVZqTJutOesVNuho3SUSIXUkH9eVo6sPBRNOmoLuD';

// Функція для отримання колекції порід
export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching breeds:', error);
      throw error;
    });
}

// Функція для отримання інформації про кота за породою
export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
  return axios
    .get(url)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching cat by breed:', error);
      throw error;
    });
}
