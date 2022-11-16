import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AddTodo } from './components/AddTodo';
import { TodoLists } from './components/TodoLists';
import "./App.css"

const App = () => {
  return (
    <div className={`App ?{theme}`}>
    <div className="container p-4 mt-2">
      <div className="row">
        <h2 className="animate-charcter">Todo List</h2>
        <AddTodo />
        <TodoLists />
      </div>
    </div>
    </div>
  );
}

export default App;