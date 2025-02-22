


import './index.css';
import Header from './components/Header';
import { ToDoList } from './components/ToDoList';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function App() {
    const [todolist, setTodolist] = useState("");
    const [todolistarr, setTodolistarr] = useState([]);

    function handleChange(e) {
        setTodolist(e.target.value);
    }

    function handleAdd() {
      if (todolist.trim()) {
          setTodolistarr([...todolistarr, { id: uuidv4(), todolist, isCompleted: false }]);
          setTodolist(""); // Clear input after adding
      }
  }
  

    function handleEdit(id) {
        const editItem = todolistarr.find((item) => item.id === id);
        setTodolist(editItem.todolist);
        setTodolistarr(todolistarr.filter((item) => item.id !== id));
    }

    function handleDelete(id) {
        setTodolistarr(todolistarr.filter((item) => item.id !== id));
    }

    function handleCheckbox(e, id) {
        setTodolistarr((prevList) =>
            prevList.map((item) =>
                item.id === id ? { ...item, isCompleted: e.target.checked } : item
            )
        );
    }
    

    return (
        <>
            <Header />
            <div className="container min-h-[80vh] bg-gray-100 my-10 rounded-lg p-6 mx-auto w-11/12 lg:w-3/4 shadow-md">
                <div className="addtodo">
                    <h1 className="text-3xl font-semibold mb-4 text-gray-800 text-center">Add Your Tasks</h1>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <input
                            className="flex-1 py-2 px-4 rounded-md border border-gray-300 bg-white text-gray-700 placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-blue-300 focus:outline-none"
                            type="text"
                            onChange={handleChange}
                            value={todolist}
                            placeholder="Add your daily tasks here..."
                        />
                        <button
                            onClick={handleAdd}
                            disabled={todolist.length < 3}
                            className="py-2 px-6 disabled:bg-gray-300 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-blue-600 transition"
                        >
                            Add Task
                        </button>
                    </div>
                </div>

                <ToDoList
                    todolistarr={todolistarr}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    handleCheckbox={handleCheckbox}
                />
            </div>
        </>
    );
}
