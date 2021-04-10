import {useState,useEffect} from 'react';
import Header from './components/Header';
import Footer from './components/footer';
import Tasks from './components/Tasks';
import AddTask from'./components/AddTask';
import About from './components/About';
import {BrowserRouter as Router , Route} from 'react-router-dom';
const App = ()=> {
  // const name = "Yamen";
  // const value = true;

  const [tasks ,setTasks] = useState ([]);

  useEffect (()=> {
      const getTasks = async ()=> {
        const tasksFromServer = await fetchTasks ();
        setTasks (tasksFromServer);
      }
      getTasks ();
    },[]) ;

// fetch tasks
    const fetchTasks = async()=>{
      const res = await fetch("http://localhost:8000/tasks")
      const data = await res.json();
      console.log(data);
      return data;
    }

    // fetch tasks
    const fetchTask = async(id)=>{
      const res = await fetch(`http://localhost:8000/tasks/${id}`)
      const data = await res.json();
      console.log(data);
      return data;
    }

  //delete the task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:8000/tasks/${id}`,{
      method: 'DELETE',
    })

     setTasks( tasks.filter( (task)=> task.id !== id))
 }

 //toggle reminder 
 const toggleComplete = async (id)=>{
   const taskToToggle = await fetchTask (id);
   const updTask  = {...taskToToggle, complete : !taskToToggle.complete};
   const res = await fetch(`http://localhost:8000/tasks/${id}`,{
     method: 'PUT',
     headers: {'content-type': 'application/json'},
     body: JSON.stringify(updTask),
                          })

   const data = await res.json();

    setTasks( 
      tasks.map((task)=> (task.id === id ? {...task, complete: data.complete} : task))
            )}
//Add tasks normally within button
 /* const addTask = (task)=>{
    const id = Math.floor( Math.random() *1000 ) + 1;
    const newTask = {id , ...task};
    setTasks([...tasks, newTask]);

  }  */

  //adding with server
  const addTask = async (task)=>{
    const res = await fetch('http://localhost:8000/tasks',{
      method: 'Post',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(task)
    })
      const data = await res.json();

      setTasks([...tasks, data]);
  }     

  const[showAddTask,setShowAddTask]= useState(false);

  return (
    <Router>
    <div className="container">

     {/* <h1>Hello, it's Ibtisam </h1>
      <h4>I am {name}</h4>
     <h5>{value ? "yes" : "No"}</h5> */} 

      <Header name = "Task Tracker" 
              onAdd={ ()=> setShowAddTask (!showAddTask)} 
              showAdd = {showAddTask}
      />

      
    <Route  path='/'exact  render={(props)=>
    (
      <>
          {showAddTask && <AddTask onAdd={addTask}/>}

          {tasks.length > 0 
          ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleComplete}/> 
          : 'No tasks to show' }
      </>
    )
    }
    />
    <Route  path='/About' component={About}/>
    <Footer />
    </div>
    </Router>
  );
}

export default App;
