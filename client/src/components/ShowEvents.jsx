import React from 'react';
import { Button, Card, CardContent, Typography, Grid, Box } from '@mui/material';
import ShowAvailability from './ShowAvailability';

const ShowEvents = ({ resultEvents, setShowCalendar,setSearchOpen,setSearchEvent,resultAvailable,showAvailable,setShowAvailable,setSearchAvailable,searchAvailable }) => {

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
    <>
    {showAvailable ?(
      <ShowAvailability 
      resultAvailable={resultAvailable}
      searchAvailable={searchAvailable}/>
    ):(
      <Box sx={{ p: 3, bgcolor:"#F5F5DC", height:"100vh", overflow:"auto" }}>
      <Typography variant="h4" gutterBottom align='center' fontFamily={'kanit'}>
        Events
      </Typography>
      {resultEvents.length > 0 ? (
        <Grid container spacing={2} >
          {resultEvents.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event._id} >
              <Card >
                <CardContent >
                  <Typography variant="h6" gutterBottom fontFamily={'kanit'}>
                    {event.title}
                  </Typography>
                  <Typography variant="body2" >
                    <strong>Category:</strong> {event.category}
                  </Typography>
                  <Typography variant="body2" >
                    <strong>Starts:</strong> {new Date(event.starts_at).toLocaleString()}
                  </Typography>
                  <Typography variant="body2" >
                    <strong>Ends:</strong> {new Date(event.ends_at).toLocaleString()}
                  </Typography>
                  <Typography variant="body2" >
                    <strong>Owner:</strong> {event.owner}
                  </Typography>
                  <Typography variant="body2" >
                    <strong>Description:</strong> {event.description}
                  </Typography>
                  <Typography variant="body2" >
                    <strong>Meeting_Link:</strong> {event.meeting_link}
                  </Typography>
                  <Typography variant="body2" >
                    <strong>Location:</strong> {event.location}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h3">No events found.</Typography>
      )}

    </Box>
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
    </>
  );
};
export default ShowEvents;