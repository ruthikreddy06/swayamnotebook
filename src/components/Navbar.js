import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
export default function Navbar() {
  const history=useNavigate();
  const onHandle=()=>{
    
        localStorage.removeItem('token')
        history('/Login')
  }
  const onPic=()=>{
    history('/Updatepic')
  }
  return (
      <div>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
<Link className="navbar-brand" href="/">Navbar</Link>
<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
<span className="navbar-toggler-icon"></span>
</button>

<div className="collapse navbar-collapse" id="navbarSupportedContent">
<ul className="navbar-nav mr-auto">
  <li className="nav-item">
    <Link className="nav-link" to="/">Home<span className="sr-only">(current)</span></Link>
  </li>
  <li className="nav-item">
    <Link className="nav-link" to="/about">About</Link>
  </li>
  
  {localStorage.getItem('token')&&
  <li className="nav-item">
    <Link className="nav-link" to="/Note">Notes<span className="sr-only">(current)</span></Link>
  </li>}
  {localStorage.getItem('token')&&
  <li className="nav-item">
    <Link className="nav-link" to="/Addnote">addnote<span className="sr-only">(current)</span></Link>
  </li>}
</ul>
{(!localStorage.getItem('token'))?<div class="d-flex justify-content-end">
   <Link className="nav-link" to="/Login"><button type="button" class="btn btn-secondary">login</button></Link>
  
  <Link className="nav-link" to="/Signup"><button type="button" class="btn btn-secondary">Signup</button></Link>
   </div>:<div>
   <button type="button" class="btn btn-secondary" onClick={onHandle}>logout</button>
   </div>
              
    }
</div>
</nav>
</div>
  )
}
