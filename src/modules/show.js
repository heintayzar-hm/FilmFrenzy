// eslint-disable-next-line import/no-cycle
import ShowApi from './api/ShowApi.js';

export default class Show extends ShowApi {
  constructor() {
    super();
    this.color = ['blue', 'green', 'red', 'aqua', 'lightblue'];
    this.photo = 'https://image.tmdb.org/t/p/original';
  }

  toText = (num) => {
    let string = num;
    for (let i = 3; i < num.toString().length; i += 4) {
      string = `${string.toString().slice(0, i)},${string.toString().slice(i)}`;
    }
    return string;
  }

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

  toGenre = (genres) => Array.from(genres, (e) => `<span class="genre" style="background-color:${this.color[Math.floor(Math.random() * this.color.length)]}">${e.name}</span>`).join('');

  toPeople = (p) => {
    let string = '';
    for (let i = 0; i < 5 && i < p.length; i += 1) {
      string += `<div class="cast-card"><div class="cast-photo"><img src="${this.photo}${p[i].profile_path}" alt="photo"></div><span>${p[i].name}</span></div>`;
    }
    return string;
  }

  toRecommendations = (data) => {
    let string = '';
    for (let i = 0; i < 5 && i < data.length; i += 1) {
      string += `<div class="cast-card"><div><img href="/movie#${data[i].id}" onclick="navigate(e)" src="${this.photo}${data[i].poster_path}" class="cast-photo spaLink" alt="photo"></div><span>${data[i].title}</span></div>`;
    }
    return string;
  }

  html = async ({ hash }) => {
    const res = await this.show(Number(hash)).then((data) => data);
    const {
      id, genres, title, overview, budget,
    } = res;
    const posterPath = res.poster_path;
    const rating = res.vote_average;
    const releaseDate = res.release_date;
    const language = res.original_language;
    const people = await this.people(id).then((data) => data);
    const recommendations = await this.recommendations(id).then((data) => data);
    return (`
      <section class="main-section">
      <div id="show">
          <div class="popup-header">
              <h2>${title}</h2>
              <i class="fa-solid fa-xmark"></i>
          </div>
          <div class="details">
          <div class="movie-img">
              <img src="${this.photo}${posterPath}" class="show-img" alt="movie">
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
          <h2>Recommendations</h2>
          <div class="recommendations">
          ${this.toRecommendations(recommendations.results)}
          </div>
      </div>
     
  </section>`
    );
  }
}