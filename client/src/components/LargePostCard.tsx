import React, { useEffect } from 'react'
import styles from '../styles/PostDetail.module.css';
import { api } from 'utils/api';

type LargePostCardProps = {
  id: string;
  username: string;
  profilePic: string;
  roomId: number;
  title: string;
  content: string;
  image: string | null;
};

const LargePostCard: React.FC<LargePostCardProps> = ({ id, username, profilePic, roomId, title, content, image }) => {
  const [room, setRoom] = React.useState('');

    useEffect(() => {
      api.get(`/api/room/${roomId}`)
        .then((response) => {
          setRoom(response.data.data.title);
        })
        .catch((error) => {
          console.error('Error fetching room data:', error);
        });
    }, [roomId])

  return (
    <>
      <div className={styles.header}>
        <img src={profilePic} alt={username} className={styles.avatar} />
        <span className={styles.username}>{username}</span>
        <div className={styles.room}>{room}</div>
      </div>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{content}</p>
      {image && (
        <img src={image} alt="Post visual" className={styles.image} />
      )}
    </>
  )
}

export default LargePostCard;