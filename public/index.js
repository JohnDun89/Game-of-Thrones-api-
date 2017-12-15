const app = function () {
  console.log('function running');
    const url = 'https://anapioficeandfire.com/api/characters/583'
    makeRequest(url, requestComplete)
}

const requestComplete = function () {
  if ( this.status !== 200) {
    console.log(this.status);
    return;
  }
}

const makeRequest = function(url, callback) {
  const request = new XMLHttpRequest();
  request.open('GET', url);
  request.addEventListener('load', callback);
  request.send();
}


document.addEventListener('DOMContentLoaded', app);
