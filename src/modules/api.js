import axios from 'axios';
import displayMovies from './dom.js';

const key = process.env.MOVIEDB_API_SECRET;
const baseUrl = process.env.MOVIEDB_API_LINK;
const url = `${baseUrl}/popular?api_key=${key}&language=en-US&page=1`;

const getData = async () => {
  const response = await axios.get(`${url}`);
  displayMovies(response.data.results);
};
export default getData;