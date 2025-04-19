import './App.css';
import React, { useState, useEffect } from "react";
import Greeting from "./Greetings";
import UserInfo from "./UserInformation";
import Task from "./TaskComponents";
import Counter from "./Counters";
import TaskForm from "./TaskForm";
import { auth, db } from "./firebase";
import { signOut } from "firebase/auth";
import { collection, addDoc, query, where, onSnapshot, serverTimestamp, deleteDoc, doc } from "firebase/firestore";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(currentUser => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) {
      setTasks([]);
      setLoading(false);
      return;
    }
    setLoading(true);

    const q = query(
      collection(db, "tasks"),
      where("userId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTasks(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const addTask = async (taskName, taskDescription) => {
    if (!taskName || !user) return;
    await addDoc(collection(db, "tasks"), {
      userId: user.uid,
      taskName,
      taskDescription,
      createdAt: serverTimestamp(),
    });
  };

  const deleteTask = async (id) => {
    if (window.confirm("You sure you really want to delete this task, FOREVER?")) {
      await deleteDoc(doc(db, "tasks", id));
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (loading) return <div>Loading Your Tasks...</div>;

  return (
    <div>
      <h1>Welcome, {user?.email || "User"}!</h1>
      <button onClick={handleLogout}>Logout</button>
      <Greeting username="Alice" />
      <Greeting username="Bob" />
      <Counter />
      <UserInfo handleClick={() => alert("Button clicked!")} />
      <Task
        tasks={tasks}
        onDeleteTask={deleteTask}
      />
      <TaskForm onAddTask={addTask} />
    </div>
  );
}

export default App;