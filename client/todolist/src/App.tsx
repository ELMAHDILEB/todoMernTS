import React from "react";
import "./App.css";

function App() {
  return (
    <main className="container">
      <h1>Todo List Mern + TYPESCRIPT</h1>
      <form>
        <div className="inputField">
          <input type="text" placeholder="Add Ypur Task" />
          <button>Add</button>
        </div>
        <input type="text" placeholder="Search..." />
      </form>

      <section className="content">
        <ul>
          <li>
            <span></span>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam culpa quos officiis quia magni hic incidunt quasi laudantium exercitationem accusantium!</p>
            <div className="btns">
              <div className="edit">
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
              </div>
              <div className="delete">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>

              </div>
            </div>
          </li>
        </ul>
      </section>
    </main>
  );
}

export default App;
