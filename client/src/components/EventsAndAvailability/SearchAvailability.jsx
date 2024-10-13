import React, { useState, useRef } from 'react';
import { Box, IconButton, TextField, Button, Popper, Paper, ClickAwayListener } from '@mui/material';
import { EventAvailableTwoTone, Search } from '@mui/icons-material';
import axios from 'axios';

const SearchAvailability = ({setResultAvailble,setShowAvailable,searchAvailable,setSearchAvailable,setShowCalendar}) => {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const handleChangeSearch = (event) => {
        const { name, value } = event.target;
        console.log('Input changed:', name, value);
        setSearchAvailable(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSearchAvailability = async()=>{
        try{
            // consider the api address is local...
            const response = await axios.post("https://e-calendar-cocq.vercel.app/events/availability",{
                username:searchAvailable.username,
                from:searchAvailable.fromDate,
                to:searchAvailable.toDate
            })
            setResultAvailble(response.data.events)
            setShowCalendar(false)
            setShowAvailable(true)

        }
        catch(error){
            console.error("Error fetching availability:", error);
        }
        
    }
    return (
        <Box sx={{ position: 'relative'}}>
            <IconButton 
                onClick={handleToggle} 
                ref={anchorRef}
                color="default"
            >
                <EventAvailableTwoTone sx={{ height: 32, width: 32 }} />
            </IconButton>
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                placement="left-start"
                disablePortal={false}
                modifiers={[
                    {
                        name: 'offset',
                        options: {
                            offset: [-25, 15],
                        },
                    },
                    {
                        name: 'preventOverflow',
                        enabled: true,
                        options: {
                            altAxis: true,
                            altBoundary: true,
                            tether: true,
                            rootBoundary: 'viewport',
                            padding: 8,
                        },
                    },
                ]}
                sx={{ 
                    zIndex: 1300, 
                    
                }}
            >
    
                <ClickAwayListener onClickAway={handleClose}>
                    <Paper elevation={3} sx={{ p:1, backgroundColor: '#febe00', mt:-1,height:"62px",width:"700px" }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <TextField
                                placeholder="Search title"
                                name='username'
                                variant="outlined"
                                value={searchAvailable.username}
                                onChange={handleChangeSearch}
                                size="small"
                                InputProps={{
                                    style: {
                                      backgroundColor: '#F5F5DC',
                                      fontSize: '1rem',
                                      height: '2rem',
                                    },}}
                                sx={{ width: 160 }}
                            />
                            <TextField
                                placeholder="Search title"
                                name='fromDate'
                                type="datetime-local"
                                value={searchAvailable.fromDate}
                                onChange={handleChangeSearch}
                                InputLabelProps={{ shrink: true }}
                                size="small"
                                InputProps={{
                                    style: {
                                      backgroundColor: '#F5F5DC',
                                      fontSize: '1rem',
                                      height: '2rem',
                                    },}}
                                sx={{ width: 210 }}
                            />
                            <TextField
                                placeholder="Search title"
                                name="toDate"
                                type="datetime-local"
                                value={searchAvailable.toDate}
                                onChange={handleChangeSearch}
                                InputLabelProps={{ shrink: true }}
                                size="small"
                                InputProps={{
                                    style: {
                                      backgroundColor: '#F5F5DC',
                                      fontSize: '1rem',
                                      height: '2rem',
                                    },}}
                                sx={{ width: 210 }}
                            />
                            <Button
                                variant="contained"
                                onClick={handleSearchAvailability}
                                size="small"
                                sx={{ minWidth: 40, width: 40, height: 40, p: 0, bgcolor:"#F5F5DC",
                                ":hover":{bgcolor:"#F5F5DC"}
                                }}
                            >
                                <Search sx={{ color: "#000" }}/>
                            </Button>
                        </Box>
                    </Paper>
                </ClickAwayListener>
                
            </Popper>
        </Box>
    );
};

export default SearchAvailability;