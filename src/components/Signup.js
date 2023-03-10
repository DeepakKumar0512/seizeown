import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [credentials, setCredentials] = useState({name:"",email:"",password:"",cpassword:""})
  let navigate = useNavigate();

  const handleSubmit = async(e)=>{
    e.preventDefault()
    const {name,email,password} = credentials
    const response = await fetch(" http://localhost:5000/api/user/createuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({name,email,password})
     })
    const json =await response.json()
    if(response.status===400){
      alert("Sorry a user with this email already exists")
    }
    else if(response.status===500){
      alert("Server Error || Please try after some time")
      navigate("/signup");
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
       <h2 className='container text-center'>Signup Page</h2>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" name='name' value={credentials.name} onChange={onChange} aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp"/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onChange} />
        </div>
        <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="cpassword" name='cpassword'  value={credentials.cpassword} onChange={onChange} />
        </div>
        <button type="submit"  disabled={credentials.password!==credentials.cpassword} className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
