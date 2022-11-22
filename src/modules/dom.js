const displayMovies = (data) => {
  const main = document.querySelector('.main');
  main.innerHTML = '';
  const section = document.createElement('section');
  section.classList.add('movie-container');
  data.forEach((movie) => {
    section.innerHTML += `
      <div class="movie-card">
          <img class="img-card" src="https://image.tmdb.org/t/p/original${movie.poster_path}" alt="">
          <div class="title-icon"><h2>${movie.title}</h2><i class="fa fa-heart-o"></i></div>
          <div class="btn"> <button href="/movie#${movie.id}" class="spaLink btn-1">Comments</button>       
      </div>
      `;
  });
  main.appendChild(section);
};
export default displayMovies;
