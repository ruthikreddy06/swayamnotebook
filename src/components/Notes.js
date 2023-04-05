import React, { useEffect} from 'react'
import MyContext from '../context/Createcontext';
import { useContext } from 'react';
import Notesitem from './Notesitem';
import { Link } from 'react-router-dom';


export default function Notes(props) {
    const mycontext=useContext(MyContext);
    const {fetchNote,Note}=mycontext;
    useEffect(()=>{
        fetchNote();
    },[])
    console.log(Note)
    
  return (
  <div className='container'>
      <h1 className='about textcolor'>Notes</h1>
     <div className='row coloring3'>
    {Note.map((Note)=>{
      return <div className="col-md-4 my-3"><Notesitem Notes={Note}  alert={props.showalert}/></div>
    })
     }
     </div>
     </div>
  )
}
