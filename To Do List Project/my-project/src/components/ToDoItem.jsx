// // 
// function ToDoItem({ item, handleEdit, handleDelete, handleCheckbox }) {
//     return (
//         <div
//             key={item.id}
//             className="flex justify-between items-center bg-white rounded-md shadow p-4 hover:shadow-lg transition"
//         >
//             <div className="flex items-center gap-4">
//                 <input
//                     type="checkbox"
//                     id={item.id}
//                     onChange={(e) => handleCheckbox(e, item.id)}
//                     checked={item.isCompleted}
//                     className="h-5 w-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
//                 />
//                 <p className={item.isCompleted ? "line-through text-gray-500" : "text-gray-800"}>
//                     {item.todolist}
//                 </p>
//             </div>
//             <div className="flex gap-3">
//                 <button
//                     onClick={() => handleEdit(item.id)}
//                     className="py-1 px-4 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 transition"
//                 >
//                     Edit
//                 </button>
//                 <button
//                     onClick={() => handleDelete(item.id)}
//                     className="py-1 px-4 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 transition"
//                 >
//                     Delete
//                 </button>
//             </div>
//         </div>
//     );
// }

// export { ToDoItem };

function ToDoItem({ item, handleEdit, handleDelete, handleCheckbox }) {
    return (
        <div
            key={item.id}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white rounded-md shadow p-4 hover:shadow-lg transition"
        >
            <div className="flex items-center gap-4 mb-4 sm:mb-0">
                <input
                    type="checkbox"
                    id={item.id}
                    onChange={(e) => handleCheckbox(e, item.id)}
                    checked={item.isCompleted}
                    className="h-5 w-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                />
                <p className={item.isCompleted ? "line-through text-gray-500" : "text-gray-800"}>
                    {item.todolist}
                </p>
            </div>
            <div className="flex gap-3">
                <button
                    onClick={() => handleEdit(item.id)}
                    className="py-1 px-4 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 transition"
                >
                    Edit
                </button>
                <button
                    onClick={() => handleDelete(item.id)}
                    className="py-1 px-4 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 transition"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export { ToDoItem };
