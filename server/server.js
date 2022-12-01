const app = require("./tests/app")
const port = process.env.PORT || 5000;
const db = require("./tests/db");
db.connect(); 

app.listen(port, () => {
  console.log(`Express app listening at port: http://localhost:${port}/`);
});
