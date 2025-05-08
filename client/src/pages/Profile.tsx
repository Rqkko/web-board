import { useState, useEffect, useCallback } from 'react'
import { Button, Typography, Avatar, Divider, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@mui/material'

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
  const [search, setSearch] = useState<string>('');
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
    setOpen(false);
    setDeletingPostTitle('');
    setDeletingPostId('');
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
      .catch(() => {
        alert("Please login to see your Profile Data.");
        window.location.href = '/login';
      });

    api.get('/api/user/getEmail', {
      withCredentials: true,
    })
      .then(response => response.data)
      .then(data => 
        setEmail(data.message))
      .catch(() => {
        console.log("Error fetching email");
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
      
        </Avatar>

        <Typography style={{ color: 'black', fontSize: '20px', alignSelf: 'start', marginLeft: '25%', marginTop: '24px' }}>
          <span style={{ fontWeight: 'bold' }}>Username:</span> {username}
        </Typography>

        <Typography style={{ color: 'black', fontSize: '20px', alignSelf: 'start', marginLeft: '25%', marginTop: '24px', marginBottom: '24px' }}>
          <span style={{ fontWeight: 'bold' }}>Email:</span> {email}
        </Typography>
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
    </div>
  );
}

export default Profile
