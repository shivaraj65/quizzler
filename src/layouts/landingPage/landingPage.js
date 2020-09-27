import React from 'react'
import './styles.css'

import Navbar from './sections/navbar/navbarLanding'
import MastHeader from './sections/masterHeader/mastheader'
import About from './sections/aboutSection/about'
import Service from './sections/servicess/service'
import Contact from './sections/contact/contact'
import Footer from './sections/footer/footer'

const LandingPage=()=>{
 return(
    <div id="page-top">
        <Navbar/>
        <MastHeader/>
        <About/>
        <Service/>
        <Contact/>
        <Footer/>
    </div>
 )   
}

export default React.memo(LandingPage)