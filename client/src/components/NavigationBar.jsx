import React from 'react'
import {AppBar,Toolbar,IconButton,Typography,InputBase,Box,Avatar,useMediaQuery} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import {styled,useTheme } from '@mui/material/styles'


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: 22,
    backgroundColor: '#e0e0e0',
    '&:hover': {
      backgroundColor: '#e0e0e0',
    },
    marginLeft: theme.spacing(2),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }))
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0.1, 1.2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }))
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }))
  
  function NavigationBar() {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
    return (
      <AppBar position="static" sx={{bgcolor: '#ffffff'}}>
        <Toolbar>
          <IconButton
            edge="start"
            color="#616161"
            aria-label="menu"
            sx={{ mr: 1.5 }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            component="img"
            src="src/assets/icon.png"
            alt="Logo"
            sx={{ height: 80, mr: 1, ml: -2.5 }}
          />
          <Typography
            variant="h4"
            component="div"
            sx={{ flexGrow: 1, fontFamily: 'Kanit', fontWeight: 'bold', color: '#212121', ml: -1, mb: -2, display: { xs: 'inline-block', sm: 'block' } }}
          >
            Calendar
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <IconButton sx={{ml: 2, mr: -2}}>
            <Avatar alt="N" src="/profile.jpg" />
          </IconButton>
        </Toolbar>
      </AppBar>
    )
  }
  
  export default NavigationBar