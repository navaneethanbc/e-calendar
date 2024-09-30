import React from 'react'
import axios from 'axios'

const ShowAvailability = ({username,isavailablefrom,isavailableto}) => {
  const available = async()=> {
    try{
        const response = await axios.get("http://localhost:8000/api/events/")
        const result = response.data
    }
    catch {
      
    }
  }
  return (
    <div>
      
      
    </div>
  )
}

export default ShowAvailability