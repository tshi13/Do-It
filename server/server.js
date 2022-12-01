const app = require("./app")
const port = process.env.PORT || 5000;
const db = require("./db");
db.connect(); 

app.listen(port, () => {
  console.log(`Express app listening at port: http://localhost:${port}/`);
});
