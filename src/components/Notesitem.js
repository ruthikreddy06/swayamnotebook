import React, { useContext } from 'react'
import MyContext from '../context/Createcontext'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import CardMedia from '@mui/material/CardMedia';
export default function Notesitem(props) {
  const mycontext=useContext(MyContext);
  const [update,setupdate]=useState({eNameoftheauthor:"",eTitleofblog:"",eContent:""});
  const histroy=useNavigate();
  const {deleteNote,setkeyfunc,contentfunc}=mycontext;
   
  const Delete=(key)=>{
    const json=deleteNote(key);
    if(json.success==true){
    props.alert("your notes not deleted","danger");}
    else{
      props.alert("your notes deleted","success");
    }
  }
  const  changes=(e)=>{
    setupdate({...update,[e.target.name]:e.target.value})
 }
  const [show, setShow] = useState(false);

  const handleSave = (key) =>{
    updatenotes(key);
    setShow(false);
          
  };
  const handleClose = () =>{
    
    setShow(false);
   
  };
  const handleShow = () =>{
    setShow(true);
    setupdate({eNameoftheauthor:props.Notes.Nameoftheauthor,eTitleofblog:props.Notes.Titleofblog,eContent:props.Notes.Content});

  }
  const addcontentchanges=async(key,content1)=>{
    console.log(key)
    console.log(typeof(key))
    localStorage.setItem('key_id',key)
   localStorage.setItem('content',JSON.stringify(props.Notes.Content))
   
    const l=await setkeyfunc(key)
    const l2=await contentfunc(content1)
    console.log(typeof(content1))
    histroy("/Modify")   
 
  }
  const url=`http://localhost:5000/api/note`
  const updatenotes=async (key)=>{
                 
    const response = await fetch(`${url}/updatedata/${key}`, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
        "auth-token":localStorage.getItem('token')
      },
      body: JSON.stringify({Nameoftheauthor:update.eNameoftheauthor,Titleofblog:update.eTitleofblog,Content:update.eContent})
    });
      console.log("updated");
      const json= await response.json(); 
      console.log(json);
  }
  return (
   
<div>
<Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title className='headings'>editing</Modal.Title>
        </Modal.Header>
        <Modal.Body>         <form>
        

<div className="form-outline mb-4">
<label className="form-label headings" for="form3Example1cg">Nameoftheauthor</label>
  <input type="text" id="form3Example1cg" name="eNameoftheauthor" className="form-control form-control-lg" value={update.eNameoftheauthor} onChange={changes}/>
 
</div>

<div className="form-outline mb-4">
<label className="form-label headings" for="form3Example4cg">Titleofblog</label>
  <input type="text" id="form3Example4cg"  name="eTitleofblog" className="form-control form-control-lg"  value={update.eTitleofblog}  onChange={changes}/>

</div>

</form></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary headings" onClick={()=>{handleClose()}}>
            Close
          </Button>
          <Button type="submit" variant="secondary headings" onClick={()=>{handleSave(props.Notes._id)}}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    
<div className="card" style={{width:"18rem"}}>
<CardHeader
        avatar={
          <Avatar style={{backgroundColor:"red"}} aria-label="recipe">
            {props.Notes.Nameoftheauthor.slice(0,1)}
          </Avatar>
        }
     
        title={props.Notes.Nameoftheauthor}
        subheader= {props.Notes.Dateofpublishing}
      />
      <CardMedia
        component="img"
        height="194"
        image={props.Notes.Blogthumbnail.url}
        alt="Paella dish"
      />
  <div className="card-body ">  
     <h5 style={{textAlign:"center"}}>{props.Notes.Titleofblog}</h5>
    <div className="d-flex justify-content-between">
    <Link> <i className="fa-solid fa-pen" onClick={()=>{handleShow()}}></i></Link>
    <Link> <i className="fa-solid fa-trash"  onClick={()=>{Delete(props.Notes._id)}}></i></Link>
    <button type="button" class="btn btn-primary" onClick={()=>{addcontentchanges(props.Notes._id,props.Notes.Content)}}>Primary</button>
   
</div>

    </div>
   
  </div>
</div>

  
  )                                
}
