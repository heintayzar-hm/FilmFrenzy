// eslint-disable-next-line import/no-cycle
import { imgHelper, search, movieCounter } from './util.js';

import { getData } from './api/api.js';

// eslint-disable-next-line import/no-cycle
import { links } from './router/router.js';

export default class Main {
    html = async () => {
      const images = document.querySelectorAll('.image');
      images.forEach((image) => { image.innerHTML = ''; });
      imgHelper();
      search();
      await getData().then(async () => {
        links();
        const totalMovies = document.querySelector('#movie-counter');
        totalMovies.innerHTML = movieCounter();
      });
    };

    js = async () => {
    }
}