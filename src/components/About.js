import React, { useContext } from 'react'
import MyContext from '../context/Createcontext';

function About() {
    const mycontext=useContext(MyContext);
    const {state}=mycontext;
  return (
     <div>
         <h1 className='about textcolor'>About us</h1>
         <div className='container'>
          <p className='texts'>
          On this website’s main page you will find everything lifestyle-related – fashion, food, beauty, home decor, and more.
         But it’s the About section that introduces you to the team that makes this website an endless source of inspiration.
         The page introduces founder Emily Schuman, as well as her blog, books, and fashion collection.

          Want to stay in touch?

          No problem – the page also features useful links to her social media pages, as well as her online shop.
          Their goal is to break the cycle of extreme poverty by empowering local artisans in Thailand to earn a stable income.

        The brand’s About Page is filled with uplifting stories of impeccable craftsmanship and tight-knit communities.

        As a result, it’s just as inspiring as their devotion to sustainable change.
          </p>
         </div>
     </div>
       
  )
}

export default About