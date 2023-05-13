import React, {useState, useEffect } from 'react';
import Todo from './Todo'
import axios from 'axios';

export default function Todos() {

  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [todo, setTodo] = useState({
    id: '',
    task: '',
    assignedTo: ''
  });

  const TODOS_API = "https://644f33b2ba9f39c6ab5efc12.mockapi.io/sample/todos/";
  
  useEffect(()=> {
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();
    getTodos(source);
    return () => {
      source.cancel();
    }
      
  }, [])

  const onInputChange = (event, todo, setTodo) => {
    const {id, value} = event.target;
    setTodo({
      ...todo, 
      [id]: value
    });
  }

  const getTodos = (cancelTokenSource) => {
    setIsLoading(true);
    setTimeout(() => {
      axios.get(TODOS_API, {
        cancelToken: cancelTokenSource && cancelTokenSource.token
      })
      .then(res => {
        // console.log(res);
        setIsLoading(false);
        setTodos(res.data);
      })
      .catch(err => {
        if(axios.isCancel(err)) {
          console.log('Successfully Aborted');
        }
        else {
          console.err(err);
        }
      })
    }, 1000)
  }

  

  const onCreateClick = () => {
    axios.post(TODOS_API, {
      task: todo.task,
      assignedTo: todo.assignedTo
    })
    .then(res => {
      console.log(res);
      setTodo({ 
        task: '', 
        assignedTo: ''
      });
      getTodos();
    })
  }

  const onUpdateClick = (todo) => {
    axios.put(TODOS_API + todo.id, {
      task: todo.task,
      assignedTo: todo.assignedTo
    })
    .then(res => {
      console.log(res);
    })
  }

  const onDeleteClick = (todo) => {
    axios.delete(TODOS_API + todo.id)
    .then(res => {
      console.log(res);
      setTodo({ 
        task: '', 
        assignedTo: ''
      });
      getTodos();
    })
  }

  return (
    <div className='todos'>
      <input id='task' placeholder='Task' onChange={event => onInputChange(event, todo, setTodo)} value={todo.task}></input>
      <input id='assignedTo' placeholder='Assign To' onChange={event => onInputChange(event, todo, setTodo)} value={todo.assignedTo}></input>
      <button onClick={onCreateClick}>Create Todo</button>
      <h2>To-do List</h2>
      <div>
        <span>ID</span>
        <span>Task</span>
        <span>Asssiged To</span>
        <span>Edit</span>
        <span>Delete</span>
      </div>
      { isLoading? <p>Loading...</p> : (
          todos && todos.length===0? <p>No Data</p> : (
            todos.map(todo => {
              return (
                <Todo key={todo.id} todo={todo} onDeleteClick={onDeleteClick} onUpdateClick={onUpdateClick} onInputChange={onInputChange}/>
              )
            })
          )
        )
      }
    </div>
  );
}