import React, { useEffect, useState } from "react";
import TodoRedux from "./TodoRedux";
import { useSelector, useDispatch } from "react-redux";
import { selectTodos, fetchTodos} from "../redux/reducers/todosSlice";
// import { addTodo, updateTodo, removeTodo } from "../redux/reducers/todosSlice";
import {  createTodo, modifyTodo, deleteTodo} from "../redux/reducers/todosSlice";


function TodosRedux() {

    const todos = useSelector(selectTodos);
    const dispatch = useDispatch();


    // Form Data for Create Todo
    const [todo, setTodo] = useState({
        id: todos.data.length > 0 ? todos.data[todos.data.length - 1].id + 1 : 1,
        task: '',
        assignedTo: ''
    });

    useEffect(() => {
        setTodo({
            id: todos.data.length > 0 ? todos.data[todos.data.length - 1].id + 1 : 1,
            task: '',
            assignedTo: ''
        })
    }, [todos])


    useEffect(()=>{
        dispatch(fetchTodos());
    }, [])


    const onInputChange = (event, todo, setTodo) => {
        const { id, value } = event.target;
        setTodo({
            ...todo,
            [id]: value
        });
    }

    const onCreateClick = () => {
        // dispatch(addTodo(todo));
        dispatch(createTodo(todo));
        setTodo({
            task: '',
            assignedTo: ''
        })
    }

    const onDeleteClick = (todo) => {
        // dispatch(removeTodo(todo));
        dispatch(deleteTodo(todo));
    }

    const onUpdateClick = (todo, setIsLoading) => {
        // dispatch(updateTodo(todo));
        dispatch(modifyTodo(todo, setIsLoading));
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
            {
                todos && todos.isLoading? <p> Loading... </p> : (
                    todos && todos.data && todos.data.length === 0 ? <p>No Data</p> : (
                        todos.data.map(todo => {
                            return (
                                <TodoRedux key={todo.id} todo={todo} onDeleteClick={onDeleteClick} onUpdateClick={onUpdateClick} onInputChange={onInputChange} />
                            )
                        })
                    )
                )
            }
        </div>
    );
}

export default TodosRedux;