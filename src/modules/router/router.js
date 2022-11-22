import NoPage from '../404.js';
import routerInstance from './route.js';

/*
set to el.innerHtml
*/
const newPage = (Page, el, obj = {}) => {
  const page = new Page();
  el.innerHTML = page.html(obj);
};

// for 404 pages
const noPage = (el) => {
  const page = new NoPage();
  el.innerHTML = page.html();
};

// for main navigation
const navigator = (path) => {
  // get main
  const main = document.getElementById('main');
  let route = path;
  let hash;
  if (route.includes('#')) {
    const arr = route.split('#');
    [route, hash] = arr;
  }
  const routeInfo = routerInstance.routes.filter((rou) => (rou.path === route || `${rou.path}/` === route))[0];
  if (!routeInfo || path === '404') {
    noPage(main);
    // eslint-disable-next-line no-use-before-define
    router();
  } else if (routeInfo.params && hash) {
    newPage(routeInfo.page, main, { hash: Number(window.location.hash) });
    // eslint-disable-next-line no-use-before-define
    router();
  } else if (!routeInfo.params) {
    newPage(routeInfo.page, main, {});
    // eslint-disable-next-line no-use-before-define
    router();
  } else {
    noPage(main);
    // eslint-disable-next-line no-use-before-define
    router();
  }
};

/**
 * navigate according to button
 */
const navigate = (event) => {
  event.preventDefault();
  let route = event.target.attributes[0].value;
  let hash;
  if (route.includes('#')) {
    const arr = route.split('#');
    [route, hash] = arr;
  }
  const routeInfo = routerInstance.routes.filter((rou) => (rou.path === route || `${rou.path}/` === route))[0];
  if (!routeInfo) {
    window.history.pushState({ path: '404' }, '404', 'error');
    navigator('/404');
  } else if (routeInfo.params && hash) {
    window.history.pushState({ path: routeInfo.path }, document.title, `${routeInfo.path}#${hash}`);
    navigator(`${routeInfo.path}#${hash}`);
  } else if (!routeInfo.params) {
    window.history.pushState({ path: routeInfo.path }, document.title, routeInfo.path);
    navigator(routeInfo.path);
  } else {
    window.history.pushState({ path: '404' }, '404', 'error');
    navigator('/404');
  }
};

const router = () => {
  // get main
  const main = document.getElementById('main');
  // path
  const currentPath = window.location.pathname;
  if (currentPath === '/') {
    newPage(routerInstance.routes[0].page, main);
  } else {
    // check from routes
    const route = routerInstance.routes.filter((rou) => (rou.path === currentPath || `${rou.path}/` === currentPath))[0];
    if (route) {
      if (route.params && window.location.hash) {
        newPage(route.page, main, { hash: Number(window.location.hash.slice(1)) });
      } else if (!route.params) {
        newPage(route.page, main, {});
      } else {
        noPage(main);
      }
    } else {
      noPage(main);
    }
  }

  // for the links
  const definedRoutes = Array.from(document.querySelectorAll('[spaLink]'));
  definedRoutes.forEach((route) => {
    route.addEventListener('click', navigate, false);
  });
};

/**
 * For popstate
 */

window.addEventListener('popstate', (e) => {
  if (e.state && e.state.path) {
    navigator(e.state.path);
  }
});

// for intial state
const getPath = () => window.location.pathname + window.location.search + window.location.hash;
const path = getPath();
window.history.replaceState({ path }, document.title, document.location.href);
export default router;