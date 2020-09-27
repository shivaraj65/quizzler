import React from 'react'

const Navbar=()=>{
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-primary-custom fixed-top py-3" id="mainNav">
            <div className="container">
                <a className="navbar-brand  text-primary" href="#page-top">Quizzler</a>
                <button className="navbar-toggler navbar-toggler-right text-primary" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto my-2 my-lg-0">
                        <li className="nav-item"><a className="nav-link text-dark" href="#">Home</a></li>
                        {/* <li className="nav-item"><a className="nav-link text-dark" href="#services"></a></li> */}
                        <li className="nav-item"><a className="nav-link text-dark" href="#">Contact</a></li>
                        <li  className="nav-item"> <a className="nav-link text-success" href="#">Login</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default React.memo(Navbar);