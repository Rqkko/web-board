import { useEffect, useState } from 'react';
import { api } from 'utils/api';
import RoomPicker from 'components/RoomPicker';
import styles from '../styles/Dashboard.module.css';
import PostCard from '../components/PostCard'; 

import profilePicture from '../assets/profilePicture.jpg';

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
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    api.get('/api/post')
      .then(response => {
        setPosts(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
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
  })

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
        <div className={styles.avatarContainer}>
          <img className={styles.avatar} src={profilePicture} alt="Sara" />
        </div>
      </div>

      <input type="text" placeholder="Search..." className={styles.search} />

      {/* Rooms section */}
      <RoomPicker
        selectedRoom={room}
        setSelectedRoom={setRoom} 
      />
      {room}

      {/* Posts section */}
      <div className={styles.postWrapper}>
        <h2 className={styles.postTitle}>Posts in knowledge Room</h2>
        <div style={{ padding: '20px', marginTop: '60px' }}>
          {posts.map(post => (
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
    </div>
  );
};


export default Home;
