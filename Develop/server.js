const express = require('express'); //Allows us to use the Express NPM package

const PORT = process.env.PORT || 3001; // This line of code sets the PORT variable to either process.env.PORT, which is telling the app to use that port (environment variable set by Heroku) if it is set up, and if not, default to port 80. If ran locally, it will use port 3001
const app = express(); //(starts) the Express.js server

const apiRoutes = require('./routes/apiRoutes'); //Tells the server to look for the index.js file in this directory. This will tell the application what routes to use
const htmlRoutes = require('./routes/htmlRoutes'); //Tells the server to look for the index.js file in this directory. This will tell the application what routes to use



// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
app.use(express.static('public')); // Express middlware that uses the express.static() method. We provide a file path to the location in our application and instruct the server to make these files static resources. 
                                   
app.use('/api', apiRoutes);
app.use('/', htmlRoutes); //This is our way of telling the server that any time a client navigates to <ourhost>/api, the app will use the router we set up in apiRoutes. 
//If / is the endpoint, then the router will serve back our HTML routes. 

app.listen(PORT, () => { //The listen() method tells the server to listen on either the port being used by Heroku (if deployed to Heroku) or to Port 3001 if ran locally
    console.log(`API server now on port ${PORT}!`); //The server sends the message "API server now on port ..." either port 3001 if local, or whatever Port is being utilized by Heroku, to the console log (Tells us the server is on and listening for requests)
})