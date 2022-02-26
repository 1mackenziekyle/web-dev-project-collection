const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;


app.use(bodyParser.urlencoded({extended: true}));

app.get ('/', (req,res) => {
    res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post('/', (req,res) => {
    var height = Number(req.body.height) / 100;
    var weight = Number(req.body.weight);

    var bmi = weight / (height * height);

    res.send('<h1>Your BMI is ' + bmi + '.</h1>')
    

})

app.listen(port, () => {
console.log('launched at port 3000'); } );