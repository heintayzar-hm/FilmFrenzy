import axios from 'axios';
// eslint-disable-next-line import/no-cycle, import/no-unresolved
import { navigator } from '../router/router.js';
// eslint-disable-next-line import/no-cycle
import Comments from './Comment.js';

export default class ShowApi extends Comments {
  constructor() {
    super();
    this.movieApi = process.env.MOVIEDB_API_LINK;
    this.searchApi = process.env.MOVIEDB_API_SEARCHLINK || 'https://api.themoviedb.org/3/search/movie';
    this.movieApiSecret = process.env.MOVIEDB_API_SECRET;
    this.apiSecretCall = `?api_key=${this.movieApiSecret}&language=en-US`;
    this.searchApiCall = `?api_key=${this.movieApiSecret}&query=`;
    this.noMovieMsg = 'Request failed with status code 404';
  }

  /**
   * call to movie db for getting people
   * @param {id} id
   * @returns api data
   */
  people = async (id) => {
    try {
      return await axios.get(`${this.movieApi}/${id}/credits${this.apiSecretCall}`).then((res) => (res.data));
    } catch (error) {
      if (error.message === this.noMovieMsg) {
        window.history.pushState({ path: '404' }, '404', 'error');
        navigator('/404');
        throw new Error('No such page');
      }
      throw new Error('No such page');
    }
  }

  /**
   * call to movie db for getting recommended movie
   * @param {id} id
   * @returns api data
   */
  recommendations = async (id) => {
    try {
      return await axios.get(`${this.movieApi}/${id}/recommendations${this.apiSecretCall}`).then((res) => (res.data));
    } catch (error) {
      throw new Error('No such page');
    }
  }

  /**
   * call to movie db for getting the movie by id
   * @param {id} id
   * @returns api data
   */
  show = async (id) => {
    try {
      // eslint-disable-next-line consistent-return
      return await axios.get(`${this.movieApi}/${id}${this.apiSecretCall}`).then((res) => {
        if (res.status === 200) {
          return (res.data);
        }
      });
    } catch (error) {
      if (error.message === this.noMovieMsg) {
        throw new Error('No such page');
      }
      throw new Error('No such page');
    }
  }

  /**
   * call to movie db for getting the search movie by id
   * @param {id} id
   * @returns api data
   */
  search = async (input) => {
    try {
      // eslint-disable-next-line consistent-return
      return await axios.get(`${this.searchApi}${this.searchApiCall}${input}`).then((res) => {
        if (res.status === 200) {
          return (res.data.results.length > 6) ? res.data.results.slice(0, 5) : res.data.results;
        }
      });
    } catch (error) {
      if (error.message === this.noMovieMsg) {
        throw new Error('No such page');
      }
      throw new Error('No such page');
    }
  }
}