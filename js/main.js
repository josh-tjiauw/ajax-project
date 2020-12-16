var numMovie = 1;
var arrayOfMovies = ['Avengers: Infinity War', 'Tenet', 'Underwater', 'Terminator 2: Judgment Day'];
function getMovie(name) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://www.omdbapi.com/?t=' + name + '&apikey=6bc8c31e');
  xhr.responseType = 'json';
  xhr.send();
  xhr.addEventListener('load', function () {
    movie.title = xhr.response.Title;
    movie.year = xhr.response.Year;
    movie.ratings = xhr.response.Ratings[0];
    movie.length = xhr.response.Runtime;
    movie.genre = xhr.response.Genre;
    movie.actors = xhr.response.Actors;
    movie.description = xhr.response.Plot;
  })
}

getMovie('Avengers: Infinity War')
console.log(movie);
