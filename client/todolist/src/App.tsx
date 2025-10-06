import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

type Todo = {
  _id: string;
  title: string;
  completed: Boolean;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [editTaskId, setEditTaskId] = useState<string | null>(null);
  const [editInput, setEditInput] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
     

    try {
      const res =await axios.post("http://localhost:3000/api/todos", {
        title: input,
        completed: false,
      });
      setTodos([...todos, res.data]);
      setInput("")
    } catch (error) {
      console.error("Error Adding data", error);
    }
  };

  const editTask = (idTask: string, currentTask: string) => {
    setEditTaskId(idTask);
    setEditInput(currentTask);
  };
  const saveTask = async (idTask: string) => {
      try{
             const res = await axios.put(`http://localhost:3000/api/todos/${idTask}`, {
              title: editInput
             });
              setTodos(todos.map((t)=> t._id === idTask ? res.data : t));
              setEditTaskId(null);
           setEditInput("");
      }catch(error){
        console.error("Error Updating Task", error)
      }
  };

  // delete Task by id

  const deleteTask = async(id:string | undefined)=>{
    try {
      await axios.delete(`http://localhost:3000/api/todos/${id}`);
      setTodos(todos.filter((t)=>t._id !== id))
    } catch (error) {
      console.error("Error Deleting Todo", error)
    }
  }

  // useEffect For fetch all todo data inside db
  useEffect(()=>{
    const fetchTodos = async ()=>{
               try {
                    const res = await axios.get("http://localhost:3000/api/todos");
                    setTodos(res.data);
               } catch (error) {
                console.error( "Error Fetching Data", error);
               }
    }
    fetchTodos();
  },[]);
  return (
    <main className="container">
      <h1>Todo List Mern + TYPESCRIPT</h1>
      <form onSubmit={handleSubmit}>
        <div className="inputField">
          <input
            type="text"
            placeholder="Add Your Task"
            value={input}
            onChange={handleChange}
          />
          <button type="submit">Add</button>
        </div>
        <input type="text" placeholder="Search..." />
      </form>

      <section className="content">
        <ul>
          {todos.map(({ _id, title, completed }) => {
            return (
              <li key={_id}>
                <span>{completed ? "❌" : "✔️"}</span>
                {editTaskId === _id ? (
                  <input
                  className="editInput"
                    type="text"
                    value={editInput}
                    onChange={(e) => setEditInput(e.target.value)}
                  />
                ) : (
                  <p>{title}</p>
                )}
                <div className="btns">
                  {editTaskId === _id? (
                    <button className="save" onClick={()=>saveTask(_id)}>Save</button>
                  ) : (
                    <button
                      role="edit-button"
                      className="edit"
                      onClick={() => editTask(_id, title)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                        />
                      </svg>
                    </button>
                  )}
                  <button
                    role="delete-button"
                    className="delete"
                    onClick={()=>deleteTask(_id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18 18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </li>
            );
          })}
     
        </ul>
      </section>
    </main>
  );
}

export default App;
