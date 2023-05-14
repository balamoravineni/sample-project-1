import React, { useState } from 'react';

export default function TodoRedux(props) {

    const [editMode, setEditMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    // Form Data for Edit Todo
    const [todo, setTodo] = useState(props.todo);

    const { onInputChange, onUpdateClick, onDeleteClick } = props;


    const onEditModeButtonClick = () => {
        setIsLoading(true);
        onUpdateClick(todo, setIsLoading);
        setEditMode(false);
    }

    return (
        <div >
            {editMode ? (
                <>
                    <span>{`${todo.id}. `}</span>
                    <input id='task' placeholder='Task' onChange={event => onInputChange(event, todo, setTodo)} value={todo.task}></input>
                    <input id='assignedTo' placeholder='Assign To' onChange={event => onInputChange(event, todo, setTodo)} value={todo.assignedTo}></input>
                    <button onClick={onEditModeButtonClick} >Update</button>
                </>
            ) : (
                isLoading? (<p> Loading... </p>) : (
                    <>
                        <span>{`${todo.id}. `}</span>
                        <span>{todo.task}</span>
                        <span>{todo.assignedTo}</span>
                        <button onClick={() => setEditMode(true)}>Edit</button>
                        <button onClick={() => onDeleteClick(todo)}>Delete</button>
                    </>
                )
            )}
        </div>
    );
}