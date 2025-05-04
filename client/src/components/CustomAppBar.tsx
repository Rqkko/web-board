import { AppBar, Box, Toolbar, Button, IconButton, ButtonBase } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import orcaBoardLogo from '../assets/orcaBoard_logo_noText.png';
import orcaBoardText from '../assets/orcaBoard_logo_textOnly.png';

export default function CustomAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
        position="absolute"
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
          >
            <MenuIcon />
          </IconButton>
          
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