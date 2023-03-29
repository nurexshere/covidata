

var apiUrls = [
    'https://api.covid19api.com/summary',
    'https://api.covid19api.com/dayone/country/Ethiopia/status/confirmed/live',
    'https://api.covid19api.com/country/ethiopia',
    'https://covid19api.herokuapp.com/confirmed'
];

var charts = [
    {
        url: apiUrls[0],
        chart: 'chart1',
        title: 'Global COVID-19 Cases',
        type: 'bar'
    },
    {
        url: apiUrls[1],
        chart: 'chart2',
        title: 'COVID-19 Cases in Ethiopia',
        type: 'doughnut'
    },
    {
        url: apiUrls[2],
        chart: 'chart3',
        title: 'COVID-19 Cases Timeline in Ethiopia',
        type: 'line',
        dateFormat: 'YYYY-MM-DD',
        startDate: '2020-01-01',
        endDate: '2021-12-31'
    },
    {
        url: apiUrls[3],
        chart: 'chart4',
        title: 'Global COVID-19 Cases Timeline',
        type: 'polarArea'
    },

    








];

charts.forEach(function(chart) {
    fetch(chart.url)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            var labels = [];
            var values = [];
            var backgroundColors = [];
            var borderColors = [];
            
            if (chart.url === apiUrls[0]) {
                data.Countries.forEach(function(country) {
                    labels.push(country.Country);
                    values.push(country.TotalConfirmed);
                    backgroundColors.push(getRandomColor());
                    borderColors.push(getRandomColor());
                });
            } else if (chart.url === apiUrls[1]) {
                labels.push('Confirmed', 'Recovered', 'Deaths');
                values.push(data.All.confirmed, data.All.recovered, data.All.deaths);
                backgroundColors.push('#F44336', '#4CAF50', '#607D8B');
                borderColors.push('#F44336', '#4CAF50', '#607D8B');
            } else if (chart.url === apiUrls[2]) {
                data.forEach(function(day) {
                    labels.push(day.Date.substr(0, 10));
                    values.push(day.Confirmed);
                    backgroundColors.push(getRandomColor());
                    borderColors.push(getRandomColor());
                });
            } else if (chart.url === apiUrls[3]) {
                data.forEach(function(day) {
                    labels.push(day.date);
                    values.push(day.confirmed);
                    backgroundColors.push(getRandomColor());
                    borderColors.push(getRandomColor());
                });
            }

            var chartData = {
                labels: labels,
                datasets: [{
                    label: chart.title,
                    data: values,
backgroundColor: backgroundColors,
borderColor: borderColors,
borderWidth: 1
}]
};

var ethiopiaTimelineChart = charts[2];
fetch(ethiopiaTimelineChart.url)
.then(function(response) {
return response.json();
})
.then(function(data) {
var labels = [];
var values = [];
var backgroundColors = [];
var borderColors = [];


var daysToSkip = 7;
for (var i = 0; i < data.length; i += daysToSkip) {
    var day = data[i];
    labels.push(day.Date.substr(0, 10));
    values.push(day.Confirmed);
    backgroundColors.push(getRandomColor());
    borderColors.push(getRandomColor());
}

var chartData = {
    labels: labels,
    datasets: [{
        label: ethiopiaTimelineChart.title,
        data: values,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1
    }]
};
var chartOptions = {
    responsive: true,
    maintainAspectRatio: false
};

var ctx = document.getElementById(ethiopiaTimelineChart.chart).getContext('2d');
var myChart = new Chart(ctx, {
    type: ethiopiaTimelineChart.type,
    data: chartData,
    options: chartOptions
});
})
.catch(function(error) {
console.log('Error fetching data: ', error);
});






var chartOptions = {
            responsive: true,
            maintainAspectRatio: false
        };

        var ctx = document.getElementById(chart.chart).getContext('2d');
        var myChart = new Chart(ctx, {
            type: chart.type,
            data: chartData,
            options: chartOptions
        });
    })
    .catch(function(error) {
        console.log('Error fetching data: ', error);
    });
});

function getRandomColor() {
var letters = '0123456789ABCDEF';
var color = '#';
for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
}
return color;
}
const apiKey = 'INSERT_YOUR_API_KEY_HERE';

const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const countryName = document.querySelector('#country-name');
const totalCases = document.querySelector('#total-cases');
const totalDeaths = document.querySelector('#total-deaths');
const totalRecovered = document.querySelector('#total-recovered');
const newCases = document.querySelector('#new-cases');
const newDeaths = document.querySelector('#new-deaths');
const newRecovered = document.querySelector('#new-recovered');

searchForm.addEventListener('submit', e => {
e.preventDefault();
const country = searchInput.value.trim();
if (country) {
fetch(`https://covid-api.mmediagroup.fr/v1/cases?country=${country}`)
.then(response => response.json())
.then(data => {
const countryData = data.All;
countryName.textContent = countryData.country;
totalCases.textContent = countryData.confirmed;
totalDeaths.textContent = countryData.deaths;
totalRecovered.textContent = countryData.recovered;
newCases.textContent = countryData.today_confirmed;
newDeaths.textContent = countryData.today_deaths;
newRecovered.textContent = countryData.today_recovered;
})
.catch(error => {
console.log(error);
alert('Unable to fetch data. Please try again later.');
});
}
});





