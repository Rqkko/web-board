import { Button, Typography } from '@mui/material'
import PostTextField from 'components/PostTextField'
import RoomPicker from 'components/RoomPicker';
import { useState } from 'react'

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [room, setRoom] = useState<number | null>(null);

  return (
    <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#FFFFFF',
      paddingTop: '100px',
    }}
    >
      <Typography style={{ color: 'black', fontSize: '50px', fontWeight: 'bold', marginBottom: '15px' }}>What's on your mind?</Typography>
      
      <Typography style={{ color: 'black', fontSize: '24px', fontWeight: 'bold', alignSelf: 'start', marginLeft: '25%', marginTop: '20px' }}>Title</Typography>
      <PostTextField
        type="text"
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setTitle(e.target.value)}}
      />

      <Typography style={{ color: 'black', fontSize: '24px', fontWeight: 'bold', alignSelf: 'start', marginLeft: '25%', marginTop: '40px' }}>Description</Typography>
      <PostTextField
        type="text"
        value={content}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setContent(e.target.value)}}
        multiline={true}
      />

      <Typography style={{ color: 'black', fontSize: '24px', fontWeight: 'bold', alignSelf: 'start', marginLeft: '25%', marginTop: '40px', marginBottom: '20px' }}>Room</Typography>
      <RoomPicker 
        selectedRoom={room}
        setSelectedRoom={setRoom}
      />

      <Button
        variant="contained"
        style={{
          backgroundColor: '#F08A5D',
          color: 'white',
          fontSize: '24px',
          fontWeight: 'bold',
          marginTop: '50px',
          padding: '10px 20px',
        }}
        onClick={() => {
          // TODO Handle post creation logic here
          console.log('Post created with title:', title, 'and content:', content, 'in room:', room);
        }}
      >
        Create Post
      </Button>
    </div>
  )
}

export default CreatePost