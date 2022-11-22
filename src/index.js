import './style.css';
import getData from './modules/api.js';
import imgHelper from './modules/util.js';

window.addEventListener('DOMContentLoaded', () => {
  imgHelper();
  getData();
});
