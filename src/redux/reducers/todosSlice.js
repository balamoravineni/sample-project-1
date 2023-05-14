import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        isLoading: false,
        data: []
    },
    reducers: {
        addTodo: (state, action) => {
            state.data.push({...action.payload})
        },
        removeTodo: (state, action) => {
            console.log("remove payload", action.payload);
            const reqIndex = state.data.findIndex( todo => todo.id === action.payload.id)
            state.data.splice(reqIndex, 1);
        },
        updateTodo: (state, action) => {
            console.log("setTodo payload", action.payload);
            const reqIndex = state.data.findIndex( todo => todo.id === action.payload.id)
            state[reqIndex] = {...action.payload};
        },
        setIsLoading: (state, action) => {
            console.log("setIsLoading payload", action.payload);
            state.isLoading = action.payload;
        },
        setTodo: (state, action) => {
            console.log("setTodo payload", action.payload);
            const reqIndex = state.data.findIndex( todo => todo.id === action.payload.id)
            state[reqIndex] = {...action.payload};
        },
        setTodos: (state, action) => {
            console.log("setTodos payload", action.payload);
            state.data.length=0;
            state.data.push(...action.payload);
        }
    }
});

export const selectTodos = state => state.todos

export const { addTodo, removeTodo, updateTodo } = todosSlice.actions;
export const { setIsLoading, setTodo, setTodos } = todosSlice.actions;

const TODOS_API = "https://644f33b2ba9f39c6ab5efc12.mockapi.io/sample/todos/";

export const fetchTodos = () => {
    return (dispatch, getState) => {
        console.log("fetching Todos... ");
        dispatch(setIsLoading(true));
        setTimeout(()=> {
            axios.get(TODOS_API)
            .then(res => {
                console.log("fetch result: ", res);
                dispatch(setIsLoading(false));
                dispatch(setTodos(res.data));
            });
        }, 2000)
    }
}

export const createTodo = (todo) => {
    return (dispatch, getState) => {
        console.log("add Todo: ", todo);
        dispatch(setIsLoading(true));
        axios.post(TODOS_API, todo)
        .then(res => {
            console.log("add result: ", res);
            dispatch(fetchTodos());
        });
    }
}

export const modifyTodo = (todo, setIsLoading) => {
    return (dispatch, getState) => {
        console.log("update Todo: ", todo);
        axios.put(TODOS_API + todo.id, todo)
        .then(res => {
            console.log("update result: ", res);
            setIsLoading(false);
            dispatch(setTodo(res.data));
        });
    }
}

export const deleteTodo = (todo) => {
    return (dispatch, getState) => {
        console.log("delete Todo: ", todo);
        dispatch(setIsLoading(true));
        fetch(TODOS_API + todo.id, {
            method: 'delete'
        })
        .then(res => res.json())
        .then(res => {
            console.log("delete result: ", res);
            dispatch(fetchTodos());
        });
    }
}

export default todosSlice.reducer;
