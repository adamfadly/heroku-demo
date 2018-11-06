require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let todoList = [
  {
    description: "Learn React",
    done: false
  },
  {
    description: "Learn Redux",
    done: false
  }
];

// API Info
app.get("/", (req, res) => {
  res.send(todoList);
});

// Read
app.get("/todos", (req, res) => {
  res.send(todoList);
});

// Create
app.post("/todos", (req, res) => {
  todoList.push(req.body);
  res.send(todoList);
});

//Search
app.get("/todos/search", (req, res) => {
  const result = todoList.filter((todo, index) => {
    return (
      todo.description === req.query.description ||
      todo.done === JSON.parse(req.query.done)
    );
  });
  res.send(result);
});

// Read One Data
app.get("/todos/:id", (req, res) => {
  res.send(todoList[req.params.id]);
});

// Update
app.put("/todos/:id", (req, res) => {
  todoList[req.params.id] = req.body;
  res.send(todoList);
});

// Delete One
app.delete("/todos/:id", (req, res) => {
  todoList.splice(req.params.id, 1);
  res.send(todoList);
});

// Delete All
app.delete("/todos", (req, res) => {
  todoList = [];
  res.send(todoList);
});

app.listen(PORT, () => console.log(`application running on port ${PORT}`));
