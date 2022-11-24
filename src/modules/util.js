/* eslint-disable import/no-cycle */
import logo from '../logo.png';
import bg from '../bg.jpg';
import ShowApi from './api/ShowApi.js';
import Show from './show.js';
import { navigate } from './router/router.js';

const photo = 'https://image.tmdb.org/t/p/original';

// total number of movies
const movieCounter = () => {
  const items = document.querySelectorAll('.movie-card');
  return (items.length);
};

const imgHelper = () => {
  const logoImg = document.querySelector('.logo');
  const myIcon = new Image();
  myIcon.setAttribute('href', '/');
  myIcon.classList.add('spaLink');
  myIcon.src = logo;
  myIcon.alt = 'Logo icon';
  const span = document.createElement('span');
  span.innerHTML = 'Popular(<span id="movie-counter"></span>)';
  logoImg.appendChild(myIcon);
  logoImg.appendChild(span);

  const bgImg = document.querySelector('.bg');
  const myBg = new Image();
  myBg.src = bg;
  myBg.alt = 'background image';
  bgImg.appendChild(myBg);
};

const emptySearchTester = (bool, search) => {
  if (bool) {
    const searchRes = search.childNodes[3];
    searchRes.innerHTML = `<li class="search-result">No Search Results for "${search.childNodes[1].value}"</li>`;
  } else {
    const searchRes = search.childNodes[3];
    searchRes.innerHTML = '';
  }
};

const searchAdd = (data) => {
  let str = '';
  data.forEach((searchRes) => {
    str += `<li href='/movie#${searchRes.id}' class="spaLink search-result">
    ${new Show().checkNull(searchRes.poster_path, `<img href='/movie#${searchRes.id}' src="${photo}${searchRes.poster_path}" class="search-img spaLink">`)}
    <span href='/movie#${searchRes.id}' class="sapLink">${searchRes.title}</span></li>`;
  });
  return str;
};

const search = async () => {
  const search = document.querySelector('.search');
  search.addEventListener('input', async (e) => {
    if (e.target.value.length > 1) {
      emptySearchTester(false, e.target.parentNode);
      const searchCall = new ShowApi();
      const res = await searchCall.search(e.target.value);
      if (res.length === 0) {
        emptySearchTester(true, e.target.parentNode);
      } else {
        e.target.parentNode.childNodes[3].innerHTML = searchAdd(res);
        // for the links
        const definedRoutes = Array.from(document.querySelectorAll('.spaLink'));
        definedRoutes.forEach((route) => {
          // eslint-disable-next-line no-use-before-define
          route.addEventListener('click', (event) => {
            navigate(event);
            e.target.value = '';
            e.target.parentNode.childNodes[3].innerHTML = '';
          });
        });
      }
    } else if (e.target.value.length > 0 && e.target.value.length < 2) {
      emptySearchTester(true, e.target.parentNode);
    } else if (e.target.value.length === 0) {
      emptySearchTester(false, e.target.parentNode);
    }
  });
};

export const encodeHTMLEntities = (rawStr) => rawStr.replace(/[\u00A0-\u9999<>&]/g, ((i) => `&#${i.charCodeAt(0)};`));

export { imgHelper, search, movieCounter };
