const forecast = require("./utils/forecast");
const gecode = require("./utils/gecode");
const path = require("path");
const express = require("express");
const hbs = require("hbs");

app = express();
// define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// setup handlbars and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);
// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Ahmed Ali",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About ",
    name: "Ahmed Ali",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help!",
    helpText: "This is some helpful text!",
    name: "Ahmed Ali",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "You must provide an adress!" });
  }
  gecode(req.query.address, (error, { longitude, latitude, location } = {}) => {
    if (error) {
      res.send({
        error: error,
      });
    } else {
      forecast(longitude, latitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term!",
    });
  }

  res.send({
    product: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Ahmed Ali",
    errorMessage: "Help article Not found!",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Ahmed Ali",
    errorMessage: "Page Not Found!",
  });
});

app.listen(3000, () => {
  console.log(`Server is up and running on port 3000`);
});
