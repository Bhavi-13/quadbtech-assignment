import React, { useState } from "react";
import { connect } from "react-redux";
import DeleteTask from "./DeleteTask";
import { removeTodos, updateTodos } from "../redux/reducer"; // Import the removeTodos and updateTodos actions

const TodoItem = (props) => {
  const { item, removeTodo, updateTodo } = props;
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleDelete = () => {
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = () => {
    removeTodo(item.id);
    setShowDeleteConfirmation(false);
  };

  const markAsCompleted = () => {
    const updatedTask = { ...item, status: "completed" };
    updateTodo(updatedTask);
  };

  return (
    <li key={item.id} className="list-group-item mb-3 pb-2 border-bottom">
      <div className="d-flex justify-content-between align-items-center gap-5">
        <div>
          <h6>{item.title}</h6>
          <p className="mb-0">{item.description}</p>
          <span className="fw-semibold">@{item.assignee}</span>
        </div>
        <div className="d-flex">
          {item.status !== "completed" && (
            <button
              title="Mark as Completed"
              className="text-success border-0 fs-5"
              onClick={markAsCompleted}
            >
              <i className="bi bi-check-circle-fill"></i>
            </button>
          )}
          {item.status !== "completed" && (
            <button
              title="Delete Task"
              className="text-danger border-0 fs-5"
              onClick={handleDelete}
            >
              <i className="bi bi-trash"></i>
            </button>
          )}
        </div>
      </div>

      {showDeleteConfirmation && (
        <DeleteTask
          item={item}
          message="Do You Wish to Delete Task"
          onConfirm={confirmDelete}
          onCancel={() => setShowDeleteConfirmation(false)}
        />
      )}
    </li>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeTodo: (id) => dispatch(removeTodos(id)), // Dispatch the removeTodos action with the task id
    updateTodo: (task) => dispatch(updateTodos(task)), // Dispatch the updateTodos action with the updated task object
  };
};

export default connect(null, mapDispatchToProps)(TodoItem);
