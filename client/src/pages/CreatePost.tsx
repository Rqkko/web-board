import { Typography } from '@mui/material'
import PostTextField from 'components/PostTextField'
import { useState } from 'react'

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

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
      <Typography style={{ color: 'black', fontSize: '50px', fontWeight: 'bold', marginBottom: '20px' }}>What's on your mind?</Typography>
      
      <Typography style={{ color: 'black', fontSize: '24px', fontWeight: 'bold', alignSelf: 'start', marginLeft: '25%', marginTop: '20px' }}>Title</Typography>
      <PostTextField
        type="text"
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setTitle(e.target.value)}}
      />

      <Typography style={{ color: 'black', fontSize: '24px', fontWeight: 'bold', alignSelf: 'start', marginLeft: '25%', marginTop: '50px' }}>Description</Typography>
      <PostTextField
        type="text"
        value={content}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setContent(e.target.value)}}
        multiline={true}
      />
    </div>
  )
}

export default CreatePost