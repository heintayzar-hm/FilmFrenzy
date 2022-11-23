// eslint-disable-next-line import/no-cycle, import/no-unresolved
import ShowApi from './api/ShowApi.js';

export default class Show extends ShowApi {
  constructor() {
    super();
    this.color = ['blue', 'green', 'red', 'aqua', 'lightblue'];
    this.photo = 'https://image.tmdb.org/t/p/original';
    this.itemNotFound = "item_id' not found.";
  }

  /**
     * change to smaller string for the given length text
     * @param num
     * @returns string
     */
  toText = (num) => {
    let string = num;
    for (let i = 3; i < num.toString().length; i += 4) {
      string = `${string.toString().slice(0, i)},${string.toString().slice(i)}`;
    }
    return string;
  }

  /**
     * get in string format for innerHtml adding: get show more show less button
     * @param string
     * @returns string
     */
  showMore = (str) => {
    let string = str;
    if (str.length > 100) {
      window.more = (e) => {
        e.target.parentNode.innerHTML = `${str}<span onclick="less(event)" class="show-more">...    Show Less</span>`;
      };

      window.less = (e) => {
        e.target.parentNode.innerHTML = `${str.slice(0, 100)}<span class="show-more" onclick="more(event)">...    Show More</span>`;
      };
      string = `${str.slice(0, 100)}<span class="show-more" onclick="more(event)">...    Show More</span>`;
    }
    return string;
  }

  /**
     * get in string format for innerHtml adding: adding genre
     * @param Array
     * @returns string
     */
  toGenre = (genres) => {
    if (genres.length > 0) {
      return Array.from(genres, (e) => `<span class="genre" style="background-color:${this.color[Math.floor(Math.random() * this.color.length)]}">${e.name}</span>`).join('');
    }
    return 'N/A';
  }

  /**
     * get in string format for innerHtml adding: adding people
     * @param Array
     * @returns string
     */
  toPeople = (p) => {
    let string = '';
    for (let i = 0; i < 5 && i < p.length; i += 1) {
      string += `<div class="cast-card"><div class="cast-photo">${this.checkNull(p[i].profile_path, `<img src="${this.photo}${p[i].profile_path}" alt="photo">`)}</div><span>${p[i].name}</span></div>`;
    }
    return string;
  }

  /**
     * get in string format for innerHtml adding: adding recommendations cards
     * @param Array
     * @returns string
     */
  toRecommendations = (data) => {
    let string = '';
    for (let i = 0; i < 5 && i < data.length; i += 1) {
      string += `<div class="cast-card"><div>${this.checkNull(data[i].poster_path, `<img href="/movie#${data[i].id}" src="${this.photo}${data[i].poster_path}" class="cast-photo spaLink" alt="photo">`)}</div><span>${(data[i].title.length > 20) ? `${data[i].title.slice(0, 20)}...` : data[i].title}</span></div>`;
    }
    return string;
  }

  /**
     * check null or not if null return 'N/A' otherwise text
     * @param (data: noyNullStr, text: Str)
     * @returns string
     */
  checkNull = (data, text) => {
    if (!data) {
      return 'N/A';
    }
    return text;
  }

  /**
     * change to the data objects
     * @param str
     * @returns string
     */
  toDate = (str) => {
    const date = new Date(str);
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  }

  /**
     * get in string format for innerHtml adding: adding comments
     * @param (obj: comments)
     * @returns string
     */
  toComments = (data) => {
    let string = '';
    data.forEach((comment) => {
      string += `<div class="comment">
        <span>${this.toDate(comment.creation_date)}</span>
        <span>${comment.username}</span>
        <span>${comment.comment}</span>
        </div>`;
    });
    return string;
  }

  /**
     * get the comments length that is in dom
     * @param
     * @returns comments length
     */
  commentsLength = () => {
    const commentsLength = document.querySelector('#comments-length');
    const comments = document.querySelectorAll('.comment');
    commentsLength.innerHTML = comments.length;
    return comments.length;
  }
  /**
     * to run the javascript code after the
     * @param Array
     * @returns string
     */

  js = () => {
    const form = document.querySelector('.form');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const commentsEl = document.querySelector('.comments');
      this.addComment(e.target.id, e.target[0].value, e.target[1].value).then(async (res) => {
        if (res === true) {
          const comments = await this.getComments(e.target.id);
          commentsEl.innerHTML = this.toComments(comments.data);
          this.commentsLength();
          e.target.reset();
        }
      });
    });
    this.commentsLength();
  }

  html = async ({ hash }) => {
    const res = await this.show(Number(hash)).then((data) => data);
    const {
      id, genres, title, overview, budget,
    } = res;
    const posterPath = res.poster_path;
    const rating = res.vote_average;
    const releaseDate = this.toDate(res.release_date);
    const language = res.original_language;
    const people = await this.people(id).then((data) => data);
    const recommendations = await this.recommendations(id).then((data) => data);
    const comments = await this.getComments(id);
    return (`
      <section class="main-section">
      <div id="show">
          <div class="popup-header">
              <h2>${title}</h2>
              
              <i href="/" class="spaLink fa-solid fa-xmark"></i>
              
          </div>
          <div class="details">
          <div class="movie-img">
              ${this.checkNull(posterPath, `<img src="${this.photo}${posterPath}" class="show-img" alt="movie">`)}
          </div>
          <div class="movie-details">
              <p>${this.showMore(overview)}</p>
              <div class="small-details">
                  <span>Rating:${(rating.toFixed(1))}</span>
                  <span>Budget: $${this.toText(budget)}</span>
                  <span>Released Date:${releaseDate}</span>
                  <span>Language:${
                    language
                  }</span>
              </div>
                <div class="genres"><span>Genre:</span>${this.toGenre(genres)}</div>
          </div>
          
          </div>
          <h3>Featured Casts</h3>
          <div class="people">
          ${this.toPeople(people.cast)}
          </div>
          <h3>Recommendations</h3>
          <div class="recommendations">
          ${this.toRecommendations(recommendations.results)}
          </div>

          <h3 class="comments-header">Comments(<span id="comments-length"></span>)</h3>
          <div class="comments">
           ${(comments === false) ? 'No comments yet' : this.toComments(comments.data)}
          </div>

          <h3 class="comment-header">Add a comment</h3>
          <form id="${id}" class="form comment-form">
          <input class="input-box input-name" placeholder="Your Name" required>
          <textarea class="input-box" rows="10" placeholder="Your Insight" required></textarea>
          <button class="input-btn" type='submit'>Submit</button>
          </form>
      </div>
     
  </section>`
    );
  }
}