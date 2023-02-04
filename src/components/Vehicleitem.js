import { style } from '@mui/system';
import React,{useContext,useState,useRef} from 'react'
import { useLocation } from "react-router-dom";
import noteContext from '../context/vehicle/noteContext'

export const Vehicleitem = (props) => {
    const context = useContext(noteContext)
    const {deleteVehicle,editVehicle} = context
    let location=useLocation(); 
    // const ref = useRef()
    // const refClose = useRef()
    const [vehicle_up, setvehicle] = useState({id:"",etitle:"",edescription:""})

    const handlebuy=async(e)=>{
        e.preventDefault()
        if(localStorage.getItem('token')){
            alert("Order Placed")
        }
        else{
            alert("Please Login or SignUp First")
            console.log(location.pathname)
        }
    }
    const {vehicle,img}=props
    // const updateVehicle =(currentvehicle)=>{
    //   alert("please try again later")
    //     // ref.current.click()
    //     // console.log("kjj")
    //     setvehicle({id:currentvehicle._id,etitle:currentvehicle.title,edescription:currentvehicle.description})
    //   }

    // const handleClick =()=>{
    //     // console.log("editing the Note")
    //     alert("please try agaun later");
    //     // editVehicle(vehicle_up.id,vehicle_up.etitle,vehicle_up.edescription)
    //     // refClose.current.click()
    //   }
      let handleUpdate = ()=>{
        alert('please try again later');
      }

    const onChange=(e)=>{
        setvehicle({...vehicle_up,[e.target.name]:e.target.value})
      }
    const handlenewup=()=>{
      alert("Please try after some time.")
    }  
    const styles = {
      border: '5px solid #1ca0a4', 
 };
    

  return (
    
    <div className='col-md-3'>
        {/* Modal for edit note */}
      <button  type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Launch demo modal
      </button> 
      <div className="modal fade" id="exampleModal"  tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <form>
            <div className="mb-3">
                <label htmlFor="etitle" className="form-label">Title</label>
                <input type="text" className="form-control" id="etitle" name='etitle' value={vehicle_up.etitle} onChange={onChange} minLength={5} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="edescription" className="form-label">Description</label>
                <input type="text" className="form-control" id="edescription" name='edescription'  value={vehicle_up.edescription} onChange={onChange}  minLength={5} required/>
            </div>
            </form>
            </div>
            <div className="modal-footer">
              {/* <button  ref ={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
              <button  type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={vehicle_up.etitle.length<5 || vehicle_up.edescription.length<5 } type="button" className="btn btn-primary" onClick={handleUpdate}>Update Vehicle</button>
            </div>
          </div>
        </div>
      </div>

    <div className="card my-2 mx-2 " style={styles}>
      <div className="card-body">
          <img src={img} className="card-img-top img-fluid" ></img>
          <h5 className="card-title">{vehicle.title}</h5>
          <p className="card-text">Price:{vehicle.description}</p>
          {localStorage.getItem('admin') || location.pathname==="/admin" ?<div className="card-body">
          <button  className="btn btn-primary mx-2" onClick={handlenewup} >Update</button>
          <button  className="btn btn-primary" onClick={()=>{deleteVehicle(vehicle._id)}} >Delete</button></div>:<button onClick={handlebuy} className="btn btn-primary" >Buy Now</button>}
      </div>
      </div>
  </div>
  )
}
export default Vehicleitem