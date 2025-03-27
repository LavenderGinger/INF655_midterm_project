import React, { useState } from "react";

function TaskForm({ onAddTask }) {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (taskName.trim() === "" || taskDescription.trim() === "") {
      setError("Task name and description are needed.");
      return;
    }

    onAddTask({ name: taskName, description: taskDescription });
    setTaskName("");
    setTaskDescription("");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter Task Name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Description"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
      />
      <button type="submit">Add Task</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default TaskForm;