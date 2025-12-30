import { useState, useEffect } from 'react'


function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/tasks")
      .then(res => res.json())
      .then(data => setTasks(data));
  }, []);


function addTask() {
    if(task.trim() === "") return;

    fetch("http://localhost:5000/tasks", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({text: task})
  })
    .then(res => res.json())
    .then(newTask => {
      setTasks([...tasks,newTask]);
      setTask("");
    });
}

function deleteTask(id) {
  fetch(`http://localhost:5000/tasks/${id}`, {
    method: "DELETE"
  }).then(() => {
    setTasks(tasks.filter(t => t.id !== id));
  });
}

return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-md">
        <h1>React + Flask To-Do List</h1>

        <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter a Task"
        />

        <button onClick={addTask}>Add</button>

        <ul>
          {tasks.map(t => (
            <li key={t.id}>
              {t.text}
              <button onClick={() => deleteTask(t.id)}>❌</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }     

export default App
