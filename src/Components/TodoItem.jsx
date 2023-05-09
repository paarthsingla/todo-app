import { useDispatch } from "react-redux";
import { deleteTodo, updateTodo } from "../Utils/todoSlice";
import "./TodoItem.scss";
import { useState } from "react";

function TodoItem({item}) {
  const dispatch = useDispatch();
  const textStyle = (item.status==='pending')?'text-pending':'text-completed';
  const [editMode, setEditMode] = useState(false);
  const [taskEdit, setTaskEdit] = useState(item.todo)

  const updateHandler = () => {
    let updatedItem = (item.status==='pending')?
            {...item, status: 'completed'}:{...item, status: 'pending'};
    dispatch(updateTodo(updatedItem));
  };

  const deleteHandler = () => {
    dispatch(deleteTodo(item.id));
  };

  const editHandler = () => {
    if(editMode) {
      (taskEdit)?
        dispatch(updateTodo({...item, todo: taskEdit})):
        setTaskEdit(item.todo);
    }
    setEditMode(p=>!p);
  };

  return (
    <div className="task">
      {
        (editMode)?
        <>
        <input type="text" 
              value={taskEdit} 
              className="text-edit" 
              onChange={e=>setTaskEdit(e.target.value)} 
              onBlur={editHandler}
              autoFocus />
        <div className="actions">
          <button onClick={editHandler} className="edit">&#10003;</button>
        </div>
        </>:<>
        <div className={textStyle}>{item.todo}</div>
        <div className="actions">
          { (item.status==='pending')?
          <button onClick={updateHandler} className="done">&#10003;</button>:
          <button onClick={updateHandler} className="done">&#8635;</button>
          }
          <button onClick={editHandler} className="edit">&#9998;</button>
          <button onClick={deleteHandler} className="del">x</button>
        </div>
        </>
  }
    </div>
  )
}
export default TodoItem