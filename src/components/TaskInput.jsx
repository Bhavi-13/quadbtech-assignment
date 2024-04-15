import React, { useState } from "react";
import { connect } from "react-redux";
import { addTodos } from "../redux/reducer";

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (obj) => dispatch(addTodos(obj)),
  };
};

const AddTask = ({ addTodo, handleClose, showModal }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (title.trim() !== "") {
      addTodo({
        id: Math.floor(Math.random() * 1000),
        title: title,
        description: description,
        assignee: assignee,
        status: "tasks",
        completed: false,
      });
      handleClose();
      // Clear form fields
      setTitle("");
      setDescription("");
      setAssignee("");
    }
  };

  return (
    <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" >
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">CREATE A TASK</h5>
          <button type="button" className="btn-close" onClick={handleClose}></button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <label htmlFor="title" className="col-sm-3 col-form-label fw-semibold">Title: </label>
              <div className="col-sm-9">
                <input type="text" name='title' className="form-control border border-secondary-subtle border-2" 
                id="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="description" className="col-sm-3 col-form-label fw-semibold">Description: </label>
              <div className="col-sm-9">
                <textarea className="form-control border border-secondary-subtle border-2" name='description' id="description" rows="2"
                value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="assignees" className="col-sm-3 col-form-label fw-semibold">Assignees: </label>
              <div className="col-sm-9">
                <input type="text" className="form-control border border-secondary-subtle border-2" id="assignees" name='assignees'
                value={assignee} onChange={(e) => setAssignee(e.target.value)}/>
              </div>
            </div>
            <div className="row d-flex justify-content-end gap-3">
              <button type="button" className="btnColor w-25 border border-0 rounded-1 text-white" onClick={handleClose}>Close</button>
              <button type="submit" className="btnColor w-25 border border-0 rounded-1 text-white" >Save</button>
            </div>
          </form>
        </div>
        
      </div>
    </div>
  </div>
    
  );
};

export default connect(null, mapDispatchToProps)(AddTask);
