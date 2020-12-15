function getMovie(name) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://www.omdbapi.com/?t=' + name + '&apikey=6bc8c31e');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    console.log(xhr.status);
    console.log(xhr.response);
  })
  xhr.send();

}

getMovie('Avengers: Infinity War');
