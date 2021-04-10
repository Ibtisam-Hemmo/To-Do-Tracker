import {useState} from 'react';

function AddTask({ onAdd }) {
    const [text, setTask]= useState('');
    const [date, setDate]= useState('');
    const [complete, setComplete]= useState('false');

    const onSubmit = (e)=>{
        e.preventDefault();
        if(!text){
            alert('Please enter a task to submit');
            return
        }

        onAdd({text, date, complete})
        setTask('');
        setDate('');
        setComplete(false);

    }

    return (
        <form className="add-form" onSubmit={onSubmit}>
            <div className="form-control">
                <label> Task </label>
                <input type="text" placeholder="Add Task" value={text} onChange={(e)=> setTask(e.target.value)}/>
            </div>

            <div className="form-control">
                <label> Day & Time </label>
                <input type="text" placeholder="Day & Time" value={date} onChange={(e)=> setDate(e.target.value)} />
            </div>

            <div className="form-control form-control-check ">
                <label> Set Complete </label>
                <input type="checkbox" checked={complete} value={complete} onChange={(e)=> setComplete(e.currentTarget.checked)} />
            </div>

            <input type="submit" value="Save Task"  className="btn btn-block"/>
        </form>
        
    )
}

export default AddTask;
