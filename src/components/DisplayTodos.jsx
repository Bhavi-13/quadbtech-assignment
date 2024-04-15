import React from "react";
import { connect } from "react-redux";
import TodoItem from "./TodoItem";

const mapStateToProps = (state) => {
  return {
    todos: state,
  };
};

const DisplayTodos = (props) => {
  const { searchQuery} = props;
  const customCardColors = ["#ff8c00", "#008631"];

  return (
    <div className="container">
      <div className="row cards">
        {["tasks","completed"].map(
          (status, index) => (
            <div className="col" key={status}>
              <div
                className="card"
                
              >
                <div className="card-header text-center text-white fw-semibold" style={{ backgroundColor: customCardColors[index] }}>
                  {status[0].toUpperCase() + status.slice(1)}
                </div>
                <div className="card-body p-2">
                  {props.todos.length > 0 &&
                    props.todos.map((item) => {
                      if (
                        item.status === status &&
                        (searchQuery === "" || item.assignee.toLowerCase().includes(searchQuery.toLowerCase()))
                      
                      )
                      {
                        return <TodoItem key={item.id} item={{...item}}/>;
                      }
                      return null;
                    })}
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(DisplayTodos);
