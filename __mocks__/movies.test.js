/**
 * @jest-environment jsdom
 */

import { getData } from '../src/modules/api/api.js';
// eslint-disable-next-line no-unused-vars
import Show from '../src/modules/show.js';
import { movieCounter } from '../src/modules/util.js';

document.body.innerHTML = `<main class="main"><section> <div class="movie-card">
<img class="img-card" src="https://image.tmdb.org/t/p/original" alt="image poster">
<div class="title-icon"><h2></h2><i id="" class="fa fa-heart-o pointer like"></i></div>
<div class="likes"></div>
<div class="btn"> <button href="/movie#" class="spaLink btn-1">Comments</button>       
</div></section></main>`;
describe('When we count the total number of movies', () => {
  test('Should output 20', async () => {
    await getData().then(() => {
      const numberOfMovies = movieCounter();
      expect(numberOfMovies).toBe(20);
    });
  });
});
