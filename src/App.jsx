import './App.css'
import React, { useState } from "react";
import Greeting from "./Greetings";
import UserInfo from "./UserInformation";
import Task from "./TaskComponents";
import Counter from "./Counters";
import TaskForm from "./TaskForm";

function App() {
  const [tasks, setTasks] = useState([
    "Complete this assignment",
    "Study Chinese",
    "Feed pets",
    "Complete midterm project",
    "Study for midterm exam"
  ]);

  const handleAlert = () => {
    alert("Button clicked!");
  };

  const deleteTask = (index) => {
    if (window.confirm("You sure you really want to delete this task, FOREVER?")) {
      setTasks(tasks.filter((_, i) => i !== index));
    }
  };

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <>
      <div>
        <Greeting username="Alice" />
        <Greeting username="Bob" />
        <Counter />
        <UserInfo handleClick={handleAlert} />
        <Task tasks={tasks} onDeleteTask={deleteTask} />
        <TaskForm onAddTask={addTask} />
      </div>
    </>
  )
}

export default App