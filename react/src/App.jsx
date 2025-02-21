import { ToDoEnter } from './components/todo/ToDoEnter.component';
import { ToDoData } from './components/todo/ToDoData.component';
import { ToDoTitle } from './components/todo/ToDoTitle.component';
import { useState, useEffect } from 'react';
import taskApi from '../src/api/taskAPI';

function App() {
    const [todo, setToDo] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, []);

 const fetchTasks = async () => {
     try {
         const allTasks = await taskApi.getAll();
         if (Array.isArray(allTasks.data)) {
             setToDo(allTasks.data); 
         } else {
             console.error('Error: Response data is not an array');
         }
     } catch (error) {
         console.error('Error fetching tasks:', error);
     }
 };


      const addNewToDo = async (dataInput) => {
          try {
              const createTask = await taskApi.create({ title: dataInput }); 
              if (createTask?.data) {
                  setToDo((prevTodos) => [createTask.data, ...prevTodos]);
              }
          } catch (error) {
              alert (error.response.data.message)
          }
      };
    return (
        <div className='todo-container'>
            <ToDoTitle />
            <ToDoEnter addNewToDo={addNewToDo} />
            <ToDoData data={todo} setData={setToDo} />
        </div>
    );
}

export default App;
