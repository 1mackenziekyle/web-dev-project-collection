
/**
* Project: Email newsletter signup
* Purpose: Make a fully-functional web app with success and failure pages.
* To make git commits: git push heroku master
* URL: https://glacial-ridge-93256.herokuapp.com/
**/

/* Requirements */
const express = require('express');
const https = require('https');
const request = require('request');
const bodyParser = require('body-parser');

/* Set up App with express.js and body-parser.js */
const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

/* listen on 3000 */
app.listen(process.env.PORT || 3000, () => {
    console.log('running.');
});


/* CHANGE HERE */


/* Send signup.html to root directory */
app.get('/', (req,res) => {
    res.sendFile(__dirname + '/signup.html');
});


/* Handle the post from the root directory */
app.post('/', (req,res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    // create the new member
    var data = {
        email_address: email,
        status: "subscribed",
        merge_fields: {
            FNAME: firstName,
            LNAME: lastName,
        }
    }

    var jsonData = JSON.stringify(data);

    // Parameters to request the Mailchimp API List
    const listURL = 'https://us6.api.mailchimp.com/3.0/lists/7f1e87a4fd/members';
    const options = {
        method: "POST",
        auth: "kyle1:ceae4f09f14d0dd16ed25745c23f4e2c-us6",
    }

    // Request and save the response
    const requestList = https.request(listURL, options, (response) => {
        
        // Send success or failure page
        if (response.statusCode == 200) {
            res.sendFile(__dirname + "/success.html");
        } else { res.sendFile(__dirname + '/failure.html'); }
    });

    // Write the newMember object to the list
    requestList.write(jsonData);
    requestList.end();
    
    app.post('/failure', (req,res) => {
        res.redirect('/');
    });

    app.post('/success', (req,res) => {
        res.redirect('/');
    });

});

// LIST ID
// 7f1e87a4fd