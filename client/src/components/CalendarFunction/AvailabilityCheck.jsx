import { preventDefault } from '@fullcalendar/core/internal'
import React from 'react'
import { TextField } from '@mui/material'
import ShowAvailability from './ShowAvailability'
import axios from 'axios'
const AvailabilityCheck = ({username, setUserName, isavailablefrom, setIsAvailableFrom, isavailableto,   setIsAvailableTo }) => {
  return (
    <div>
        <form onSubmit={(e)=>{e.preventDefault()}}>
            <TextField 
                type='text'
                value={username}
                onChange={(e)=>{setUserName(e.target.value)}}
                placeholder='username'
                className=''
                />
            
            <TextField 
                type='Date'
                value={isavailablefrom}
                onChange={(e)=>{setIsAvailableFrom(e.target.value)}}
                placeholder='from'
                className=''
                />
            
            <TextField 
                type='Date'
                value={isavailableto}
                onChange={(e)=>{setIsAvailableTo(e.target.value)}}
                placeholder='to'
                className=''
                />
        </form>
        <ShowAvailability 
          username = {username}
          isavailablefrom = {isavailablefrom}
          isavailableto ={isavailableto}/>
    </div>
  )
}

export default AvailabilityCheck