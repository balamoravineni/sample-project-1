import React, {useState} from 'react';
import axios from 'axios';

export default function Todo(props) {

  const [editMode, setEditMode] = useState(false);
  const [todo, setTodo] = useState(props.todo);
  const [isLoading, setIsLoading] = useState(false);
  const { onInputChange, onUpdateClick, onDeleteClick } = props;

  
  const TODOS_API = "https://644f33b2ba9f39c6ab5efc12.mockapi.io/sample/todos/";

  const getTodo = () => {
    setIsLoading(true);
    setTimeout(() => {
      axios.get(TODOS_API+todo.id)
      .then(res => {
        console.log(res);
        setIsLoading(false);
        setTodo(res.data);
    })
    }, 1000)
    
  }

  const onEditModeButtonClick = () => {
    onUpdateClick(todo);
    setEditMode(false);
    getTodo();
  }
  
  return (
    <div >
      { editMode ? (
        <>
          <span>{`${todo.id}. `}</span>
          <input id='task' placeholder='Task' onChange={event => onInputChange(event, todo, setTodo)} value={todo.task}></input>
          <input id='assignedTo' placeholder='Assign To' onChange={event => onInputChange(event, todo, setTodo)} value={todo.assignedTo}></input>
          <button onClick={onEditModeButtonClick} >Update</button>
        </>
      ):(
        isLoading ? (<p>Loading...</p>) : (
          <>
          <span>{`${todo.id}. `}</span>
          <span>{todo.task}</span>
          <span>{todo.assignedTo}</span>
          <button onClick={() => setEditMode(true)}>Edit</button>
          <button  onClick={() => onDeleteClick(todo)}>Delete</button>
          </>
        )
      )}
    </div>
  );
}