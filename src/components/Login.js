
import React, { useContext } from 'react'
import { useState } from 'react'
import {useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import './Login.css';
function Login(props) {
    const url=`http://localhost:5000/api/auth`
    const histroy=useNavigate();

    const [login,setlogin]=useState({email:"",password:""})
    const fetchuser=async ()=>{
                 
        const response = await fetch(`${url}/login`, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({emailid:login.email,password:login.password})
        });
          console.log("login");
          const json= await response.json(); 
          console.log(json);
          if(json.success==true){
            localStorage.setItem('token',json.token)
            props.showalert("Success login","success")
            histroy("/");
          }
          else{
            props.showalert("invalid login credentails","danger")
          }

      }
      const loginupdate=()=>{
        console.log("hi");
         fetchuser();
         console.log("logged in");
      }
      const  changes=(e)=>{
        e.preventDefault();
        setlogin({...login,[e.target.name]:e.target.value})
        console.log(login);
     }
  return (
    <div>
        <h1 className='about textcolor'>login</h1>
    <div className='container'>
        
        <div class="row">
        <div class="form-group col-md-6">
    <label for="inputEmail3" class="col-sm-2 col-form-label headings">Email</label>
    <div class="col-sm-10">
      <input type="email" class="form-control" id="email" placeholder="email" name="email" onChange={changes}/>
    </div>
  </div>
   <div class="form-group col-md-6 container">
    <label for="inputPassword3" class="col-sm-2 col-form-label headings">Password</label>
    <div class="col-sm-10"> 
      <input type="password" class="form-control" id="password" placeholder="password" name="password" onChange={changes}/>
    </div>
  </div>
    <div class="col-sm-10 my-4 container">
      <button type="button" class="btn btn-secondary headings" onClick={()=>{loginupdate()}}>login in</button>
      <h7 className='headings'>New?create account</h7>
     
      <Link className="nav-link" to="/SignUp"> <button type="button" class="btn btn-link headings">SignUp</button></Link>
    </div>
      
        </div>

  </div>
  </div>
  )
}

export default Login