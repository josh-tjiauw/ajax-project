var $viewNodeList = document.querySelectorAll('.view');
var $username = document.getElementById('user-name');
var $greeting = document.getElementById('greeting')
var numMovie = 0;
var arrayOfMovies = ['Avengers: Infinity War', 'Tenet', 'Underwater', 'Terminator 2: Judgment Day'];
var arrayAction = [];
var $form = document.querySelector('form');

$form.addEventListener('submit', function (event) {
  event.preventDefault();
  data.username = $username.value;
  $form.reset();
  viewSwap('home');
  data.dataview = 'home';
  $greeting.textContent = "Hello " + data.username + "!";
  console.log("value of data:", data);
})

async function help(){
  await data.username;
  console.log(data.username);
}
help()

var $dataViewNodeList = [];
for (i = 0; i < $viewNodeList.length; i++) {
  var dvnode = $viewNodeList[i].getAttribute('data-view');
  $dataViewNodeList.push(dvnode);
}

function viewSwap(dataview) {
  for (i = 0; i < $viewNodeList.length; i++) {
    if (dataview !== $dataViewNodeList[i]) {
      $viewNodeList[i].className = 'view hidden';
    }
    else {
      $viewNodeList[i].className = 'view';
      data.view = $dataViewNodeList[i];
    }
  }
}

function getMovie(name) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://www.omdbapi.com/?t=' + name + '&apikey=6bc8c31e');
  xhr.responseType = 'json';
  xhr.send();
  xhr.addEventListener('load', function () {
    data.movie.title = xhr.response.Title;
    data.movie.year = xhr.response.Year;
    data.movie.ratings = xhr.response.Ratings[0];
    data.movie.length = xhr.response.Runtime;
    data.movie.genre = xhr.response.Genre;
    data.movie.actors = xhr.response.Actors;
    data.movie.description = xhr.response.Plot;
    if (xhr.response.Genre.includes('Action')){
      arrayAction.push(xhr.response);
    }
  })
}

for(var i=0; i<arrayOfMovies.length; i++){
  getMovie(arrayOfMovies[i]);
  numMovie++;
}

var previousDataJSON = localStorage.getItem('data');
if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}

window.addEventListener('beforeunload', function (event) {
  event.preventDefault();
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('movie', dataJSON);
})
