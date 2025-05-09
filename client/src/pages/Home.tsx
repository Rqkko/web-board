import { useEffect, useState } from 'react';

import { api } from 'utils/api';
import RoomPicker from 'components/RoomPicker';
import styles from '../styles/Home.module.css';
import PostCard from '../components/PostCard'; 
import profilePicture from '../assets/profilePicture.png';
import Loader from 'components/Loader';
import { Typography } from '@mui/material';

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

const Home = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [room, setRoom] = useState<number | null>(null);
  const [search, setSearch] = useState<string>('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    api.get('/api/post')
      .then(response => {
        setPosts(response.data.data);
        setIsLoading(false)
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
        setIsLoading(false);
      });

    api.get('/api/user/getUsername',
      { withCredentials: true, }
    )
      .then(response => {
        setUsername(response.data.message);
      })
      .catch(error => {
        console.error('Error fetching username:', error);
        setUsername('Guest');
      });
  }, [])

  const filteredPosts = posts.filter(post => {
    console.log('Post:', post);
    const matchesRoom = room === null || post.room_id === room;
    const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) || 
    post.content?.toLowerCase().includes(search.toLowerCase());
    return matchesRoom && matchesSearch;
  });

  return (
    <div className={styles.container}>

      {/* Greeting section */}
      <div className={styles.secondPanel}>
        <div className={styles.greeting}>
          {username ? (
            <h2>Hi {username}!</h2>
          ) : (
            <h2>Hi there!</h2>
          )}
          <p>What do you want to do today?</p>
        </div>
      </div>
        
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
      {isLoading ? (
        <div style={{ marginTop: '40px' }}>
          <Loader />
        </div>
      ) : filteredPosts.length === 0 ? (
        <Typography sx={{ justifySelf: 'center', marginTop: '40px' }} variant="h5">
          Posts not found
        </Typography>
      ) : (
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
              />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default Home;
