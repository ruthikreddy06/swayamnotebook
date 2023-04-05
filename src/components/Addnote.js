import React, { useContext } from 'react'
import MyContext from '../context/Createcontext';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Addnote(props) {
     const [Add,setAdd]=useState({Nameoftheauthor:"",Titleofblog:""});
     const {addNote}=useContext(MyContext);
    
     const [file, setfile] = useState("https://www.shutterstock.com/image-vector/user-account-circle-profile-line-260nw-272552858.jpg");
     const histroy=useNavigate();
    const onHandle=()=>{
             addNote(Add,file);
          histroy("/Note");

     }
    const  changes=(e)=>{
        setAdd({...Add,[e.target.name]:e.target.value})
     }
   
     function changeimg(e) {
         const file1=e.target.files[0];
         Transform(file1);     
        
     }
     const Transform=(file1)=>{
      const reader =new FileReader();
      if(file1){
        reader.readAsDataURL(file1);
        reader.onloadend=()=>{
         
          setfile(reader.result);
            
        
        };
      }
     }
     
 
 
  return (
    <div className='coloring1'>
       <section className="vh-100 bg-image">
  <div className="mask d-flex align-items-center h-100 gradient-custom-3">
    <div className="container h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
          <div className="card" >
            <div className="card-body p-5">
              <h2 className="text-uppercase text-center mb-5 headings">Addnote</h2>

              <form>
              <div className='wrapper'>
         <img src={file} alt="Avatar" className="image--cover"/>
         <input type="file" className='headings' onChange={changeimg}/>
         </div>

                <div className="form-outline mb-4">
                <label className="form-label headings" for="form3Example1cg">Name of the author</label>
                  <input type="text" id="form3Example1cg" name="Nameoftheauthor" className="form-control form-control-lg" onChange={changes} />
                 
                </div>
                <div className="form-outline mb-4">
                <label className="form-label headings" for="form3Example4cg"> Title of blog</label>
                  <input type="text" id="form3Example4cg"  name="Titleofblog" className="form-control form-control-lg" onChange={changes} />
                
                </div>

                  

                <div className="d-flex justify-content-center">
                  <button type="button"
                    className="btn btn-secondary headings" onClick={onHandle}>AddContent</button>
                    </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

    </div>
  )
}

export default Addnote