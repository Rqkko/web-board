import { useState, useEffect, useCallback } from 'react'
import { Button, Typography, Avatar, Divider, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@mui/material'
// import IconButton from '@mui/material/IconButton';
// import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
// import DeleteIcon from '@mui/icons-material/Delete';

import { api } from '../utils/api';
import RoomPicker from 'components/RoomPicker'; 
import profilePicture from '../assets/profilePicture.jpg';
import styles from '../styles/Home.module.css';
import PostCard from 'components/PostCard';

interface Post {
  id: string;
  title: string;
  content: string;
  created_at: string;
  user_id: string;
  image: string | null;
  room_id: number;
  imageUrl: string | null;
  username: string;
}

function Profile() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [room, setRoom] = useState<number | null>(null);
  // const [image, setImage] = useState<File | null>(null);
  const [search, setSearch] = useState<string>('');
  // const fileInputRef = useRef<HTMLInputElement>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [open, setOpen] = useState(false);
  const [deletingPostTitle, setDeletingPostTitle] = useState<string>('');
  const [deletingPostId, setDeletingPostId] = useState<string>('');

  function handleDeletePopup(postId: string, title: string) {
    setDeletingPostTitle(title);
    setDeletingPostId(postId);
    setOpen(true);
  }

  function handleClose() {
    setDeletingPostTitle('');
    setDeletingPostId('');
    setOpen(false);
  }

  function handlePostDelete(postId: string, ) {
    api.delete(`/api/post/${postId}`, {
      withCredentials: true,
    })
      .then(_ => {
        alert("Post deleted successfully!");
        fetchUserPosts();
      })
      .catch(error => {
        alert('Error deleting post: ' + error);
      });

    handleClose();
  }

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

  const fetchUserPosts = useCallback(() => {
    api.get('/api/post/user', {
      withCredentials: true,
    })
      .then(response => {
        setPosts(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []);

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

    fetchUserPosts();
  }, [fetchUserPosts]);

  useEffect(() => {
    api.get(`/api/post/user`, {
      withCredentials: true,
    })
    .then(response => {
      setPosts(response.data.data);
    })
    .catch(error => {
      console.error('Error fetching posts:', error);
    });
  }, [])
  
  const filteredPosts = posts.filter(post => {
    console.log('Search:', search);
    const matchesRoom = room === null || post.room_id === room;
    const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) ||
                          post.content?.toLowerCase().includes(search.toLowerCase());
    return matchesRoom && matchesSearch;
  });

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        paddingBottom: '120px'
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
        <Typography
          style={{
            color: 'black',
            fontSize: '30px',
            fontWeight: 'bold',
            marginBottom: '15px',
          }}
        >
          Profile
        </Typography>

        {/* Avatar */}
        <Avatar
          sx={{ width: 80, height: 80, mb: 2, fontSize: 18, bgcolor: '#ccc' }}
          src={profilePicture}
        >
      {/* <div style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: '0px' }}>
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
        )} */}
        </Avatar>
        
        {/* <Typography style={{ color: 'black', fontSize: '30px', fontWeight: 'bold', marginBottom: '15px' }}>
          {username || 'Loading...'}
        </Typography> */}

        {/* <Typography style={{ color: 'black', fontSize: '20px', fontWeight: 'bold', alignSelf: 'start', marginLeft: '25%', marginTop: '20px' }}>
          Edit Username
        </Typography>
        <PostTextField
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
  
        <Typography style={{ color: 'black', fontSize: '20px', fontWeight: 'bold', alignSelf: 'start', marginLeft: '25%', marginTop: '24px' }}>
          Edit E-Mail
        </Typography>
        <PostTextField
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          
        /> */}

        <Typography style={{ color: 'black', fontSize: '20px', alignSelf: 'start', marginLeft: '25%', marginTop: '24px' }}>
          <span style={{ fontWeight: 'bold' }}>Username:</span> {username}
        </Typography>

        <Typography style={{ color: 'black', fontSize: '20px', alignSelf: 'start', marginLeft: '25%', marginTop: '24px', marginBottom: '24px' }}>
          <span style={{ fontWeight: 'bold' }}>Email:</span> {email}
        </Typography>

        {/* Delete Account */}
        {/* <Typography
            style={{
            color: '#888',
            marginTop: '40px',
            marginBottom: '24px',
            cursor: 'pointer',
            }}
        >
            Delete Account
        </Typography> */}
        
      </div>

      <Divider sx={{ marginX: '10%', marginY: '20px' }} />

      <Typography
          style={{
            color: 'black',
            fontSize: '30px',
            fontWeight: 'bold',
            marginBottom: '15px',
            justifySelf: 'center',
          }}
        >
          Your Posts
        </Typography>

      {/* Rooms section */}
      <RoomPicker
        selectedRoom={room}
        setSelectedRoom={setRoom} 
      />

      <div className={styles.searchContainer}>
        <input 
          type="text" 
          placeholder="Search..." 
          className={styles.search} 
          value={search} 
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button 
            className={styles.clearButton} 
            onClick={() => setSearch('')}
          >
            X
          </button>
        )}
      </div>

      {/* Posts section */}
      <div className={styles.postWrapper}>
        <div style={{ padding: '20px', marginTop: '20px' }}>
          {filteredPosts.map(post => (
            <PostCard
              key={post.id}
              id={post.id}
              username={post.username}
              profilePic={profilePicture}
              roomId={post.room_id}
              title={post.title}
              description={post.content}
              image={post.imageUrl}
              allowDelete
              onDelete={() => handleDeletePopup(post.id, post.title)}
            />
          ))}
        </div>
      </div>

      <Dialog
        open={open}
        // slots={{
        //   transition: Transition,
        // }}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Delete?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete post "{deletingPostTitle}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={() => handlePostDelete(deletingPostId)}>Yes</Button>
        </DialogActions>
      </Dialog>
  
      {/* Fixed Bottom Button */}
      {/* <Button
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
      </Button> */}
    </div>
  );
  
}

export default Profile