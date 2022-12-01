const mongoose = require("mongoose");

const URI = `mongodb+srv://DOIT:DOIT@maindatabase.eymn8mi.mongodb.net/?retryWrites=true&w=majority`; //put our URI here


async function connect() { //connect to MongoDB
  try {
    await mongoose.connect(URI);
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.log(err);
  }
}

async function disconnect() {
  try{
    await mongoose.disconnect();
    console.log("MongoDB disconnected")
  } catch (err) {
    console.log(err)
  }
}

module.exports = { connect, disconnect };


