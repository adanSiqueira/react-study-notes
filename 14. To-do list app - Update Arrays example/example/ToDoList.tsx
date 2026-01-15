import {useState} from 'react';

function ToDoList() {

    const [tasks, setTasks] = useState<string[]>(["Wake up", "Brush Teeth", "Eat Breakfast"]);
    const [newTask, setNewTask] = useState<string>("");

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
        setNewTask(event.target.value);
    }

    function handleAddTask(): void {
        if (newTask.trim() !== "") {
            setTasks([...tasks, newTask.trim()]);
            setNewTask("");
        }
    }

    function handleDeleteTask(index: number): void {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    function moveTaskUp(index: number): void {
        if (index === 0) return;
        const updatedTasks = [...tasks];
        [updatedTasks[index - 1], updatedTasks[index]] = [updatedTasks[index], updatedTasks[index - 1]];
        setTasks(updatedTasks);
    }

    function moveTaskDown(index: number): void {
        if (index === -1) return;
        const updatedTasks = [...tasks];
        [updatedTasks[index + 1], updatedTasks[index]] = [updatedTasks[index], updatedTasks[index + 1]];
        setTasks(updatedTasks);
    }

    return (
        <div className="to-do-list">
            <h1> To-Do List </h1>

            <div>
                <input
                    type="text"
                    value={newTask}
                    onChange={handleInputChange}
                    placeholder="Enter a new task"/>
                <button 
                    className="add-button"
                    onClick={handleAddTask}>
                        Add Task
                </button>

                <ol>
                    {tasks.map((task, index) => (
                        <li key={index}>
                            <span className="text">{task}   </span>
                            <button 
                                className= "delete-button"
                                onClick = {() => handleDeleteTask(index)}>
                                Delete Task
                            </button>
                            <button 
                                className= "move-button"
                                onClick = {() => moveTaskUp(index)}>
                                👆
                            </button>
                            <button 
                                className= "move-button"
                                onClick = {() => moveTaskDown(index)}>
                                👇
                            </button>
                        </li>        
                    ))}
                </ol>
            </div>


        </div>
    );
}


export default ToDoList;