import React, { useState } from "react";
import MyContext from "./Createcontext";
//import About from "../components/About";
const Setstate=(props)=>{
 
        const url=`http://localhost:5000/api/note`
       const Notes=[];
       const[key_id,setKey_id]=useState("");
       const [content1,setcontent]=useState([]);

        const [Note,setNote]=useState(Notes);
        const addNote=async (Add,Blogthumbnail)=>{                                                          
         
         
         console.log(Add);
          const {Nameoftheauthor,Titleofblog}=Add
          const response = await fetch(url, {
            method: 'POST', 
           
            headers: {
              'Content-Type': 'application/json',
              "auth-token":localStorage.getItem('token')

            },
            body: JSON.stringify({Nameoftheauthor,Titleofblog,Blogthumbnail})
          });
            console.log("added"); 
            const json=await response.json();
        }
        const fetchNote=async ()=>{
                 
          const response = await fetch(`${url}/fetchdata`, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
              "auth-token":localStorage.getItem('token')
            },
          });
            console.log("fetch data");
            const json= await response.json(); 
            setNote(json);
            console.log(json);
        }
        const deleteNote=async (key)=>{
          const response = await fetch(`${url}/deletedata/${key}`, {
            method: 'DELETE', 
            headers: {
              'Content-Type': 'application/json',
              "auth-token":localStorage.getItem('token')

            },
          });
            console.log("data deleted");
            const json= await response.json();
            console.log(json);

            const NewNote=Note.filter((Note)=>{
              return key!==Note._id
            })
            setNote(NewNote);
            return json;
        }
        const addcontent=async (content,tag,file)=>{                                                          
           
           const {heading,subheading,quote,para}=content
           console.log(key_id);
           const response = await fetch(`${url}/addcontent/${localStorage.getItem('key_id')}`, {
             method: 'PUT', 
            
             headers: {
               'Content-Type': 'application/json',
               "auth-token":localStorage.getItem('token')
 
             },
             body: JSON.stringify({heading,subheading,quote,para,tag,file})
           });
             console.log("addedcontent"); 
             const json=await response.json();
         }
         const setkeyfunc=async(key)=>{
                  setKey_id(key);
                  return 0;
         }
         const contentfunc=async(contentfetch)=>{
          setcontent(contentfetch)
         }


    return(<MyContext.Provider value={{Note,key_id,setNote,addNote,fetchNote,deleteNote,setKey_id,addcontent,setkeyfunc,contentfunc,content1,setcontent}}>
           {props.children}
    </MyContext.Provider>);
}
export default Setstate;
