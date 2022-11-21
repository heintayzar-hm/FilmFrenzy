import Main from '../main.js';
import Show from '../show.js';

// router instance
const Router = (name, routes) => ({
  name,
  routes,
});

// create router instance
const routerInstance = new Router('routerInstance', [{
  path: '/',
  name: 'Root',
  params: false,
  page: Main,
}, {
  path: '/movie',
  params: true,
  name: 'Movie',
  page: Show,
}]);

export default routerInstance;