const search_movie = document.getElementById('input_area');
const movie_results = document.getElementById('movie_results');
const search_btn = document.getElementById('search_btn');

async function getMovie(){
  movie_results.innerHTML = '';
  const query = search_movie.value.trim();
  if(!query){
    alert('please enter movie title')
  }
  const url = `https://www.omdbapi.com/?apikey=d55bcad0&s=${encodeURIComponent(query)}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.Response === 'True') {
      displayMovie(data.Search);
    }else {
      movie_results.innerHTML = `<p>No movies found for "${query}"</p>`;
    }
  }
  catch (error) {
    console.error("Error fetching data:", error);
    movie_results.innerHTML = `<p>Opps...an error occured.</p>`;
  }
}

function displayMovie(movies){
  movies.forEach(movie => {
    let movieDiv = document.createElement('div');
    movieDiv.classList.add('movie_item');
    movieDiv.innerHTML =
    `
    <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.jpg'}" alt="${movie.Title} Cover" class="movie-poster">
    <div class="description-box">
      <h3>${movie.Title}</h3>
      <p>${movie.Year}</p>
      <button id="movieDescription" onclick="getMovieDescription('${movie.imdbID}')">View Description</button>
    </div>
    `
    movie_results.appendChild(movieDiv)
  });
}

function getMovieDescription(imdbID) {
  let url = `https://www.omdbapi.com/?apikey=d55bcad0&i=${imdbID}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.Response === "True") {
        alert(`Description: ${data.Plot}`);
      } else {
        alert("Description not available.");
      }
    })
    .catch(error => {
      console.error("Error fetching description:", error);
    });
}