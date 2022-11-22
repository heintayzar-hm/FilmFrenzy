export default class Show {
    html = () => {
     // const {title} = data;
      return (`
      <section class="main-section">
      <div id="show">
          <div class="popup-header">
              <h2>Title</h2>
              <i class="fa-solid fa-xmark"></i>
          </div>
          <div class="movie-img">
              <img src="test.jpg" alt="movie">
          </div>
          <div class="movie-details">
              <p>Description</p>
              <div class="small-details">
                  <span>Rating:</span>
                  <span>Status:</span>
                  <span>Released Date:</span>
                  <span>Language:</span>
              </div>

          </div>
      </div>
     
  </section>`
      );
    }
}