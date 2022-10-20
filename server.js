
// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const port = 4000;
const host = "127.0.0.1";

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const getAll = (req, res) => {
    res.status(200).send(projectData);
}

app.get("/all", getAll);

const postData = (req, res) => {
    console.log(req.body);
    projectData = req.body;
    console.log(projectData);
    res.status(200).send(projectData);
}

app.post("/add", postData);


const listening = () => console.log(`running a ${host}:${port}`);

app.listen(port, listening);