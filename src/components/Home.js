import React from 'react'
import MyContext from '../context/Createcontext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Home.css'
function Home() {
    const mycontext=useContext(MyContext);
    const {state}=mycontext;
  return (
     <div>
          <div className='container coloring'>
                   Welcome To INoteBook
          </div>
        <div className='row my-15'>
        <div className="container my-3 col-md-4">
           <img src="https://c0.wallpaperflare.com/preview/530/273/82/laptop-apple-macbook-computer.jpg" alt="Girl in a jacket" width="400" height="400"></img>
        </div>
        <div className="container my-3 col-md-4 fonts">
                where your notes is secured

        </div>
        
       
</div>
{!localStorage.getItem('token')&&<div className="d-flex justify-content-around">
 
 <Link className="nav-link" to="/Login"><button type="button" class="btn btn-secondary heading">&rarr;Get Started</button></Link>
</div>}

     </div>
  ) 
}

export default Home