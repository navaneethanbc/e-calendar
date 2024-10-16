import React from "react";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";

const ShowEvents = ({ resultEvents }) => {
  return (
    <div>
      <Box sx={{ p: 3, bgcolor: "#F5F5DC", height: "100vh", overflow: "auto" }}>
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          fontFamily={"kanit"}
        >
          Events
        </Typography>
        {resultEvents.length > 0 ? (
          <Grid container spacing={2}>
            {resultEvents.map((event) => (
              <Grid item xs={12} sm={6} md={4} key={event._id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom fontFamily={"kanit"}>
                      {event.title}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Category:</strong> {event.category}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Starts:</strong>{" "}
                      {new Date(event.starts_at).toLocaleString()}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Ends:</strong>{" "}
                      {new Date(event.ends_at).toLocaleString()}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Owner:</strong> {event.owner}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Description:</strong> {event.description}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Meeting_Link:</strong> {event.meeting_link}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Location:</strong> {event.location}
                    </Typography>
                    <Typography>
                      <strong>Guests:</strong> {event.guests}
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
    </div>
  );
};

export default ShowEvents;
