const mongoose = require("mongoose");

const URI = ``; //put our URI here

async function connect() { //connect to MongoDB
  try {
    await mongoose.connect(URI);
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.log(err);
  }
}

module.exports = { connect };


