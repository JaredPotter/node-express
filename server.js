// From the npm registry
// https://www.npmjs.com/package/express
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json()); // Allows us to read json

// Mock Database - State
const fruits = ["banana"];

// API ENDPOINTS

app.get("/api/fruits", function (req, res) {
  res.send(fruits);
});

app.get("/api/fruits/:id", function (req, res) {
  const fruitId = req.params.id;

  const fruit = fruits.find((f) => {
    return f === fruitId;
  });

  if (fruit) {
    const payload = {
      name: fruit,
    };
    res.send(payload);
  } else {
    res.send("Fruit Not Found");
  }
});

app.post("/api/fruits", function (req, res) {
  const fruit = req.body;

  if (fruit && fruit.name) {
    fruits.push(fruit.name);
    res.send();
  } else {
    res.send("Bad Request.");
  }
});

app.delete("/api/fruits/:id", function (req, res) {
  const fruitId = req.params.id;

  const index = fruits.indexOf(fruitId);

  if (index !== -1) {
    fruits.splice(index, 1);
    res.send();
  } else {
    res.send("NOT FOUND!");
  }
});

app.put("/api/fruits/:id", function (req, res) {
  const fruitId = req.params.id;

  const index = fruits.indexOf(fruitId);

  if (index !== -1) {
    const fruit = req.body;

    if (fruit && fruit.name) {
      fruits.splice(index, 1, fruit.name);
      res.send();
    } else {
      res.send("BAD REQUEST");
    }
  } else {
    res.send("NOT FOUND!");
  }
});

// Start your server
app.listen(3000, () => {
  console.log("Server Started");
});
