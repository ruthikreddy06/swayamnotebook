import React, { useEffect, useState } from 'react'

function Profile() {
  const profile=localStorage.getItem('token')
  const url=`http://localhost:5000/api/auth`
  const [user,setuser]=useState({email:"",name:"",img1:""})
  const fetchuser=async ()=>{
                 
    const response = await fetch(`${url}/getuser`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        'auth-token':profile
      },
    });
      const json1= await response.json(); 
      console.log(json1);
      setuser({email:json1.data.emailid,name:json1.data.name,img1:json1.data.img.url})
  }
  useEffect(() => {
    fetchuser();
  },[]);
    
     
  return (
    <div>
         <h1 className='about textcolor'>Profile</h1>
        <div className='container'>
      <img src={user.img1} alt="Avatar" width='200' height="200"/>
      </div>
      <div className='container my-3'>

      <h5 className='headings'>Name: <span className='text'>{user.name}</span></h5>
        <h5 className='headings'>Email:<span className='text'> {user.email}</span></h5>
      </div>
        
    </div>
  )
}

export default Profile