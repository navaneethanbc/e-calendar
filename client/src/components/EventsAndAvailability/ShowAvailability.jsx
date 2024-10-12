import React from 'react';
import { Box, Paper, Typography, List, ListItem, Divider } from '@mui/material';

const ShowAvailability = ({ resultAvailable, searchAvailable }) => {
  return (
    <Box sx={{bgcolor:"#F5F5DC", overflow:"auto",height:"100vh"}}>
        <Box sx={{ maxWidth: 600, margin: '20px auto', padding: '20px' }}>
        <Typography variant="h5" align="center" gutterBottom>
            Availability Results
        </Typography>
        {resultAvailable.length > 0 ? (
            <List>
            {resultAvailable.map((event, index) => (
                <Paper
                key={index}
                elevation={3}
                sx={{ marginBottom: 2, padding: 2, backgroundColor: '#f9f9f9' }}
                >
                <ListItem sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <Typography variant="body1" color="textPrimary" gutterBottom>
                    <strong>Category:</strong> {event.category}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                    <strong>Starts At:</strong> {new Date(event.starts_at).toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                    <strong>Ends At:</strong> {new Date(event.ends_at).toLocaleString()}
                    </Typography>
                </ListItem>
                {index !== resultAvailable.length - 1 && <Divider />}
                </Paper>
            ))}
            </List>
        ) : (
            <Paper
            elevation={2}
            sx={{ padding: 3, marginTop: 3, backgroundColor: '#f0f0f0', textAlign: 'center' }}
            >
            <Typography variant="h6" color="textSecondary">
                {searchAvailable.username} is available from{' '}
                {new Date(searchAvailable.fromDate).toLocaleString()} to{' '}
                {new Date(searchAvailable.toDate).toLocaleString()}.
            </Typography>
            </Paper>
        )}
        </Box>
    </Box>
  );
};

export default ShowAvailability;
