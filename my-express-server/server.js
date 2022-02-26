const express = require('express');
const app = express();
const port = 3000;

app.get('/', function(req, res) {
    res.send('<h1>hello world!</h1>');
    console.log(req);
});

app.get('/contact', function(req,res) {
    res.send('contact: 1mackenziekyle@gmail.com');
    console.log(req);
});

app.get('/about', function(req,res){
    res.send('My name is Julian Mackenzie. I am a student at the Univsersity of British Columbia studying Engineering Physics. I love to code and listen to music in my spare time. Thanks for checking out my website!');
});

app.listen(port, function() {console.log('server started'); });