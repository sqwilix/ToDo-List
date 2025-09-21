import { useEffect, useState } from 'react'

function App() {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('tasks')
      return saved ? JSON.parse(saved) : []
    }catch(error) {
      console.error('error in the localStorage', error);
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  function addTasks() {
    if(task.trim() === '') return
    const newTask = [...tasks, {text: task, completed: false, editing: false}]
    setTasks(newTask)
    setTask('')
  }

  function toggleTask(index) {
    const newTask = tasks.map((t, i) => 
      i === index ? {...t, completed: !t.completed} : t
    )
    setTasks(newTask)
  }

  function removeTask(index) {
    const confirm = window.confirm('Are you sure you want to delete this task?')
    if(!confirm) return

    const newTask = tasks.filter((_, i) => i !== index)
    setTasks(newTask)
  }

  function deleteAllTask() {
    const confirm = window.confirm('Are you sure you want to delete all tasks?')
    if(!confirm) return

    setTasks([])
    localStorage.removeItem('tasks')
    setTask('')
  }

  function editTasks(index) {
    // const newText = prompt('Edit your task:', tasks[index].text)
    // if(newText !== null && newText.trim() !== '') {
    //   const newTask = tasks.map((t, i) => 
    //     i === index ? {...t, text: newText} : t
    //   )
    //   setTasks(newTask)
    // }

    const newText = prompt('Edit your task', tasks[index].text)
    if(newText !== null && newText.trim() !== '') {
      const newTask = tasks.map((t, i) => 
        i === index ? {...t, text: newText} : t
      )
      setTasks(newTask)
    }
  }

  return(
    <div className="todo_container">
      <h1 style={{textAlign: 'center', marginBottom: '10px'}}>ToDo List</h1>
      <div className="input_container">
        <input type="text" className='todo_input' 
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => {
            if(e.key === 'Enter') {
              addTasks()
            }
          }}
          placeholder='write a task...'
        />
        <button className='add_btn' onClick={addTasks}>ADD TASK</button>
      </div>

      <ul className='tasks_list'>
        {tasks.map((t, i) => (
          <li className='task' key={i}>
            <div className="checkbox_container">
              <input type="checkbox" className='check_box' 
                checked={t.completed}
                onChange={() => toggleTask(i)}
              />
              <span style={{textDecoration: t.completed ? 'line-through' : 'none',
            opacity: t.completed ? '0.6' : '1'}}>
            {/* text */} {t.text}
          </span>
            </div>
              <div className="btn_container">
                <button className="edit_btn" onClick={() => editTasks(i)}>✏️</button>
                <button className='delete_btn' onClick={() => removeTask(i)}>×</button>
              </div>
          </li>
        ))}
      </ul>
      <button className='remove_all_btn' onClick={deleteAllTask}>DELETE ALL</button>

      <span style={{textAlign: 'center', marginTop: '15%', fontWeight: 'bold', fontSize: '18px'}}>
        Completed: {tasks.filter(t => t.completed).length} / {tasks.length}
      </span>
    </div>
  )
  
}

export default App
