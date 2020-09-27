import React,{useState} from 'react'
import GoogleLogin from 'react-google-login'
import logo from '../../assets/images/quizzler logo.png'
import Navbar from './navbar/navbarLanding'

const SignupUser=()=>{
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [passwordTest, setpasswordTest] = useState(null)

    
    const passwordTestfunc=(data)=>{
        if(!data.match(/[a-z]/g)){
            setpasswordTest(false)
          document.getElementById("password-validation-text").innerHTML = "you must use a small letter"; 
        //   console.log("has no small letters");
        }else if(!data.match(/[A-Z]/g)){
            setpasswordTest(false)
          document.getElementById("password-validation-text").innerHTML = "you must use a capital letter"; 
        //   console.log("has no cap letters")
        } else if(!data.match(/[0-9]/g)){
            setpasswordTest(false)
          document.getElementById("password-validation-text").innerHTML = "you must use a number"; 
        //   console.log("has no a number")
        }else if(!(data.length >= 8)){
            setpasswordTest(false)
          document.getElementById("password-validation-text").innerHTML = "minimum password lenght must be 8"; 
        //   console.log("has no 8 digits")
        }else{
            setpasswordTest(true)
        //   console.log("good password")
          document.getElementById("password-validation-text").innerHTML = ""; 
        }
      }

    const responseGoogle = (response) => {
        console.log(response);
      }
      
    return(
        <div>
            <Navbar/>
            <div className="text-center" id="login">
            <form className="form-signin">
                <img className="mb-3" src={logo} alt="" width="120" height="60"/>
                <h1 className="h3 mb-3 font-weight-bold text-primary">SIGNUP</h1>
                <label className="sr-only">Email address</label>
                <input 
                    type="email" 
                    id="inputEmail" 
                    className="form-control text-primary" 
                    placeholder="Email address" 
                    value={email}
                    required 
                    autoFocus
                    onChange={(e)=>{
                        setEmail(e.target.value)
                    }}    
                    />
                <label className="sr-only">Password</label>
                <input 
                    type="password" 
                    id="inputPassword" 
                    className="form-control text-primary" 
                    placeholder="Password" 
                    value={password}
                    required
                    onChange={(e)=>{
                        setPassword(e.target.value);
                        passwordTestfunc(e.target.value);
                    }}
                    />
                
                <p id="password-validation-text" className="text-danger"></p>
                <button 
                    className="btn btn-lg btn-primary btn-block" 
                    type="submit"
                    onClick={()=>{

                    }}
                >Sign up</button>
                {/* <div className="mt-2"><a href="#" className="text-danger">forgot password</a></div> */}
                
                <hr/>
                <p className="text-secondary">or</p>
                <GoogleLogin
                    clientId="987356181579-d89ri7e77o4373stfrjo4ie6o6lqgfpl.apps.googleusercontent.com"
                    buttonText="Signup with Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
                <p className=" mt-4 text-warning">we will send a verification mail to authenticate that it is you.</p>
            </form>
        </div>
        </div>
    )
}
export default React.memo(SignupUser);