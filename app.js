const express = require("express");
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require("body-parser");

const app = express();

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());

const index = require('./routes/api/index');
const week = require('./routes/api/reports');
const register = require('./routes/api/register');
const login = require('./routes/api/login');

app.use('/', index)
app.use('/reports', week)
app.use('/register', register)
app.use('/login', login)

const port = 1337;

app.listen(port, () => console.log(`Example API listening on port ${port}!`));

