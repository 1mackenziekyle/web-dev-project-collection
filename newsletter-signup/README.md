Project: Email newsletter signup
Author: Kyle Mackenzie
Purpose: Make a fully-functional web app with success and failure pages.
To make git commits: git push heroku main
URL: https://glacial-ridge-93256.herokuapp.com/

git repository: https://git.heroku.com/hidden-ridge-64115.git   

remove file from stage:
git reset HEAD [fileName]

How it works:
1. Set up app
2. Send signup.html to the root '/' directory

POST:
3. Handle the post from the root directory from signup.html
    a. Save variables for the first name, last name, and email
    b. Write user data to a JS object that mailchimp will recognize
    
HTTPS REQUEST:
4. Save HTTPS request for the audience list using the API key and list ID to a constant
5. On the HTTPS request callback, check the statusCode to send either the success or failure page.
6. Write the JS object to the list HTTPS request.