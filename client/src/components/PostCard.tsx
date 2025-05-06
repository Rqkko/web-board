import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Post.module.css';
import { api } from 'utils/api';

type PostProps = {
  id: string;
  username: string;
  profilePic: string;
  roomId: number;
  title: string;
  description: string;
  image: string | null;
};

const Post: React.FC<PostProps> = ({ id, username, profilePic, roomId, title, description, image }) => {
  const navigate = useNavigate();
  const [room, setRoom] = useState('');

  const handleClick = () => {
    navigate(`/posts/${id}`);
  };

  useEffect(() => {
    api.get(`/api/room/${roomId}`)
      .then((response) => {
        setRoom(response.data.data.title);
      })
      .catch((error) => {
        console.error('Error fetching room data:', error);
      });
  })

  return (
    <div className={styles.postContainer} onClick={handleClick}>
      <div className={styles.header}>
        <img src={profilePic} alt={`${username}'s profile`} className={styles.profilePic} />
        <span className={styles.username}>{username}</span>
        <div className={styles.room}>{room}</div>
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      {image && (
        <img src={image} alt="Post" className={styles.postImage} />
      )}
    </div>
  );
};

export default Post;
