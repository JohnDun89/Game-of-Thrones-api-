const app = function () {
    const url = 'https://anapioficeandfire.com/api/characters/583'
    makeRequest(url, requestComplete);
    console.log('function running');

}

const requestComplete = function () {
  if ( this.status !== 200) {
    return;
  }
}

const makeRequest = function(url, callback) {
  const request = new XMLHttpRequest();
  request.open('GET', url);
  request.addEventListener('load', callback);
  request.send();
  console.log('loaded');

}


document.addEventListener('DOMContentLoaded', app);
