import React,{useState,useEffect} from 'react'
import { useHistory } from "react-router-dom";
import {useParams} from "react-router-dom";
import Navbar from './navbar/navbarLanding'
import axios from 'axios'
import './userLobby.css'

const UserLobby=()=>{
    let {uid,uname}=useParams()
    //state for the storage of the quiz collection
    const [quizData,setQuizData]=useState(null);
    //state for the storage of the 
    const [quizID,setQuizID]=useState("");

    //for the redirects- react-router-dom
    let history = useHistory();
    const redirect=(path)=>{
        history.push(path)
    }
    //submit handler for the quiz id
    const SubmitQuizID=()=>{
         // axios 
         let formData = {ID:quizID};    
         //header configuration for the CORS
         const config  = {
                 headers: {
                     'Content-Type': 'application/json',
                     'Access-Control-Allow-Origin':'*'
                 }}
        axios.post('https://quizzlerserver.herokuapp.com/privateQuizID',formData,config) 
        .then(function (response) {
            // console.log(response.data)
            let arrayModifier=[]
            arrayModifier.push(response.data)
            setQuizData(arrayModifier)
            setQuizID("")
        })
        .catch(function (error) {
            alert("Check your Network Connection and try agin.")
        });
    }

    //submit handler for the public quizzes
    const SubmitPublicQuizID=()=>{
        // axios 
        axios.get('https://quizzlerserver.herokuapp.com/publicQuizData')
          .then(function (response) {
            setQuizData(response.data)
            console.log(response.data)
          })
          .catch(function (error) {
            alert("Check your Network Connection and try agin.")
          })
   }

    return(
        <div>
        <div className="user-background"></div>
        <div className="container">
        
            <Navbar name={uname}/>
            <div className="row nav-padding">

                <div className="col-lg-4">
                    <div className="m-4">
                        <form className="card p-4 custom-findQuiz-bg">
                            <label className="text-secondary">Already received a Quiz ID!<br/> Enter it here.</label>
                            <input 
                                type="text" 
                                id="inputQuizID" 
                                className="form-control text-primary" 
                                placeholder="Quiz ID" 
                                value={quizID}
                                required 
                                onChange={(e)=>{
                                    setQuizID(e.target.value);
                                }}    
                            />
                            <button 
                                className="btn btn-lg btn-primary btn-block mt-3" 
                                onClick={(e)=>{
                                    e.preventDefault()
                                    if(quizID===""){
                                        alert("enter the ID to check")
                                    }else{
                                        SubmitQuizID()
                                    }
                                }}
                            >Find</button>
                        </form>
                        <p className="text-center my-4 text-muted">or</p>
                        <div className="card p-4 custom-background-1">
                        <h6 className="text-center text-muted">Attend from our wide range of public Quizzes.</h6>
                        <button 
                            className="btn btn-lg btn-outline-primary btn-block mt-3" 
                            onClick={(e)=>{
                                    e.preventDefault()                                  
                                    SubmitPublicQuizID()
                                    // console.log("params value "+uid+" "+uname)
                                }}
                            >Search Public Quizzes</button>
                        </div>
                    </div>
                </div>

                <div className="col-lg-8">
                    
                    {quizData && quizData.map((entry,index)=>{
                        return(
                            <div className="card py-2 px-4 my-4 custom-background-2" key={entry._id}>
                                <div className="row">
                                    <div className="col-md-8 pt-4">
                                        <h5 className="text-secondary">Quiz name: {entry.name}</h5>
                                        <h6 className="text-secondary">Realted to: {entry.relatedTo}</h6>
                                        <p className="text-primary">Created by: {entry.hostedBy}</p>
                                    </div>
                                    <div className="col-md-4">
                                    <button 
                                        className="btn btn-block btn-success mt-4"
                                        value={entry._id}
                                        onClick={(e)=>{
                                            //function to trigger to the next page with the corresponding ID
                                            redirect("/q/"+e.target.value+"/"+uid+"/"+uname)
                                        }}
                                    >START</button>
                                    {/* <p className="text-danger text-center">Already taken.</p> */}
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                </div>            
            </div>
        </div>
        </div>
    )
}
export default React.memo(UserLobby)