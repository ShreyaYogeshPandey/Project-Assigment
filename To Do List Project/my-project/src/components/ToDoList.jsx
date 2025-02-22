import { ToDoItem } from "./ToDoitem";

function ToDoList({ todolistarr, handleEdit, handleDelete, handleCheckbox }) {
    return (
        <div className="my-8">
            <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">Your Tasks</h1>
            <div className="space-y-4">
            {todolistarr.map((item) => (
                    <ToDoItem
                        key={item.id}
                        item={item}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        handleCheckbox={handleCheckbox}
                    />
                ))}
            </div>
        </div>
    );
}

export { ToDoList };