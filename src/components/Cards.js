import React, { useContext, useEffect,useRef,useState } from 'react'
import noteContext from '../context/vehicle/noteContext'
import Vehicleitem from './Vehicleitem'
import { useNavigate } from "react-router-dom";
import car from "./images/car.jpg";

const Cards = () => {
  const context = useContext(noteContext)
  const { vehicles,loading,getVehicle } = context
  getVehicle()
  // let navigate = useNavigate();


  return (
    <div className='row' style={{backgroundColor:"#0c4d87"}}>
      <h2 style={{color:"white"}}>Vehicles</h2>
      {loading!==true?<div className="spinner-border text-primary" style={{marginLeft:"38%"}}  role="status">
        <span className="visually-hidden"  >Loading...</span>
      </div>:null}
     
      {
        (vehicles.length > 0 )
        ?
        vehicles.map((vehicle) => {
          return <Vehicleitem key={vehicle._id} vehicle={vehicle} img={car} />
        })
        :
        <div className='container'>
        No vehicles to display
        </div>
        }

    </div>
  )
}

export default Cards

