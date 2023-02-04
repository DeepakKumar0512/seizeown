import React,{useState} from 'react';
import { useNavigate } from "react-router-dom";

function Login() {
  const [credentials, setCredentials] = useState({email:"",password:""})
  let navigate = useNavigate();
  const handleSubmit=async(e)=>{
    e.preventDefault()
    const response = await fetch(" http://localhost:5000/api/user/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        },
        body:JSON.stringify({email:credentials.email,password:credentials.password})
     })
     const json =await response.json()
     if(response.status===400){
       alert("Please try to login with correct credentials")
       navigate("/login");
     }
     else if(response.status===500){
       alert("Server Error || Please try after some time")
       navigate("/login");
     }
     else{
     setCredentials({email:"",password:""})
         //Save the auth token and redirect
     localStorage.setItem('token',json)
     navigate("/");
     }
  }
  const onChange =(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }
  
  return (
    <div className='container'>
       <h2 className='container text-center'>Login Page</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp"/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onChange}/>
        </div>
        <button type="submit" className="btn btn-primary" disabled={credentials.email.length<5 || credentials.password.length<5}>Submit</button>
        </form>
    </div> 
  );
}

export default Login