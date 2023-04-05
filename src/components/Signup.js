import React from 'react'
import { useState } from 'react'
import {useNavigate } from 'react-router';
import './Sign.css';
function Signup(props) {

    const url=`http://localhost:5000/api/auth`
    const histroy=useNavigate();
     
    const [signin,setsignin]=useState({email:"",password:"",name:""})
    const createuser=async ()=>{
                  
        const response = await fetch(`http://localhost:5000/api/auth`, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({emailid:signin.email,password:signin.password,name:signin.name,img:file})
        });
          console.log("signin");
          const json= await response.json(); 
          console.log(json);
          if(json.success===true){
            props.showalert("Success signin","success")
            histroy("/Login");
          }
          else{
            props.showalert("user exist","danger")
          }

      }
      const Signupdate=()=>{
         createuser();
         console.log("signin");
      }
      const  changes=(e)=>{
        setsignin({...signin,[e.target.name]:e.target.value})
        console.log(signin);
     }
     const [file, setfile] = useState("https://www.shutterstock.com/image-vector/user-account-circle-profile-line-260nw-272552858.jpg");
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
  <div>
       
       <form className='container'>
         <div className='wrapper'>
         <img src={file} alt="Avatar" className="image--cover"/>
         <input type="file" className='headings' onChange={changeimg}/>
         </div>
       <div class="row col-sm-5">
         <label for="inputEmail3" class="col-sm-2 col-form-label headings">Name</label>
         <div class="col-sm-10">
           <input type="text" class="form-control" id="name" name="name" onChange={changes}/>
         </div>
       </div>
       <div class="row col-sm-5 my-3">
         <label for="inputEmail3" class="col-sm-2 col-form-label headings">Email</label>
         <div class="col-sm-10">
           <input type="email" class="form-control" id="inputEmail3" name="email" onChange={changes}/>
         </div>
       </div>
       <div class="row col-sm-5 my-3">
         <label for="inputPassword3" class="col-sm-2 col-form-label headings">Password</label>
         <div class="col-sm-10">
           <input type="password" class="form-control" id="inputPassword3" name="password" onChange={changes}/>
         </div>
       </div>
       <button type="button" class="btn btn-primary my-3 headings" onClick={()=>{Signupdate()}}>Sign up</button>
     </form>
     </div>
  
  )
}

export default Signup