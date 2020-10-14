import React, { useState } from 'react';
import './Todo.css';
import db from './firebase';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import { Button, Input, List,ListItem, ListItemAvatar, ListItemText, makeStyles, Modal} from '@material-ui/core';

const useStyles = makeStyles((theme)=>({
    paper:{
        position : 'absolute',
        width : 400,
        backgroundColor : theme.palette.background.paper,
        border : '2px solod #000',
        boxShadow : theme.shadows[5],
        padding : theme.spacing(2,4,3),
    },
}));

function Todo(props) {
    const classes = useStyles()
    const [open,setOpen] = useState(false);
    const [input,setInput] = useState();


    const handleOpen = () =>{
        setOpen(true)
    };


    const updateTodo =()=>{
        // update the todo with new input
        
        db.collection('todos').doc(props.todo.id).set({
            todo:input 

        },{merge : true})
        setOpen(false);

    }

    return (
        <>
        <Modal open={open} onClose={e => setOpen(false)}>
            <div className="pop-up">

            <Input id="standard-basic" fontWeight="bold" color="black" placeholder={props.todo.todo} value={input} onChange={event =>{
                setInput(event.target.value)
            }} />
                <Button type='submit' onClick = {updateTodo} variant="contained" color="primary" disabled={!input} >
      Update
      </Button>
            </div>
        </Modal>
        <List className="todo__list">
            <div className="listitem">
        <h3>{props.todo.todo}</h3>
                
            </div>

            <div className="edit">

            <EditIcon onClick = {e=>setOpen(true)} variant="contained" color="secondary" fontSize="large" />
            </div>
            
 
            <div className="delete">
            <DeleteForeverIcon onClick={event => db.collection('todos').doc(props.todo.id).delete()} 
                variant="contained"
                color="secondary" fontSize="large"
                className={classes.button}
                startIcon={<DeleteIcon />} />
            </div>

        </List>
        </>
    )
}

export default Todo
