var numMovie = 0;
var arrayOfMovies = ['Avengers: Infinity War', 'Tenet', 'Underwater', 'Terminator 2: Judgment Day'];
var arrayAction = [];
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
    if (xhr.response.Genre.includes('Action')){
      arrayAction.push(xhr.response);
    }
  })
}

for(var i=0; i<arrayOfMovies.length; i++){
  getMovie(arrayOfMovies[i]);
  numMovie++;
}
console.log(arrayAction);
console.log(numMovie);

var previousDataJSON = localStorage.getItem('movie');
if (previousDataJSON !== null) {
  movie = JSON.parse(previousDataJSON);
}

window.addEventListener('beforeunload', function (event) {
  event.preventDefault();
  var movieJSON = JSON.stringify(movie);
  localStorage.setItem('movie', movieJSON);
})
