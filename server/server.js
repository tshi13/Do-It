const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const db = require("./db");
const User = require("./User");
const router = express.Router();
var bodyParser = require('body-parser');

db.connect(); 

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use(express.urlencoded());
app.use(bodyParser.json());


app.get("/", (req, res) => {
  res.send("Do it project API");
});


app.post("/createUser", (req,res) =>{ //creates new user
	const {name,id,coins,taskList} = req.body;
		const data = User.create({name,id,coins,taskList})
			.then((data) => {
			console.log(data); //prints created user object
			res.send(data);
			})
			.catch((err) => {
				res
				.status(500)
				.send({ message: "Error creating user with name: " + name })
			})
})


app.get("/tasks",(req,res) => { //gets all tasks that a user has
	const {name} = req.body;
	const data = User.find({"name":name})
		.then((data) => {
		const taskList = data[0].taskList; //assume we only have one instance of each name
		console.log(taskList); //prints retrieved list of task objects
		res.send(taskList);
		})
		.catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving tasks with name: " + name });
    });	
})



app.listen(port, () => {
  console.log(`Express app listening at port: http://localhost:${port}/`);
});