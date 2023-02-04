import React,{useState} from 'react';
import { useNavigate } from "react-router-dom";
import Cards from './Cards';
// import noteContext from '../context/vehicle/noteContext'


function Admin() {
  // const context = useContext(noteContext)
  // const {addVehicle} = context
  const [credentials, setCredentials] = useState({email:"",password:""})
  let navigate = useNavigate();
  const [vehicle, setVehicle] = useState({title:"",description:""})
  const handleSubmit=async(e)=>{
    e.preventDefault()
    const response = await fetch(" http://localhost:5000/api/admin/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        },
        body:JSON.stringify({email:credentials.email,password:credentials.password})
     })
     const json =await response.json()
     if(response.status===400){
       alert("Please try to login with correct credentials")
       navigate("/admin");
     }
     else if(response.status===500){
       alert("Server Error || Please try after some time")
       navigate("/admin");
     }
     else{
     setCredentials({email:"",password:""})
      //Save the auth token and redirect
     localStorage.setItem('admin',json)
     navigate("/admin");
     }
  }
  const handlelogout=(e)=>{
    e.preventDefault()
    localStorage.removeItem('admin')
    navigate("/")
    }
  const onChange =(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }
  const handleClick =(e)=>{
    e.preventDefault()
    // addVehicle(vehicle.title,vehicle.description)
    setVehicle({title:"",description:""})
    alert("Server error")
    //  addVehicle(vehicle.title,vehicle.description)
  }
  const adminonChange=(e)=>{
    setVehicle({...vehicle,[e.target.name]:e.target.value})
  }
  return (
    <>
    {!localStorage.getItem('admin')?
    <div className='container'>
       <h2 className='container text-center'>Admin Login Page</h2>
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
    </div>:
    // <div>
      <div>
        <div style={{backgroundColor:"#0c4d87"}}>
        <button onClick={handlelogout} className="btn btn-primary" >Logout</button>
        </div>
    
      <div className="admin_head">
        <h1 className="text-center heading"> Add Vehicles</h1>
        <form>
        <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name='title' value={vehicle.title} onChange={adminonChange}  minLength={5} required/>
        </div>
        <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name='description'  value={vehicle.description} onChange={adminonChange}  minLength={5} required/>
        </div>
        <button disabled={vehicle.title.length<5 || vehicle.description.length<5} type='submit' className='btn btn-primary' onClick={handleClick}>Add Vehicle</button>
        </form>
        </div>
      </div>
        

       }
      {localStorage.getItem('admin')?
      <Cards/>:""}
      
    </>
  );
}

export default Admin;
