// import { useState, useRef, useEffect } from 'react'
// import { Button, Typography, Avatar } from '@mui/material'
// import IconButton from '@mui/material/IconButton';
// import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
// import DeleteIcon from '@mui/icons-material/Delete';

// import { api } from '../utils/api';

// import PostTextField from 'components/PostTextField'
// import RoomPicker from 'components/RoomPicker';

// TODO Modify and Integrate this component
function Community() {
  // const [username, setUsername] = useState('');
  // const [email, setEmail] = useState('');
  // const [room, setRoom] = useState<number | null>(null);
  // const [image, setImage] = useState<File | null>(null);
  // const fileInputRef = useRef<HTMLInputElement>(null);

  // const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files && event.target.files[0]) {
  //     setImage(event.target.files[0]);
  //   }
  // };

  // async function handleSubmit() {
    

  //   const formData = new FormData();
  //   formData.append('username', username);
  //   formData.append('email', email);
  //   if (room !== null) {
  //       formData.append('room', room.toString());
  //   }
  //   if (image) { 
  //       formData.append('image', image); 
  //   }

  //   try {
  //     const response = await api.post(
  //       '/api/user/updateProfile',
  //       formData,
  //       {
  //         headers: { 'Content-Type': 'multipart/form-data' },
  //         withCredentials: true,
  //       }
  //     );

  //     if (response.status === 200 || response.status === 201) {
  //       alert('Your infos updated successfully!');
  //       window.location.href = '/';
  //     }
  //   } catch (error) {
  //     console.error('Error changing infos:', error);
  //     alert('Failed to changed personal infos. Please try again.');
  //   }
  // }

  // useEffect(() => {
  //   api.get('/api/user/getUsername', {
  //     withCredentials: true,
  //   })
  //     .then(response => response.data)
  //     .then(data => 
  //       setUsername(data.message))
  //     .catch((error) => {
  //       alert("Please login to see your Profile Data.");
  //       window.location.href = '/login';
  //     });
  // }, []);

  // useEffect(() => {
  //   api.get('/api/user/getEmail', {
  //     withCredentials: true,
  //   })
  //     .then(response => response.data)
  //     .then(data => 
  //       setEmail(data.message))
  //     .catch((error) => {
  //       alert("Could not load email. Please login again.");
  //       window.location.href = '/login';
  //     });
  // }, []);
  


  return (
    <div>Community Page in Construction...</div>
    // <div
    //   style={{
    //     position: 'relative',
    //     minHeight: '100vh',
    //     backgroundColor: '#FFFFFF',
    //     paddingBottom: '120px' // space for fixed button
    //   }}
    // >
    //   <div
    //     style={{
    //       display: 'flex',
    //       flexDirection: 'column',
    //       alignItems: 'center',
    //       paddingTop: '100px',
    //     }}
    //   >

    
        
        
    //     <Typography style={{ color: 'black', fontSize: '40px', fontWeight: 'Bold', marginBottom: '15px' }}>
    //       Hi {username || 'Loading...'}!
    //     </Typography>

    //     <Typography style={{ color: 'black', fontSize: '20px', fontWeight: 'lighter', marginBottom: '40px'}}>
    //       See if someone replied to you, reply now:
    //     </Typography>
        
  
    //     {[1, 2, 3].map((_, index) => (
    //     <div
    //         key={index}
    //         style={{
    //         width: '348px',
    //         height: '131px',
    //         backgroundColor: '#FFFFFF',
    //         borderRadius: '20px',
    //         boxShadow: '0px 20px 50px 0px rgba(70, 70, 70, 0.2)',
    //         padding: '16px',
    //         marginBottom: '20px',
    //         display: 'flex',
    //         flexDirection: 'column',
    //         justifyContent: 'space-between',
    //         }}
    //     >
    //         <Typography style={{ fontSize: '14px', fontWeight: 'bold', color: '#000' }}>
    //         Name, Role, Date, Headline of Reply
    //         </Typography>
    //         <Typography style={{ fontSize: '14px', color: '#000', margin: '8px 0' }}>
    //         Text of Reply
    //         </Typography>
    //         <Button variant="contained" style={{ alignSelf: 'flex-start', backgroundColor: '#6200ea' }}>
    //         Reply directly
    //         </Button>
    //     </div>
    //     ))}

        
    //   </div>
    // </div>
  );
  
}

export default Community