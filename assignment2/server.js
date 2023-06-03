/*********************************************************************************
 *  WEB322 – Assignment 02
 *  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part *  of this assignment has been copied manually or electronically from any other source
 *  (including 3rd party web sites) or distributed to other students.
 *
 *  Name: Sumin Han Student ID: 127143220 Date: Jun 2, 2023
 *
 *  Online (Cyclic) Link: https://relieved-trunks-deer.cyclic.app/about
 *
 ********************************************************************************/

var path = require("path");
var express = require("express");
var app = express();
var storeService = require("./store-service");

var HTTP_PORT = process.env.Port || 8080;

// call this function after the http server starts listening for request.
function onhttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

storeService
  .initialize()
  .then(() => {
    app.listen(HTTP_PORT, onhttpStart);
  })
  .catch((error) => {
    console.error("Error initializing stroe service:", error);
  });

app.use(express.static("public"));

// setup a 'route' to listen on the default url path (http://localhost)
app.get("/", function (req, res) {
  res.redirect("/about");
});

// setup another route to listen on /about
app.get("/about", function (req, res) {
  res.sendFile(__dirname + "/views/about.html");
});

app.get("/shop", (req, res) => {
  storeService
    .getPublishedItems()
    .then((items) => {
      res.json(items);
    })
    .catch((error) => {
      res.json({ message: error });
    });
});

app.get("/items", (req, res) => {
  storeService
    .getAllItems()
    .then((items) => {
      res.json(items);
    })
    .catch((error) => {
      res.json({ message: error });
    });
});

app.get("/categories", (req, res) => {
  storeService
    .getCategories()
    .then((categories) => {
      res.json(categories);
    })
    .catch((error) => {
      res.json({ message: error });
    });
});

app.get("*", (req, res) => {
  res.status(404).send("Page Not Found");
});
