import React from 'react'

const Creator =()=>{
    return(
        <section className="bg-primary  page-section" id="creator">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-8 text-center">
                    <h2 className="text-white-75 mt-4">The A-Team of this project</h2>
                    {/* <h6 className="text-white mt-0">by</h6> */}
                    <hr className="divider light my-4" />
                    <h5 className="text-white-50 mb-2">SHIVARAJ SHANKAR</h5>
                    <h5 className="text-white-50 mb-4 pb-2">SVS College of Engineering</h5>
                    <h6 className="text-white-50 mb-2">Get out of the console.log or printf or system.out ... they were just used for Debugging.</h6>
                    <h6 className="text-white-50 mb-4">Build projects and learn from it rather than wasting hours and hours on Competitive programming </h6>
                    {/* <a className="btn btn-light btn-xl js-scroll-trigger" href="#services">Get Started!</a> */}
                </div>
            </div>
        </div>
        </section>
    )
}
export default React.memo(Creator)