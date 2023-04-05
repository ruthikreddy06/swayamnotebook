import React from 'react'

function Contentitems(props) {
  return (
    <div>
   {(props.content.tagcontent==="heading")&&<div className='container'>
        <h1>{props.content.text}</h1>
    </div>}
    {(props.content.tagcontent==="image")&&<div className='container'>
    <img src={props.content.text.url} alt="Girl in a jacket" width="500" height="600"/>
    </div>}
    {(props.content.tagcontent==="subheading")&&<div className='container'>
        <h2>{props.content.text}</h2>
    </div>}
    {(props.content.tagcontent==="quote")&&<div className='container'>
        <h5>{props.content.text}</h5>
    </div>}
    {(props.content.tagcontent==="paragraph")&&<div className='container'>
        <p>{props.content.text}</p>
    </div>}

    </div>
  )
}

export default Contentitems