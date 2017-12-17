//---------------------------------------------------------- API pull down code.

const app = function () {


  const url = 'https://www.anapioficeandfire.com/api/houses?page=1&pageSize=250'
  const house = JSON.parse(localStorage.getItem('house'));
  // console.log(url);
  makeRequest(url, requestComplete);
  // console.log('function running');
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
  li.innerText = wordString;
  ul.appendChild(li);
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
    text: 'Most popular words In game of thrones House words'
  },
  subtitle: {
    text: 'Source: <a href="http://en.wikipedia.org/wiki/List_of_cities_proper_by_population">Wikipedia</a>'
  },
  xAxis: {
    type: 'category',
    labels: {
      rotation: -45,
      style: {
        fontSize: '13px',
        fontFamily: 'Verdana, sans-serif'
      }
    }
  },
  yAxis: {
    min: 0,
    title: {
      text: 'Population (millions)'
    }
  },
  legend: {
    enabled: false
  },
  tooltip: {
    pointFormat: 'Population in 2008: <b>{point.y:.1f} millions</b>'
  },
  series: [{
    name: 'Words',
    data:graphPopulator(wordCounts)

      // ['Shanghai', 1],
      // ['Lagos', 2],
      // ['Istanbul', 14.2],
      // ['Karachi', 14.0],
      // ['Mumbai', 12.5],
      // ['Moscow', 12.1],
      // ['São Paulo', 11.8],
      // ['Beijing', 11.7],
      // ['Guangzhou', 11.1],
      // ['Delhi', 11.1],
      // ['Shenzhen', 10.5],
      // ['Seoul', 10.4],
      // ['Jakarta', 10.0],
      // ['Kinshasa', 9.3],
      // ['Tianjin', 9.3],
      // ['Tokyo', 9.0],
      // ['Cairo', 8.9],
      // ['Dhaka', 8.9],
      // ['Mexico City', 8.9],
      // ['Lima', 8.9]
    ,
    dataLabels: {
      enabled: true,
      rotation: -90,
      color: '#FFFFFF',
      align: 'right',
      format: '{point.y:.1f}', // one decimal
      y: 10, // 10 pixels down from the top
      style: {
        fontSize: '13px',
        fontFamily: 'Verdana, sans-serif'
      }
    }
  }]
});
};

//------------------------------------------------------Document Event Listener.

document.addEventListener('DOMContentLoaded', app);
