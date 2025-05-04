import { AppBar, Box, Toolbar, Button, IconButton, ButtonBase, Menu } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useRef, useState } from 'react';

import orcaBoardLogo from '../assets/orcaBoard_logo_noText.png';
import orcaBoardText from '../assets/orcaBoard_logo_textOnly.png';

export default function CustomAppBar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const appBarRef = useRef<HTMLElement | null>(null);

  function handleMenuOpen() {
    setIsMenuOpen(true);
  }
  function handleMenuClose() {
    setIsMenuOpen(false);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
        position="absolute"
        ref={appBarRef}
        style={{
          marginTop: '20px',
          marginRight: '2.5%',
          borderRadius: '8px',
          width: '95%',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
          backgroundColor: '#FFFFFF',
      }}>
        <Toolbar>
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
            Test
          </Menu>
          
          <div style={{ 
            flexGrow: 1,
            justifyContent: 'center',
            justifyItems: 'center',
            alignItems: 'center',
            display: 'flex'
            }}
          >
            <ButtonBase
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.05)',
                  borderRadius: '8px',
                  padding: '5px',
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
          </div>
          <Button sx={{ color: "#000" }}>Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}