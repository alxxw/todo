import "./App.css";
import React, { Fragment } from "react";

// components

import InputTodo from "./components/InputTodo";
import ListTodos from "./components/ListTodos";
import DeleteAll from "./components/DeleteAll";

function App() {
  return (
    <Fragment>
      <div className="container">
        <DeleteAll />
        <InputTodo />
        <ListTodos />
      </div>
    </Fragment>
  );
}

export default App;
