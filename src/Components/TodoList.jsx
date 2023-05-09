import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import TodoItem from "./TodoItem";
import "./TodoList.scss";
import { addTodo, fetchTodos } from "../Utils/todoSlice";
import Chart from "./Chart";

function TodoList() {
  const { todoList } = useSelector(state=>state.todos);
  const dispatch = useDispatch();
  const [newTask, setNewTask] = useState('');
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [])
  

  const submitHandler = e => {
      e.preventDefault();
      if(newTask) {
        dispatch(addTodo(newTask));
        setNewTask('');
      }
  }
    
  return (
    <>
      <div className="main">
        <form onSubmit={submitHandler}>
            <input type="text" 
              value={newTask} 
              placeholder="New Task"
              onChange={e=>setNewTask(e.target.value)} />
            <button>&#62;</button>
        </form>
        <div className="chartButton">
          <button onClick={()=>setShowChart(true)}>Chart</button>
        </div>
      </div>
      <div className="list">
        { (todoList.length>0)?todoList.map(i=><TodoItem key={i.id} item={i}/>):
          'No Data To Display!' }
      </div>
      {
        (showChart) &&
        <div className="base">
          <div className="chartArea">
            <div className="cross">
              <button onClick={()=>setShowChart(false)}>x</button>
            </div>
            <Chart />
          </div>
        </div>
      }
    </>
  )
}
export default TodoList