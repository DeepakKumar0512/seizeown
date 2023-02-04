import React, { useState } from "react";
import NoteContext from "./noteContext";
// import { useNavigate } from "react-router-dom";

const NoteState = (props) => {
//   const host = "https://inotebook-etog.onrender.com"
  const host = "http://localhost:5000"
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(false)
//   let navigate = useNavigate();

  //GET all vehicles
  const getVehicle = async () => {
    //API call 
    const response = await fetch(`${host}/api/vehicles/getallvehicles`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // 'auth-token': localStorage.getItem('token')
      },
    });
    const json =await response.json()
    if(response.status===500){
      alert("Server Error || Please try after some time")
    //   navigate("/");
    }
    else{
      setVehicles(json)
      setLoading(true)
    }
  }
    //Add a vehicles
  const addVehicle = async (title, description,image) => {
      //To do Api call
      //API call        
    const response = await fetch(`${host}api/vehicles`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
        //   'auth-token': localStorage.getItem('token')
        },
      body: JSON.stringify({ title, description,image })
      });
      const note =await response.json()
      if(response.status===500){
        alert("Server Error || Please try after some time")
        // navigate("/");
      }
      else{ 
        setVehicles({...vehicles,note})
      //Logic to add in client
        getVehicle()
      }
    }

    //Delete a Vehicles 
    const deleteVehicle =async (id) => {
       //API call 
      const response = await fetch(`${host}/api/vehicles/deletevehicles/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        //   'auth-token': localStorage.getItem('token')
        },
      });
      const json =await response.json();
      if(json.status===401){
        alert("You are not allowed")
        // navigate("/");
      }
      else if(json.status===500){
        alert("Server Error || Please try after some time")
        // navigate("/")
      }  
      else{
        const newNotes = vehicles.filter((note) => { return note._id !== id })
        setVehicles(newNotes)
      }
    }

    //Edit a Note
    const editVehicle = async (id, title, description) => {
      //API call        
      const response = await fetch(`${host}/api/vehicles/updatevehicles/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        //   'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description })
      });
      const json =await response.json();
      if(json.status===401){
        alert("You are not allowed")
        // navigate("/");
      }
      else if(json.status===500){
        alert("Server Error || Please try after some time")
        // navigate("/")
      }  
      else{
      //Logic to edit in client
      getVehicle()
      }
    }
    return (
        <NoteContext.Provider value={{vehicles,addVehicle, deleteVehicle, editVehicle,getVehicle,loading }}>
          {props.children}
        </NoteContext.Provider>
      )
    }  
    export default NoteState;