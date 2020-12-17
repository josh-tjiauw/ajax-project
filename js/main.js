var $viewNodeList = document.getElementsByClassName('view');
var $username = document.getElementById('user-name');
var $greeting = document.getElementById('greeting')
var numMovie = 0;
var arrayOfMovies = ['Avengers: Infinity War', 'Tenet', 'Underwater', 'Terminator 2: Judgment Day'];
var arrayAction = [];
var $form = document.querySelector('form');
var $action = document.getElementById('action-genre');
var $container = document.querySelector('.container');

$form.addEventListener('submit', function (event) {
  event.preventDefault();
  data.username = $username.value;
  $form.reset();
  viewSwap('home');
  data.dataview = 'home';
  $greeting.textContent = "Hello " + data.username + "!";
})

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

document.addEventListener('click', function (event) {
  if (event.target.nodeName === 'BUTTON') {
    viewSwap(event.target.getAttribute('data-view'));
  }
  else if (event.target.nodeName === 'IMG' && data.view === 'home') {
    viewSwap(event.target.getAttribute('data-view'));
  }
  else {
    return;
  }
})
console.log($container);
function getMovie(name) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://www.omdbapi.com/?t=' + name + '&apikey=6bc8c31e');
  xhr.responseType = 'json';
  xhr.send();
  xhr.addEventListener('load', function () {
    var $movieContainer = document.getElementById(xhr.response.imdbID);
    var $movieImg = document.createElement('img');
    var $movieImgContainer = document.createElement('div');
    var $movieTitle = document.createElement('h1');
    var $movieRatings = document.createElement('h2');
    $movieTitle.innerHTML = xhr.response.Title;
    $movieRatings.innerHTML = 'Ratings: ' + xhr.response.Ratings[0].Value;
    $movieImgContainer.className = 'movie-poster';
    $movieImg.src = xhr.response.Poster;
    $movieImgContainer.appendChild($movieImg);
    $movieContainer.appendChild($movieImgContainer);
    $movieContainer.appendChild($movieTitle);
    $movieContainer.appendChild($movieRatings);

    data.movie.title = xhr.response.Title;
    data.movie.year = xhr.response.Year;
    data.movie.ratings = xhr.response.Ratings[0];
    data.movie.length = xhr.response.Runtime;
    data.movie.genre = xhr.response.Genre;
    data.movie.actors = xhr.response.Actors;
    data.movie.description = xhr.response.Plot;
    if (xhr.response.Genre.includes('Action')){
      arrayAction.push(xhr.response);
      display('action');
    }
  })
}

function display(genre) {
  if (genre === 'action') {
    for (var i = numMovie; i < arrayAction.length; i++) {
      var $colfourth = document.createElement('div')
      $colfourth.className = 'col-fourth';

      var $colfourthimg = document.createElement('img');
      $colfourthimg.src = arrayAction[i].Poster;
      $colfourthimg.alt = arrayAction[i].Title + ' Poster';
      var $dataview = document.createAttribute('data-view');
      $dataview.value = arrayAction[i].imdbID;
      $colfourthimg.setAttributeNode($dataview);
      $colfourth.appendChild($colfourthimg);
      $action.appendChild($colfourth);
      console.log($container)
    }
    numMovie++;
  }
}

getMovie(arrayOfMovies[0]);
getMovie(arrayOfMovies[1]);
getMovie(arrayOfMovies[2]);
getMovie(arrayOfMovies[3]);

var previousDataJSON = localStorage.getItem('data');
if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}

window.addEventListener('beforeunload', function (event) {
  event.preventDefault();
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('movie', dataJSON);
})
