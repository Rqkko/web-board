import { useState, useRef, useEffect } from 'react'
import { Button, Typography, Avatar } from '@mui/material'
import IconButton from '@mui/material/IconButton';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';

import { api } from '../utils/api';

import PostTextField from 'components/PostTextField'
import RoomPicker from 'components/RoomPicker';

function Profile() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [room, setRoom] = useState<number | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  async function handleSubmit() {
    

    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    if (room !== null) {
        formData.append('room', room.toString());
    }
    if (image) { 
        formData.append('image', image); 
    }

    try {
      const response = await api.post(
        '/api/user/updateProfile',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        }
      );

      if (response.status === 200 || response.status === 201) {
        alert('Your infos updated successfully!');
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Error changing infos:', error);
      alert('Failed to changed personal infos. Please try again.');
    }
  }

  useEffect(() => {
    api.get('/api/user/getUsername', {
      withCredentials: true,
    })
      .then(response => response.data)
      .then(data => 
        setUsername(data.message))
      .catch((error) => {
        alert("Please login to see your Profile Data.");
        window.location.href = '/login';
      });
  }, []);

  useEffect(() => {
    api.get('/api/user/getEmail', {
      withCredentials: true,
    })
      .then(response => response.data)
      .then(data => 
        setEmail(data.message))
      .catch((error) => {
        alert("Could not load email. Please login again.");
        window.location.href = '/login';
      });
  }, []);
  


  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: '#FFFFFF',
        paddingBottom: '120px' // space for fixed button
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: '100px',
        }}
      >

        {/* Avatar */}
        <Avatar
             sx={{ width: 100, height: 100, mb: 2, fontSize: 18, bgcolor: '#ccc' }}
        >
      

      <div style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: '0px' }}>
          <Typography style={{ color: 'black', fontSize: '20px', fontWeight: 'bold', marginLeft: '25%', alignSelf: 'center' }}>
            Edit 
          </Typography>
          <IconButton onClick={() => fileInputRef.current?.click()}>
            <AddPhotoAlternateIcon style={{ fontSize: '32px' }} />
          </IconButton>
          {image && (
            <IconButton>
              <DeleteIcon
                style={{ fontSize: '32px', color: 'red' }}
                onClick={() => {
                  setImage(null);
                  if (fileInputRef.current) fileInputRef.current.value = '';
                }}
              />
            </IconButton>
          )}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleImageUpload}
          />
        </div>
  
        {image && (
          <div style={{
            marginTop: '16px',
            marginLeft: '25%',
            marginRight: '25%',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <img
              src={URL.createObjectURL(image)}
              alt="Selected"
              style={{
                width: '80%',
                height: 'auto',
                borderRadius: '8px',
                marginTop: '10px'
              }}
            />
          </div>
        )}

        </Avatar>
        
        
        <Typography style={{ color: 'black', fontSize: '40px', fontWeight: 'bold', marginBottom: '15px' }}>
          {username || 'Loading...'}
        </Typography>

        
  
        <Typography style={{ color: 'black', fontSize: '20px', fontWeight: 'bold', alignSelf: 'start', marginLeft: '25%', marginTop: '20px' }}>
          Username
        </Typography>
        <PostTextField
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
  
        <Typography style={{ color: 'black', fontSize: '20px', fontWeight: 'bold', alignSelf: 'start', marginLeft: '25%', marginTop: '24px' }}>
          E-Mail
        </Typography>
        <PostTextField
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          
        />
        {/* Delete Account */}
        <Typography
            style={{
            color: '#888',
            marginTop: '40px',
            marginBottom: '24px',
            cursor: 'pointer',
            }}
        >
            Delete Account
        </Typography>
        
      </div>

       
  
      {/* Fixed Bottom Button */}
      <Button
        variant="contained"
        style={{
          position: 'fixed',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#F08A5D',
          color: 'white',
          fontSize: '16px',
          fontWeight: 'bold',
          padding: '12px 24px',
          borderRadius: '20px',
          width: '90%',
          maxWidth: '360px',
          height: '40px',
          zIndex: 1000,
        }}
        onClick={handleSubmit}
      >
        Save
      </Button>
    </div>
  );
  
}

export default Profile