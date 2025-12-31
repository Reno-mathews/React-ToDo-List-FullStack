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
        <h1 className="text-2xl font-bold mb-4 text-center">
          React + Flask To-Do List
        </h1>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter a Task"
            className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

        <button 
          onClick={addTask}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"  
          >
            Add
            </button>
          </div>
        <ul className="space-y-2">
          {tasks.map(t => (
            <li key={t.id}>
              {t.text}
              <button onClick={() => deleteTask(t.id)}>❌</button>
            </li>
          ))}
        </ul>
      </div>
      </div>
    );
  }     

export default App
