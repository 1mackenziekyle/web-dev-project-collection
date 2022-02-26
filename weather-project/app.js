// modules
const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
// app
const app = express();


// fetch weather data natively, using node -> https

app.use(bodyParser.urlencoded({
    extended: true
}));
// root
app.get('/', (req, res) => { // 1. app GET request
    res.sendFile(__dirname + '/index.html');
});

app.post("/", (req, res) => {
    const query =  req.body.cityName;
    const apiKey = '5ed4bc8ff5a197b2d46570b1d7d82455';
    const units = 'metric';
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + query + '&units=' + units + '&APPID=' + apiKey;

    https.get(url, function (response) { // 2. GET request
        console.log('status code: ' + response.statusCode);
        response.on('data', (d) => { // 3. receive data from the GET request
            const weatherData = JSON.parse(d); // 4. parse
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const image = weatherData.weather[0].icon;
            res.write('<p>The weather in ' + req.body.cityName + ' is currently ' + desc + '</p>');
            res.write('<h1>The temperature is ' + temp + '</h1>');
            res.write('<img src=" http://openweathermap.org/img/wn/' + image + '@2x.png">');
            res.send(); // Send data to website
        });
    });

})

// listen
app.listen(3000, (req, res) => {
    console.log('running on port 3000.');
});