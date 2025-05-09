import { useState, useRef, useEffect } from 'react'
import { Button, Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';

import { api } from '../utils/api';
import PostTextField from 'components/PostTextField'
import RoomPicker from 'components/RoomPicker';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [room, setRoom] = useState<number | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  async function handleSubmit() {
    setButtonDisabled(true);
    if (!title || room === null) {
      alert('Please fill in title and select a room.');
      setButtonDisabled(false);
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    if (content) { formData.append('content', content); }
    formData.append('room_id', room.toString());
    if (image) { formData.append('image', image); }

    try {
      const response = await api.post(
        '/api/post/createPost',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        }
      );

      if (response.status === 200 || response.status === 201) {
        alert('Post created successfully!');
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post. Please try again.');
      setButtonDisabled(false);
    }
  }

  useEffect(() => {
    api.get('/api/user/getUsername', {
      withCredentials: true,
    })
      .then(response => response.data)
      .catch((error) => {
        alert("Please login to create a post.");
        window.location.href = '/login?redirect=/create-post';
      });
  });

  return (
    <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      paddingTop: '100px',
      minHeight: '100vh'
    }}
    >
      <Typography style={{ color: 'black', fontSize: '40px', fontWeight: 'bold', marginBottom: '15px' }}>What's on your mind?</Typography>
      
      <Typography style={{ color: 'black', fontSize: '20px', fontWeight: 'bold', alignSelf: 'start', marginLeft: '25%', marginTop: '20px' }}>Title</Typography>
      <PostTextField
        type="text"
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setTitle(e.target.value)}}
      />

      <Typography style={{ color: 'black', fontSize: '20px', fontWeight: 'bold', alignSelf: 'start', marginLeft: '25%', marginTop: '24px' }}>Content</Typography>
      <PostTextField
        type="text"
        value={content}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setContent(e.target.value)}}
        multiline={true}
      />

      <Typography style={{ color: 'black', fontSize: '20px', fontWeight: 'bold', alignSelf: 'start', marginLeft: '25%', marginTop: '24px', marginBottom: '24px' }}>Room</Typography>
      <RoomPicker 
        selectedRoom={room}
        setSelectedRoom={setRoom}
      />

      <div style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: '40px' }}>
        <Typography style={{ color: 'black', fontSize: '20px', fontWeight: 'bold', marginLeft: '25%', alignSelf: 'center' }}>Image</Typography>
        <IconButton 
          style={{ display: 'flex', flexDirection: 'row' }}
          onClick={() => fileInputRef.current?.click()}
        >
          <AddPhotoAlternateIcon style={{ fontSize: '32px' }} />
        </IconButton>
        {image && (
          <IconButton>
            <DeleteIcon
              style={{ fontSize: '32px', color: 'red' }}
              onClick={() => {
                setImage(null);
                if (fileInputRef.current) {
                  fileInputRef.current.value = '';
                }
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
        <div style={{ marginTop: '16px', marginLeft: '25%', marginRight: '25%', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
          <img
            src={URL.createObjectURL(image)}
            alt="Selected"
            style={{ width: '80%', height: 'auto', borderRadius: '8px', marginTop: '10px' }}
          />
        </div>
      )}

      <Button
        variant="contained"
        sx={{
          backgroundColor: '#F08A5D',
          color: 'white',
          fontSize: '16px',
          fontWeight: 'bold',
          marginTop: '32px',
          padding: '10px 20px',
          marginBottom: '50px',
          '&:disabled': {
            color: 'white',
            backgroundColor: '#F08A5D',
            opacity: 0.5,
          },
        }}
        onClick={handleSubmit}
        disabled={buttonDisabled}
      >
        Create Post
      </Button>
    </div>
  )
}

export default CreatePost
