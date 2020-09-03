import React from 'react';
import './App.css';
import { useSelector, useDispatch } from "react-redux"

function App() {
  
  let { todos, completedNum, totalNum } = useSelector(state => state)
  let dispatch = useDispatch()
  const addTodo = (e) => {
    if (e.nativeEvent.keyCode === 13) {
      dispatch({
        type: "ADDTODO",
        title: e.target.value,
      })
    }
  }

  const inputNewTitle = (todo, e) => {
        
    if (e.nativeEvent.keyCode === 13) {
      dispatch({
        type: "CHANGETODO",
        title: e.target.value,
        todo:todo
      })
    }
  }

  const editTodo = (todo) => {
    dispatch({
      type:"CHANGETODO",
      title: todo.title,
      todo:todo
    })
  }
  return (
    <div className="App">
      <section className="todoapp" >
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            autoFocus
            autoComplete="off"
            placeholder="What needs to be done?"
            onKeyUp={addTodo} />
        </header>

        <section className="main" >
          <input id="toggle-all" className="toggle-all" type="checkbox" />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <ul className="todo-list">
            {
              todos.map((todo) => {
                return <li
                  className="todo"
                  key={todo.id}
                  className={todo.completed ? "completed" : ""}>
                  <div className="view">
                    <input
                      defaultChecked={todo.completed}
                      className="toggle"
                      type="checkbox"
                      onMouseUp={() => {
                        dispatch({
                          type: "CHANGTODOESTATE",
                          id: todo.id
                        })
                      }} />
                    <input type="text"
                    className={todo.isEdit?"isEndEdit todoEdit":"isStartEdit todoEdit"}
                    onKeyUp={inputNewTitle.bind(this,todo)}
                    autoFocus
                    placeholder={todo.title} />
                    <label 
                    className={todo.isEdit?"isStartEdit":"isEndEdit"}
                    onDoubleClick={editTodo.bind(this,todo)}>
                    {todo.title}</label>
                    <button className="destroy" onMouseUp={() => {
                      dispatch({
                        type: "DELETETODO",
                        id: todo.id
                      })
                    }}>X</button>
                  </div>
                </li>
              })
            }
          </ul>
        </section>

        <footer className="footer">
          <ul className="filters">
            <li>
              <a href="#/all"
                onClick={() => {
                  dispatch({
                    type: "ALLTODO"
                  })
                }}
              >All{" (" + totalNum + ")"}</a>
            </li>
            <li>
              <a href="#/active"
                onClick={() => {
                  dispatch({
                    type: "ACTIVETODO"
                  })
                }}
              >Active</a>
            </li>
            <li>
              <a href="#/completed"
                onClick={() => {
                  dispatch({
                    type: "COMPLETETODO"
                  })
                }}
              >Completed{" (" + completedNum + ")"}</a>
            </li >
          </ul >
        </footer >
      </section >
    </div>
  );
}

export default App;

