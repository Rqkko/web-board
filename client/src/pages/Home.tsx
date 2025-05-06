import { useState } from 'react';
import RoomPicker from 'components/RoomPicker';
import styles from '../styles/Dashboard.module.css';
import PostCard from '../components/PostCard'; 

import avatarImg from '../assets/Sara.jpg';
import alicePic from '../assets/alice.jpg';
import bobPic from '../assets/bob.jpg';
import mountainImg from '../assets/mountain.jpg';
import reactImg from '../assets/reactcode.jpg';

const samplePosts = [
  {
    id: '1',
    username: 'alice',
    profilePic: alicePic,
    title: 'Beautiful View',
    description: 'I went hiking and saw this amazing view!',
    image: mountainImg,
  },
  {
    id: '2',
    username: 'bob123',
    profilePic: bobPic,
    title: 'Why React is Awesome',
    description: 'Hooks, JSX, and components are just 🤯',
    image: reactImg,
  },
];

const Home = () => {
  const [room, setRoom] = useState<number | null>(null);

  return (
    <div className={styles.container}>

      {/* Greeting section */}
      <div className={styles.secondPanel}>
        <div className={styles.greeting}>
          <h2>Hi Sara!</h2>
          <p>What do you want to do today?</p>
        </div>
        <div className={styles.avatarContainer}>
          <img className={styles.avatar} src={avatarImg} alt="Sara" />
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
          {samplePosts.map(post => (
            <PostCard key={post.id} {...post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
