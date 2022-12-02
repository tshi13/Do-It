const express = require("express");
const app = express();

var bodyParser = require('body-parser');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb'}));

app.get("/", (req, res) => {
  res.send("Do it project API");
});


app.use('/users', require('../UserRoutes'))
app.use('/tasks', require('../TaskRoutes'))
app.use('/group', require('../GroupRoutes'))


module.exports = app;
