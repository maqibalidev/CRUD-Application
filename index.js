const express = require("express");
const conn = require("./config");
const app = express();
const bodyParser = require("body-parser");
const router= require("./router");
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));


// Establish the database connection when the application starts

app.use("/",router);

app.listen(8080, () => {
    console.log("Server is running on port 8080");
});
