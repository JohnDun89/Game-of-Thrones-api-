//---------------------------------------------------------- API pull down code.

const app = function () {


  const url = 'https://www.anapioficeandfire.com/api/houses?page=1&pageSize=50'
  const url2 = 'https://www.anapioficeandfire.com/api/houses?page=2&pageSize=50'
  const url3 = 'https://www.anapioficeandfire.com/api/houses?page=2&pageSize=50'
  const url4 = 'https://www.anapioficeandfire.com/api/houses?page=2&pageSize=50'
  const house = JSON.parse(localStorage.getItem('house'));
  // console.log(url);
  makeRequest(url, requestComplete);
  // makeRequest(url2, requestComplete);
  // makeRequest(url3, requestComplete);
  // makeRequest(url4, requestComplete);

};

const requestComplete = function () {
  if ( this.status !== 200) return;
  var jsonString = this.responseText;
  houses = JSON.parse(jsonString);
  wordCount(houses);
};


const makeRequest = function(url, callback) {
  const request = new XMLHttpRequest();
  request.open('GET', url);
  request.addEventListener('load', callback);
  request.send();
  // console.log('loaded');
};

const save = function(house){
  const jsonString = JSON.stringify(house);
  localStorage.setItem('house', jsonString);
};

//-----------------------------------------------------------API appending code.

var wordDisplay = function(houses) {
  console.log('word count ran');
  var ul = document.querySelector('#count');
  houses.forEach(function(house, index){
    const li = document.createElement('li');
    li.innerText = house.words;
    if (house.words === '') {
      return;
    }
    li.value = index;
    ul.appendChild(li);
  });
};

var wordCount = function(houses) {
  var wordCounts = {};
  var ul = document.querySelector('#count');
  houses.forEach(function(house, index){
    allHouseWords = house.words;
    if (allHouseWords === '') {
      return;
    };
    arrayOfWords = allHouseWords.split(/\s+/);
    for (var i = 0; i < arrayOfWords.length; i++) {
      word = arrayOfWords[i];
      if (!wordCounts[word]) {
        wordCounts[word] = 1;
      } else {
        wordCounts[word]++;
      };
    };
  });

  const li = document.createElement('li');
  wordString = JSON.stringify(wordCounts);
  // li.innerText = wordString;
  // ul.appendChild(li);
  console.log(wordCounts);

  var graphPopulator = function (keyValues) {
    var newArray = Object.keys(keyValues).map(function(data){
      return [data,keyValues[data]];
    });
    return newArray;
  };



//-------------------------------------------------------------------Chart Code.


Highcharts.chart('container', {
  chart: {
    type: 'column'
  },
  title: {
    text: 'Most popular words in all House Words'
  },
  subtitle: {
    text: ''
  },
  xAxis: {
    type: 'category',
    labels: {
      rotation: -45,
      style: {
        fontSize: '8px',
        fontFamily: 'Verdana, sans-serif'
      }
    }
  },
  yAxis: {
    min: 0,
    title: {
      text: 'Word Count'
    }
  },
  legend: {
    enabled: false
  },
  tooltip: {
    pointFormat: 'Word Occurs: <b>{point.y:1f} times</b>'
  },
  series: [{
    name: 'Words',
    data:graphPopulator(wordCounts)
    ,
    dataLabels: {
      enabled: false,
      rotation: -90,
      color: 'red',
      align: 'right',
      format: '{point.y:.1f}', // one decimal
      y: 10, // 10 pixels down from the top
      style: {
        fontSize: '8px',
        fontFamily: 'Verdana, sans-serif'
      }
    }
  }]
})
}

//------------------------------------------------------Document Event Listener.

document.addEventListener('DOMContentLoaded', app);
