const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require("path");

app.use(cors());
app.use(express.json());

// create a todo

app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// get all todos

app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get a todo

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// update a todo

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updated = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );
    res.json("Todo was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

// delete a todo

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json("deleted you monster");
  } catch (err) {
    console.error(err.message);
  }
});

// delete literally everything

app.delete("/obliterate", async (req, res) => {
  try {
    const destroyed = await pool.query("DELETE FROM todo");
    res.json("obliterated sadge");
  } catch (err) {
    console.error(err.message);
  }
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("/client/build"));
  app.get("*", (req, res) => {
    req.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(5000, () => {
  console.log("Hi guys");
});
