import React from 'react'
import HomePage from './main/page'
import Maintenance from './maintenance/page'
import Custom404 from './404/page'
import Roommain from './roommain/page'
import Room from './room/page'
import Hero from './hero/page.js'
import Landing from './landing/page.js'
import PrivacyPolicy from './privacypolicy/page.js'
import Snowfall from './Snowfall/page'
import Token from './tokenjoining/page.js'



const page = () => {
  return (
    <div>
    {/* 1st */}
      <HomePage/>

       {/* main room where interaction occur */}
      {/* <Room/>    */}
       {/* attach karna hai room ka sath is ka video portion ka view hai yeh */}
       {/* <Hero/> */}
 
  {/* for existing meeting */}
      {/* <Roommain/> */}
 

      {/* <Maintenance/> */}
      {/* <Custom404/> */}
     
   

{/* access permission for camera nd microphone  join a specified room or redirect to create a new room, and includes links to app info and social media */}

      {/* <Landing/> */}
      
      {/* <PrivacyPolicy/> */}

{/* not complete */}
      {/* <Snowfall/> */}


      {/* <Token/> */}
    </div>
  )
}

export default page
