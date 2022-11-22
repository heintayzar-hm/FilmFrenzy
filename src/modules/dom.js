const displayMovies = (data) => {
  const main = document.querySelector('.main');
  const section = document.createElement('section');
  section.classList.add('movie-container');
  data.forEach((movie) => {
    section.innerHTML += `
      <div class="movie-card">
          <img class="img-card" src="https://image.tmdb.org/t/p/original${movie.poster_path}" alt="">
          <div class="title-icon"><h2>${movie.title}</h2><i class="fa fa-heart-o"></i></div>
          <div class="btn"> <button class="btn-1"><a href="/movie#3432" spaLink></a>Comments</button>       
      </div>
      `;
  });
  main.appendChild(section);
};
export default displayMovies;
