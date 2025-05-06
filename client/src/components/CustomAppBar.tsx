import { AppBar, Box, Toolbar, Button, IconButton, ButtonBase, Menu, MenuItem, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';

import orcaBoardLogo from '../assets/orcaBoard_logo_noText.png';
import orcaBoardText from '../assets/orcaBoard_logo_textOnly.png';
import { api } from 'utils/api';

const menuItems = [
  { text: 'Home', icon: HomeIcon, link: '/' },
  { text: 'Create Post', icon: PostAddIcon, link: '/create-post' },
  { text: 'Community', icon: GroupsIcon, link: '/community' },
  { text: 'Profile', icon: AccountCircleIcon, link: '/profile' },
  { text: 'Logout', icon: LogoutIcon, link: '/logout' },
  
]

export default function CustomAppBar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const appBarRef = useRef<HTMLElement | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  function handleMenuOpen() {
    setIsMenuOpen(true);
  }

  function handleMenuClose() {
    setIsMenuOpen(false);
  }

  useEffect(() => {
    api.get('/api/user/getUsername', {
      withCredentials: true,
    })
      .then((response) => { setUsername(response.data.message); })
      .catch((error) => {
        console.error('User not logged in', error);
      });
  }, [])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
        position="fixed"
        ref={appBarRef}
        style={{
          marginTop: '20px',
          marginRight: '2.5%',
          borderRadius: '8px',
          width: '95%',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
          backgroundColor: '#FFFFFF',
        }}
      >
        <Toolbar sx= {{ display: 'flex', justifyContent: 'space-between' }}>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2, color: "#000" }}
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            sx={{ mt: '20px' }}
            anchorEl={appBarRef.current}
            keepMounted
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
          >
            {menuItems.map((item) => (
              <MenuItem 
                key={item.text}
                onClick={() => {window.location.href=item.link}}
                sx={{ display: 'flex', justifyContent: 'start' }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#000',
                    fontSize: 24,
                  }}
                >
                  <item.icon />
                </Box>
                <Typography
                  variant="body1"
                  sx={{
                    marginLeft: 2,
                    color: '#000',
                    fontSize: 16,
                  }}
                >
                  {item.text}
                </Typography>
              </MenuItem>
            ))}
          </Menu>
          
          <Box sx={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
          }}>
            <ButtonBase
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.05)',
                  borderRadius: '8px',
                  padding: '5px',
                  position: 'absolute',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  alignItems: 'center',
                }
              }}
              onClick={() => {
                window.location.href = '/';
              }}
            >
              <Box
                component="img"
                src={orcaBoardText}
                alt="OrcaBoard Logo"
                sx={{
                  maxHeight: 40,
                  backgroundColor: 'transparent',
                  marginRight: '10px',
                }}
              />
              <Box
                component="img"
                src={orcaBoardLogo}
                alt="OrcaBoard Logo"
                sx={{
                  maxHeight: 40,
                  backgroundColor: 'transparent',
                }}
              />
            </ButtonBase>
          </Box>

          {username ? (
            <>
              <Typography
                variant="body1"
                sx={{
                  color: '#000',
                  fontSize: 16,
                  marginLeft: 'auto',
                  marginRight: '6px',
                }}
              >
                {username}
              </Typography>
              <Box sx={{ color: '#000' }} >
                  <PersonIcon />
              </Box>
            </>
          ) :
            <Button
              sx={{ color: "#000" }}
              onClick={() => {window.location.href='/login'}}
            >
              Login
            </Button>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}