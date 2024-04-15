import React, { useState, useEffect } from "react";
import AddTask from "./TaskInput";
import DisplayTodos from "./DisplayTodos";

const Todos = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Step 1: State for search query
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 560);
    };

    // Add event listener to detect window resize
    window.addEventListener("resize", handleResize);

    // Initial check for screen width on component mount
    handleResize();

    // Cleanup function to remove event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleAddTask = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className='container border border-4 rounded-3 shadow p-4 mb-5'>
      <div className="row mb-4">
        <div className="col-md-12">
          {/* Filter Options */}
          <div className="filterOptions d-flex justify-content-between align-items-center mb-3">
            <div className="d-lg-flex flex-lg-row d-md-flex flex-md-row gap-4 d-sm-flex flex-sm-col">
              <h6>Filter By: </h6>
              <input
                type="text"
                name="assignee"
                id="assignee"
                placeholder="Assignee Name"
                className="border border-0 rounded-2 px-lg-3 mx-sm-3"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            {/* Add New Task Button */}
            <div className="d-block d-sm-block">
              {isMobile ? (
                <button
                  onClick={handleAddTask}
                  type="button"
                  className="btnColor rounded-1 border border-0 text-white fs-3 fw-semibold"
                >
                  +
                </button>
              ) : (
                <button
                  type="button"
                  className="btnColor rounded-1 border border-0 text-white fw-semibold px-5"
                  onClick={handleAddTask}
                >
                  Add New Task
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* DisplayTodos Component */}
      <div className="row">
        <div className="col-md-12">
          <DisplayTodos searchQuery={searchQuery} />
        </div>
      </div>

      {/* Modal backdrop */}
      <div className={`${showModal ? "modal-backdrop fade show" : ""}`}></div>
      <AddTask showModal={showModal} handleClose={handleCloseModal} />
    </div>
  );
};

export default Todos;
