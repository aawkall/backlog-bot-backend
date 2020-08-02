const express = require('express');
const bodyParser = require('body-parser');

// Create app via Express
const app = express();

// Parse requests with content-type: application/json
app.use(bodyParser.json());

// Add in routes for Book controller
require('./app/routes/book.routes.js')(app);

// Set port, and start listening for requests
app.listen(3000, () => {
    console.log('backlog-bot-backend is running on port 3000.');
});
