import React from 'react'
import { useState } from 'react';
import { useContext } from 'react';
import MyContext from '../context/Createcontext'
import Contentitems from './Contentitems';
export default function Modify() {
   // const [update,setupdate]=useState({heading:false,subheading:false,quote:false,para:false});
    const[content,setcontent]=useState({heading:"",subheading:"",quote:"",para:""})
    const mycontext=useContext(MyContext);
    const {addcontent,content1}=mycontext;
    const[heading,setheading]=useState(false)
    const[subheading,setsubheading]=useState(false)
    const[quote,setquote]=useState(false)
    const[paragraph,setparagraph]=useState(false)
    const[image,setimage]=useState(false)
    const  changes=(e)=>{
        setcontent({...content,[e.target.name]:e.target.value})
        console.log(content);
     }

    const handleChanges=(tag)=>{
      addcontent(content,tag,file)
      
    }
    var get = JSON.parse(localStorage.getItem('content'));
console.log(get)
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
let s=false
  return (
<div>
{get.map((content)=>{
      return <div className="col-md-4 my-3"><Contentitems content={content} /></div>
    })
     }
         
         <button type="submit"  key="1"  onClick={()=>{setheading(true)}}>heading</button>

         <button type="submit"  key="2" onClick={()=>{setsubheading(true)}}>subheading</button>
         <button type="submit"   key="3" onClick={()=>{setquote(true)}}>quote</button>
         <button type="submit"  key="4" onClick={()=>{setparagraph(true)}}>paragraph</button>
         <button type="submit"  key="5" onClick={()=>{setimage(true)}}>image</button>

      
       {image&&<div className='wrapper'>
         <img src={file} alt="Avatar" className="image--cover"/>
         <input type="file" className='headings' onChange={changeimg}/>
         <button type="submit" onClick={()=>{handleChanges("image")}}>save</button>
         </div>}

  {heading&&<div className="form-outline mb-4">
  <label className="form-label headings" for="form3Example1cg">heading</label>
    <input type="text" id="form3Example1cg" name="heading" className="form-control form-control-lg" onChange={changes} />
    <button type="submit" onClick={()=>{handleChanges("heading")}}>save</button>
</div>}

 
 {subheading&&<div className="form-outline mb-4">
  <label className="form-label headings" for="form3Example1cg">subheading</label>
    <input type="text" id="form3Example1cg" name="subheading" className="form-control form-control-lg" onChange={changes} />
    <button type="submit" onClick={()=>{handleChanges("subheading")}}>save</button>
  </div>}

  {quote&&<div className="form-outline mb-4">
  <label className="form-label headings" for="form3Example1cg">quote</label>
    <input type="text" id="form3Example1cg" name="quote" className="form-control form-control-lg" onChange={changes} />
    <button type="submit" onClick={()=>{handleChanges("quote")}} >save</button>
  </div>}

 {paragraph&&<div className="form-outline mb-4">
   <label className="form-label headings" for="form3Example3cg" >paragraph</label>
   <textarea className="form-control" id="exampleFormControlTextarea1" name="para" rows="10" onChange={changes}></textarea>
   <button type="submit" onClick={()=>{handleChanges("paragraph")}} >save</button>
   </div>}
   
</div>
    
  )
}
