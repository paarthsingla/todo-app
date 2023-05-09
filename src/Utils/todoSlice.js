import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    todoList: []
}

const URL = "https://dummyjson.com/todos";

export const fetchTodos = createAsyncThunk('fetchTodos', async () => {
    try {
        const {data} = (await axios.get(URL+'/user/49'));
        if(data) return data.todos;
        return undefined;
    } catch (error) {
        console.log(error);
        return undefined;
    }
});

export const addTodo = createAsyncThunk('addTodo', async (newTask) => {
    try {
        const {data} = (await axios.post(URL+'/add', {
              todo: newTask,
              completed: false,
              userId: 49,
            }));
        if(data) return data;
        return undefined;
    } catch (error) {
        console.log(error);
        return undefined;
    }
});

export const updateTodo = createAsyncThunk('updateTodo', async (todoItem) => {
    try {
        const {data} = (await axios.put(URL+'/'+todoItem.id, {
              todo: todoItem.todo,
              completed: (todoItem.status==='pending')?false:true
            }));
        console.log(data)
        if(data) return todoItem;
        return undefined;
    } catch (error) {
        console.log(error);
        return todoItem;//Since Dummy API throws error for newly created tasks.
    }
});

export const deleteTodo = createAsyncThunk('deleteTodo', async (id) => {
    try {
        const {data} = (await axios.delete(URL+'/'+id));
        if(data) return data.id;
        return undefined;
    } catch (error) {
        console.log(error);
        return id;//Since Dummy API throws error for newly created tasks.
    }
});

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    extraReducers: builder => {
        builder
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.todoList = action.payload.map(i=>{
                    let newTodo = {
                        id: i.id,
                        todo: i.todo,
                        status: (i.completed)?'completed':'pending'
                    }
                    return newTodo;
                })
            })
            .addCase(addTodo.fulfilled, (state, action) => {
                let newTodo = {
                    id: action.payload.id,
                    todo: action.payload.todo,
                    status: (action.payload.completed)?'completed':'pending'
                }
                state.todoList.push(newTodo);
            })
            .addCase(updateTodo.fulfilled, (state, action) => {
                state.todoList = state.todoList.map(i=>{
                    if(i.id===action.payload.id) return action.payload;
                    else return i;
                });
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.todoList = state.todoList.filter(i=>i.id!==action.payload);
            })
    }
});

export default todoSlice.reducer;