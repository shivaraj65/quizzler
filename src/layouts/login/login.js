import React,{useState} from 'react'
import GoogleLogin from 'react-google-login'
import './login.css'
import logo from '../../assets/images/quizzler logo.png'
import Navbar from './navbar/navbarLanding'

const Login =()=>{
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [userType, setUserType] = useState("USER")


    const responseGoogle = (response) => {
        console.log(response);
      }

    return(
        <div>
        <Navbar/>
        <div className="text-center" id="login">
            <form className="form-signin">
                <img className="mb-1" src={logo} alt="" width="120" height="60"/>
                <h1 className="h3 mb-3 font-weight-bold text-primary">LOGIN</h1>
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
                    }}
                    />
                <div className="form-group">
                <label className="sr-only">User Type</label>
                <select 
                    className="form-control text-primary" 
                    id="userType"
                    value={userType}
                    onChange={(e)=>{
                        setUserType(e.target.value)
                    }}
                    >
                    <option>USER</option>
                    <option>CREATOR</option>
                </select>
                </div>
                
                <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                <div className="mt-2"><a href="#" className="text-danger">forgot password</a></div>
                
                <hr/>
                <p className="text-secondary">or</p>
                <h6 className="text-secondary">Currently Google auth is for users only</h6>
                <GoogleLogin
                    clientId="987356181579-d89ri7e77o4373stfrjo4ie6o6lqgfpl.apps.googleusercontent.com"
                    buttonText="Login with Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
            </form>
        </div>
        </div>
    )
}
export default React.memo(Login)