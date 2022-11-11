const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const router = express.Router();
const path = require('path');
var cors = require('cors');

app.use(cors());


app.get('/'), (req, res) => {
	res.send('Hello World!');
}

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use(express.urlencoded({limit: '50mb', extended: true}));

app.use(express.static(path.resolve(__dirname, 'frontend/build')));


	app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + '/frontend/build/index.html'))
  })

  app.get('/register', (req, res) => {
	res.sendFile(path.join(__dirname + '/frontend/build/index.html'))
	})

	app.get('/NotFound', (req, res) => {
		res.sendFile(path.join(__dirname + '/frontend/build/index.html'))
	})

	app.get('/invite/*', (req, res) => {
		res.sendFile(path.join(__dirname + '/frontend/build/index.html'))
	})

	app.get('/profile', (req, res) => {
		res.sendFile(path.join(__dirname + '/frontend/build/index.html'))
	})

	app.get('/searchGroup', (req, res) => {
		res.sendFile(path.join(__dirname + '/frontend/build/index.html'))
	})

	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname + '/frontend/build/index.html'))
	})
		

app.listen(port, () => {
  console.log(`Express app listening at port: http://localhost:${port}/`);
});