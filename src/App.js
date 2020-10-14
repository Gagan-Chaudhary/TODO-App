import React , {useState , useEffect}  from 'react';
import './App.css';
import { Button , FormControl,Input,InputLabel} from '@material-ui/core';
import Todo from './Todo';
import firebase from 'firebase';
import db from './firebase';

function App() {

const [todos,setTodos]=useState([]);
const [input,setInput]=useState('go to gym 🏋️');
// console.log('🔫',input);

// when the app loads , we need to listen to the database and fetch new todos as they get added /removed 
useEffect(() => {
  // this code here fires when the app.js loads
  db.collection('todos').orderBy('timestamp','desc').onSnapshot(snapshot =>{
    // console.log(snapshot.docs.map(doc => doc.data()));
    setTodos(snapshot.docs.map(doc => ({id: doc.id , todo:doc.data().todo})))
  })
}, []);


const addTodo = (event)=>{
  // This will fire off when we click the button 
  event.preventDefault(); 
  // this will stop the REFRESH 

  db.collection('todos').add({
    todo: input,
    timestamp : firebase.firestore.FieldValue.serverTimestamp()
  })

  console.log('👽','I am working');
  setTodos([...todos,input]);
  setInput(''); 
  // clear up the input after clicking the todo button 
}


  return (
    <>
    <div className="App">
     <h1 className='main'>Todo App ✍️</h1>
    <form className='form'>

    <div>
    <FormControl>
        <InputLabel >  ✅  Write a to do</InputLabel>
        <Input  value={input} onChange={event => setInput(event.target.value)} />
      </FormControl>
    </div>


    <div className='add'>
    <Button type='submit' onClick={addTodo} variant="contained" color="primary" disabled={!input} >
      Add Todo
      </Button>
    </div>
    </form>

    <div >
    <ul className="list">
       {todos.map(todo => (
        //  <li>{todo}</li>
        <Todo todo={todo}/>
       ))}
     </ul>

    </div>

    <div className="footer">
         <h4>Made with ❤️ by <a target="_blank" href="https://www.linkedin.com/in/thegaganchaudhary/">Gagan Chaudhary</a></h4>
      </div>

        
    </div>

    </>
  );
}

export default App;



