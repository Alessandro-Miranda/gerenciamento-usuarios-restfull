// Subir o servidor utilizando o express

const express = require("express");

// utilizando o Routes do express
// const routesIndex = require("./routes/index");
// const routesUser = require("./routes/users");

// forma utilizando o consign
const consign = require("consign");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

consign().include('routes').include('utils').into(app);

app.listen(4000, "127.0.0.1", () => {
    console.log("Server is running...");
});