import NoPage from '../404.js';
import routerInstance from './route.js';

const router = () => {
  // get main
  const main = document.getElementById('main');
  // path
  const currentPath = window.location.pathname;
  if (currentPath === '/') {
    const Page = routerInstance.routes[0].page;
    const page = new Page();
    main.innerHTML = page.html();
  } else {
    // check from routes
    const route = routerInstance.routes.filter((rou) => (rou.path === currentPath || `${rou.path}/` === currentPath))[0];
    if (route) {
      if (route.params && window.location.hash) {
        const Page = route.page;
        const page = new Page();
        main.innerHTML = page.html({ hash: Number(window.location.hash.slice(1)) });
      } else if (!route.params) {
        const Page = route.page;
        const page = new Page();
        main.innerHTML = page.html();
      } else {
        const page = new NoPage();
        main.innerHTML = page.html();
      }
    } else {
      const page = new NoPage();
      main.innerHTML = page.html();
    }
  }

  const navigate = (event) => {
    event.preventDefault();
    const route = event.target.attributes[0].value;
    const routeInfo = routerInstance.routes.filter((rou) => (rou.path === route || `${rou.path}/` === route))[0];
    if (!routeInfo) {
      window.history.pushState({}, '', 'error');
      const page = new NoPage();
      main.innerHTML = page.html();
    } else {
      window.history.pushState({}, '', routeInfo.path);
      const Page = routeInfo.page;
      const page = new Page();
      main.innerHTML = page.html();
    }
  };

  // for the links
  const definedRoutes = Array.from(document.querySelectorAll('[spaLink]'));
  definedRoutes.forEach((route) => {
    route.addEventListener('click', navigate, false);
  });
};

export default router;