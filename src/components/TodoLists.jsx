import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTodo, editTodo, markTodoCompleted, clearAlltodo } from "../redux/actions";

export const TodoLists = () => {
  const todos = useSelector((state) => state.todoReducer.todos);
  const dispatch = useDispatch();
  const [selectedTodo, setSelectedTodo] = useState([]);

  const actionClick = (data) => {
    if (data && data?.type === "edit") {
      dispatch(editTodo(data?.todo?.id));
    } else if (data && data?.type === "delete") {
      dispatch(deleteTodo(data?.todo?.id));
    }
  };

  const changeEvent = (e, todoId) => {
    if (e?.target?.name !== "select_all_todo" ) {
      if (selectedTodo.indexOf(todoId)) {
        setSelectedTodo((todo) => [...todo, todoId]);
      }
    } else if (e?.target?.name !== "select_all_todo" && e?.target?.checked === false) {
      const todos = selectedTodo.filter((todo) => todo !== todoId);
      setSelectedTodo(todos);
    }

    if (e?.target?.name === "select_all_todo" && e?.target?.checked === true) {
      todos && todos.forEach((todo, index) => {
        const allChkbox = document.getElementsByName(`todo_${index}`);

        for (let chk of allChkbox) {
          chk.checked = true;
          let todoId = todo?.id;

          setSelectedTodo((todo) => [
            ...todo,
            todoId
          ]);
        }
      });
    }

    else if (e?.target?.name === "select_all_todo" && e?.target?.checked === false) {
      todos && todos.forEach((todo, index) => {
        const allChkbox = document.getElementsByName(`todo_${index}`);
        for (let chk of allChkbox) {
          chk.checked = false;
          setSelectedTodo([]);
        }
      });
    }
  };

  const markCompleted = () => {
    dispatch(markTodoCompleted(selectedTodo));
  };

  return (
    <div className="container my-2">
      <div className="row pb-4" style={{height: "60px"}}>
        <div className="col-xl-12 text-right">
          {selectedTodo.length > 0 && (
            <>
              <button
                className="btn btn-danger"
                onClick={() => dispatch(clearAlltodo())}
              >
                Clear ALL Todos
              </button>
              <button
                className="btn btn-success"
                onClick={markCompleted}
              >
                Mark As "Not Done"
              </button>
            </>
          )}
        </div>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th width="5%">
              <input
                type={"checkbox"}
                onChange={(e) => changeEvent(e)}
                name={"select_all_todo"}
              />
            </th>
            <th width="50%">Name</th>
            <th width="10%">Status</th>
            <th width="35%">Action</th>
          </tr>
        </thead>

        <tbody>
          {todos && todos.map((todo, index) => ((todo) => (todo.id == todo ? { ...todo, isDepending : !todo.isCompleted  } : { ...todo }),
            <tr key={index}>
              <td>
                <input
                  type={"checkbox"}
                  value={todo?.id}
                  onChange={(e) => changeEvent(e, todo?.id)}
                  name={`todo_${index}`}
                />
              </td>
              <td>{todo?.title}</td>
              <td>
                {todo?.isCompleted ? (
                  <span className="badge badge-success p-2">Done</span>
                ) : todo?.isPending ? (
                  <span className="badge badge-danger p-2">Not Done</span>
                ) : (
                  ""
                )}
              </td>
              <td>
                <button
                  className="btn btn-primary ml-2"
                  onClick={() => actionClick({ todo: todo, type: "edit" })}
                >Edit/Done
                </button>
                <button
                  className="btn btn-danger ml-2"
                  onClick={() => actionClick({ todo: todo, type: "delete" })}
                >Delete
                </button>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};