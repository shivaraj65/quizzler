import React from 'react'
import { useHistory } from "react-router-dom";
import './mastheader.css'

const MastHeader=()=>{
    let history = useHistory();
    const redirect=(path)=>{
        history.push(path)
    }
    return(
    <header className="masthead">
        <div className="container h-100">
            <div className="row h-100 align-items-center justify-content-center text-center">
                <div className="col-lg-10 align-self-end">
                    <h1 className="text-uppercase text-white font-weight-bold">Quizzler</h1>
                    <hr className="divider my-4" />
                </div>
                <div className="col-lg-8 align-self-baseline">
                    <p className="text-white font-weight-light mb-5">Welcome to the World of Quizzes.</p>
                    {/* <br/>Compete across various Quizzes or Host your own Quizzes. */}
                    <h4 className="text-white-50 font-weight-light mb-5">Join with us</h4>
                    <button 
                        className="btn btn-outline-success btn-xl loginbutton-user" 
                        onClick={()=>{
                            redirect("/user-signup");
                        }}
                        >User</button>
                    {/* <p className="text-white-50 font-weight-light mb-5">or</p> */}
                    <button 
                        className="btn btn-outline-primary btn-xl loginbutton-creator" 
                        onClick={()=>{
                            redirect("/creator-signup")
                        }}
                        >Creator</button>
                    <p className="text-white font-weight-light mt-5">Already have an Account 
                        <button 
                            className="btn btn-primary btn-sm loginbutton"
                            onClick={()=>{
                                redirect("/login")
                            }}    
                        >login</button>
                    </p>
                </div>
            </div>
        </div>
    </header>
    )
}
export default React.memo(MastHeader)