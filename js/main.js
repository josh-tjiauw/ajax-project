var $viewNodeList = document.getElementsByClassName('view');
var $username = document.getElementById('user-name');
var $greeting = document.getElementById('greeting')
var numMovie = 0;
var numFavs = 0;
var arrayOfMovies = ['Avengers: Infinity War', 'Tenet', 'Underwater', 'Terminator 2: Judgment Day'];
var arrayAction = [];
var $form = document.querySelector('form');
var $action = document.getElementById('action-genre');
var $container = document.querySelector('.container');
var $homeNav = document.getElementById('home-button');
var $favoritesNav = document.getElementById('favorites-button')
var $favoritesPage = document.getElementById('favorites')

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
  if (event.target.nodeName === 'BUTTON' && event.target.id === 'home-button' || event.target.id === 'favorites-button') {
    viewSwap(event.target.getAttribute('data-view'));
  }
  else if (event.target.nodeName === 'IMG' && data.view === 'home') {
    viewSwap(event.target.getAttribute('data-view'));
  }
  else if (event.target.nodeName === 'IMG' && data.view === 'favorites') {
    viewSwap(event.target.getAttribute('data-view'));
  }
  else {
    return;
  }
})

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
    var $movieLength = document.createElement('h2');
    var $movieDescription = document.createElement('p');
    var $favButtonContainer = document.createElement('div');
    var $addToFavorites = document.createElement('button');
    var $removeFromFavorites = document.createElement('button')

    $addToFavorites.addEventListener('click', function(){
      $addToFavorites.className = 'hidden';
      $removeFromFavorites.className = 'subheader-text';
      data.favorites.push(xhr.response);
      displayFavorites();
    })

    $removeFromFavorites.addEventListener('click', function(){
      $addToFavorites.className = 'subheader-text';
      $removeFromFavorites.className = 'hidden';
      removeFavorites();
    })

    $movieDescription.className = 'subheader-text';
    $movieDescription.innerHTML = xhr.response.Plot;
    $movieLength.className = 'subheader-text';
    $movieLength.innerHTML = xhr.response.Runtime;
    $movieTitle.className = 'header-text';
    $movieTitle.innerHTML = xhr.response.Title;
    $movieRatings.className = 'subheader-text';
    $movieRatings.innerHTML = 'Ratings: ' + xhr.response.Ratings[0].Value;
    $movieImgContainer.className = 'movie-poster';
    $movieImg.src = xhr.response.Poster;
    $favButtonContainer.className = 'favButtonContainer'
    $addToFavorites.className = 'subheader-text';
    $addToFavorites.id = 'add-to-favorites-button';
    $addToFavorites.textContent = 'Add to Favorites';
    $removeFromFavorites.className = 'subheader-text hidden';
    $removeFromFavorites.id = 'remove-from-favorites-button';
    $removeFromFavorites.textContent = 'Remove From Favorites';
    $movieImgContainer.appendChild($movieImg);
    $movieContainer.appendChild($movieImgContainer);
    $movieContainer.appendChild($movieTitle);
    $movieContainer.appendChild($movieRatings);
    $movieContainer.appendChild($movieLength);
    $movieContainer.appendChild($movieDescription);
    $favButtonContainer.appendChild($addToFavorites);
    $favButtonContainer.append($removeFromFavorites);
    $movieContainer.appendChild($favButtonContainer);

    data.movie.title = xhr.response.Title;
    data.movie.year = xhr.response.Year;
    data.movie.ratings = xhr.response.Ratings[0];
    data.movie.length = xhr.response.Runtime;
    data.movie.genre = xhr.response.Genre;
    data.movie.actors = xhr.response.Actors;
    data.movie.description = xhr.response.Plot;
    if (xhr.response.Genre.includes('Action')) {
      arrayAction.push(xhr.response);
      display('action');
    }
  })
}

function returnFavoritesIndex() {
  for(var i = 0; i < data.favorites.length; i++){
    if(data.view === data.favorites[i].imdbID){
      return i;
    }
  }
  return i;
}

function removeFavorites() {
  var index = returnFavoritesIndex();
  var $colfourtharray = document.querySelectorAll('.col-fourth');
  for (var i = 0; i < $colfourtharray.length; i++) {
    if ($colfourtharray[i].id === data.view){
      $colfourtharray[i].remove()
    }
  }
  data.favorites.splice(index, 1);
  numFavs--;
}

function displayFavorites() {
  for(var i = numFavs; i<data.favorites.length; i++){
    var $colfourth = document.createElement('div')
    $colfourth.className = 'col-fourth';
    $colfourth.id = data.favorites[i].imdbID;
    var $colfourthimg = document.createElement('img');
    $colfourthimg.src = data.favorites[i].Poster;
    $colfourthimg.alt = data.favorites[i].Title + ' Poster';
    var $dataview = document.createAttribute('data-view');
    $dataview.value = data.favorites[i].imdbID;
    $colfourthimg.setAttributeNode($dataview);
    $colfourth.appendChild($colfourthimg);
    $favoritesPage.appendChild($colfourth);
  }
  numFavs++;
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
