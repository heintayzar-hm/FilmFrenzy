/* eslint-disable import/no-cycle */
import NoPage from '../404.js';
// eslint-disable-next-line import/no-cycle
import routerInstance from './route.js';
import { imgHelper, movieCounter, search } from '../util.js';
// eslint-disable-next-line import/no-cycle
import Main from '../main.js';

const links = () => {
  // for the links
  const definedRoutes = Array.from(document.querySelectorAll('.spaLink'));
  definedRoutes.forEach((route) => {
    // eslint-disable-next-line no-use-before-define
    route.addEventListener('click', navigate);
  });
};
/**
 * scroll to top
 */

const scrollToTop = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};
/**
 * loading show
 * @params (loading: true,false)
 */
const loading = (bool) => {
  if (bool === true) {
    const main = document.querySelector('.main');
    main.innerHTML = '<div class="loading-pages"><h5 data-text="I am Loading..." class="loading-text">I am Loading...</h5></div>';
  }
};
/*
set to el.innerHtml
*/
const newPage = async (Page, el, obj = {}) => {
  // initial image should be null
  loading(true);
  const images = document.querySelectorAll('.image');
  images.forEach((image) => { image.innerHTML = ''; });
  imgHelper();
  const page = new Page();
  el.innerHTML = await page.html(obj);
  await page.js();
  const totalMovies = document.querySelector('#movie-counter');
  totalMovies.innerHTML = movieCounter();
  loading(false);
  links();
  scrollToTop();
};

/*
set to mainPage
*/
const mainPage = async () => {
  // initial image should be null
  loading(true);
  const images = document.querySelectorAll('.image');
  images.forEach((image) => { image.innerHTML = ''; });
  const page = new Main();
  await page.html();
  links();
  loading(false);
};

// for 404 pages
// eslint-disable-next-line no-unused-vars
const noPage = (el) => {
  const page = new NoPage();
  el.innerHTML = page.html();
};

// for main navigation
// eslint-disable-next-line no-unused-vars
const navigator = (path) => {
  // eslint-disable-next-line no-use-before-define
  router();
};

/**
 * navigate according to button
 */
const navigate = async (event) => {
  event.preventDefault();
  let route = event.target.attributes[0].value;
  let hash;
  if (route.includes('#')) {
    const arr = route.split('#');
    [route, hash] = arr;
  }
  const routeInfo = routerInstance.routes.filter((rou) => (rou.path === route || `${rou.path}/` === route))[0];
  if (!routeInfo) {
    window.history.pushState({ path: '/' }, 'home', '/');
    navigator('/');
  } else if (routeInfo.params && hash) {
    window.history.pushState({ path: routeInfo.path }, document.title, `${routeInfo.path}#${hash}`);
    navigator(`${routeInfo.path}#${hash}`);
  } else if (!routeInfo.params) {
    window.history.pushState({ path: routeInfo.path }, document.title, routeInfo.path);
    navigator(routeInfo.path);
  } else {
    window.history.pushState({ path: '/' }, 'home', '/');
    navigator('/');
  }
};
/**
 * For double loading
 */
window.navigate = navigate;

const router = async () => {
  // get main
  const main = document.querySelector('.main');
  await search();
  main.innerHTML = '';
  // path
  const currentPath = window.location.pathname;
  if (currentPath === '/') {
    // newPage(routerInstance.routes[0].page, main);
    mainPage();
  } else {
    // check from routes
    const route = routerInstance.routes.filter((rou) => (rou.path === currentPath || `${rou.path}/` === currentPath))[0];
    if (route) {
      if (route.params && window.location.hash) {
        newPage(route.page, main, { hash: Number(window.location.hash.slice(1)) });
      } else if (!route.params) {
        newPage(route.page, main, {});
      } else {
        window.history.replaceState({}, '', '/');
        mainPage();
      }
    } else {
      window.history.replaceState({}, '', '/');
      mainPage();
    }
  }
};

/**
 * For popstate
 */

window.addEventListener('popstate', (e) => {
  if (e.state && e.state.path) {
    navigator(e.state.path);
  }
});

// for initial state
const getPath = () => window.location.pathname + window.location.search + window.location.hash;
const path = getPath();
window.history.replaceState({ path }, document.title, document.location.href);
export {
  router, navigator, navigate, links,
};