var $viewNodeList = document.getElementsByClassName('view');
var $username = document.getElementById('user-name');
var $greeting = document.getElementById('greeting')
var getMovieCounter = 0;
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
var $favoritesContainer = document.getElementById('favorites-container')

$form.addEventListener('submit', (event) => {
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

document.addEventListener('click', (event) => {
  if (event.target.nodeName === 'BUTTON' && event.target.id === 'home-button' || event.target.id === 'favorites-button' || event.target.id === 'return-home') {
    if(data.view !== 'login'){
      viewSwap(event.target.getAttribute('data-view'));
    }
    else {
      return;
    }
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

viewSwap('login');

function getMovie(name) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://www.omdbapi.com/?t=' + name + '&apikey=6bc8c31e');
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

    $addToFavorites.addEventListener('click', () => {
      $addToFavorites.className = 'hidden';
      $removeFromFavorites.className = 'subheader-text';
      data.favorites.push(xhr.response);
      if(data.favorites.length > 0){
        $empty.className = 'hidden';
      }
      displayFavorites();
    })

    $removeFromFavorites.addEventListener('click', () => {
      $addToFavorites.className = 'subheader-text';
      $removeFromFavorites.className = 'hidden';
      removeFavorites();
      if (data.favorites.length === 0) {
        $empty.className = 'subheader-text center-title';
      }
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
    $movieImg.className = 'desc-img';
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

    if (xhr.response.Genre.includes('Action')) {
      arrayAction.push(xhr.response);
      display('action');
    }
  })
}

var $empty = document.createElement('h1');
$empty.className = 'subheader-text center-title';
$empty.innerHTML = 'Your Favorites List is Empty.<br><br>Add movies from the Home Page!<br><br>';
var $emptyHome = document.createElement('button');
$emptyHome.id = 'return-home';
$emptyHome.textContent = 'Return to Home Page';
var $homeDataView = document.createAttribute('data-view')
$homeDataView.value = 'home'
$emptyHome.setAttributeNode($homeDataView);
$empty.appendChild($emptyHome);
$favoritesContainer.appendChild($empty);

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

for(var i=getMovieCounter; i<arrayOfMovies.length; i++){
  getMovie(arrayOfMovies[i]);
  getMovieCounter++
}

var previousDataJSON = localStorage.getItem('data');
if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}

window.addEventListener('beforeunload', (event) => {
  event.preventDefault();
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('movie', dataJSON);
})
