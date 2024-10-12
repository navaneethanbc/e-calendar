import React from 'react'
import ShowEvents from './ShowEvents'
import ShowAvailability from './ShowAvailability'
import{Box,Button} from "@mui/material"

const ShowSearchResult = ({ resultEvents, setShowCalendar,setSearchOpen,setSearchEvent,resultAvailable,showAvailable,setShowAvailable,setSearchAvailable,searchAvailable }) => {

    const handleGoToCalendar = ()=>{
        setShowCalendar(true)
        setSearchOpen(false)
        setShowAvailable(false)
        setSearchEvent({
          username:"",
          title:"",
          from:"",
          to:"",
          category:"",
        })
        setSearchAvailable({
          username:"",
          fromDate:"",
          toDate:""
        })
    
      }
  return (
    <div>
        {showAvailable ?(
          <ShowAvailability 
          resultAvailable={resultAvailable}
          searchAvailable={searchAvailable}/>):(
        <ShowEvents 
        resultEvents ={resultEvents}
        />
      )}
      <Box
      sx={{position:"fixed",bottom:"3rem", right:"3rem"}}>
        <Button 
          variant="contained"
          align="right" 
          onClick={handleGoToCalendar}
          sx={{ mt: 2 , bgcolor: "#fea500", color:"black", ":hover":{bgcolor: "#feba00", color:"black"}, fontFamily:"arial"}}
        >
          go To Calendar
        </Button>
      </Box>
    </div>
  )
}

export default ShowSearchResult