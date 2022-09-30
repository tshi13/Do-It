const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Do it project API");
});

app.listen(port, () => {
  console.log(`Express app listening at port: http://localhost:${port}/`);
});