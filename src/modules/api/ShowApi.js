import axios from 'axios';
// eslint-disable-next-line import/no-cycle
import { navigator } from '../router/router.js';

export default class ShowApi {
  constructor() {
    this.movieApi = process.env.MOVIEDB_API_LINK;
    this.movieApiSecret = process.env.MOVIEDB_API_SECRET;
    this.involvementApi = process.env.INVOLVEMENT_API_LINK;
    this.involvementApiId = process.env.INVOLVEMENT_ID;
    this.apiSecretCall = `?api_key=${this.movieApiSecret}&language=en-US`;
    this.noMovieMsg = 'Request failed with status code 404';
  }

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
          window.history.pushState({ path: '404' }, '404', 'error');
          navigator('/404');
          throw new Error('No such page');
        }
        throw new Error('No such page');
      }
    }
}