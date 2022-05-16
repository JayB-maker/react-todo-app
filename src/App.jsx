import React, { useState, useEffect } from 'react';
import "./style/style.css";

const App = () => {

  const [ todoList, setTodoList ] = useState([])
  const [ todos, setTodos] = useState('')
  const [ editText, setEditText ] = useState("")
  const [ editId, setEditId ] = useState(null)

  useEffect(() => {
    const listFromLocalStorage = JSON.parse(localStorage.getItem("letter"));

    if(listFromLocalStorage){
      setTodoList(listFromLocalStorage)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("letter", JSON.stringify(todoList))
  }, [todoList])

  const handleSubmit = (e) =>{
    e.preventDefault();

    if(!todos || /^\s*$/.test(todos)){
      return
    }

    const addTodo = {
      id: new Date().getTime(),
      input: todos
    }

    const allTodos = [...todoList, addTodo]

    setTodoList(allTodos)
    setTodos('')
    console.log(allTodos)
  }
  
  const handleChange = (e) => {
    setTodos(e.target.value)
  }

  const deleteTodo = (id) => {
    let remainingTodo = [...todoList].filter((todo) => todo.id !== id)

    setTodoList(remainingTodo)
  }

  const updateTodo = (id) => {
    if(!editText || /^\s*$/.test(editText)){
      return;
    }

    else {
      const updatedTodo = [...todoList].map((todo) => {
        if(todo.id === id){
          todo.input = editText
        }
        return todo
      })
  
      setTodoList(updatedTodo)
      setEditId(null)
      setEditText('')
    }
  }

  return (
    <>
      <div className="container">
        <h1>What do you have todo?</h1>
        <form>
          <input type="text" placeholder='Type a Todo' value={todos} onChange={handleChange}/>
          <button type="submit" onClick={handleSubmit}>Add Todo</button>
        </form>

        <div className="todoContainer">
          <div className="heading">
            <h1>Your Todo(s)</h1>

            {todoList.length === 0 ? ("") : (<button onClick={() => {setTodoList([])}}>Delete All</button>)}
            
          </div>
          {todoList.length === 0 ? (<h2>You have no active todo</h2>) : 
            todoList.map((todo) =>
              <div className="todoItem" key={todo.id}>
                
                { editId === todo.id ? (
                  <>
                    <input type="text" value={editText} onChange={(e) => setEditText(e.target.value)}></input>
                    <button onClick={() => updateTodo(todo.id)}>update</button>
                  </>
                  ) : (
                  <>
                    <div className="todo"><p>{todo.input}</p></div>
                    <div className="buttons">
                      <button onClick={() => setEditId(todo.id)}>Edit</button>
                      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                    </div>
                  </>
                )}
                
              </div>
            )
          }
        </div>
      </div>
    </>
  )
}

export default App;