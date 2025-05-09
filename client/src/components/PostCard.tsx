import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import styles from '../styles/Post.module.css';
import { api } from 'utils/api';
import defaultProfilePicture from '../assets/defaultProfilePicture.png';

type PostProps = {
  id: string;
  username: string;
  profilePicture: string | null;
  roomId: number;
  title: string;
  description: string;
  postImage: string | null;
  allowDelete?: boolean;
  onDelete?: () => void;
};

const Post: React.FC<PostProps> = ({ id, username, profilePicture, roomId, title, description, postImage, allowDelete, onDelete }) => {
  const navigate = useNavigate();
  const [room, setRoom] = useState('');

  const handleClick = () => {
    navigate(`/post/${id}`);
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
        <img src={profilePicture ? profilePicture : defaultProfilePicture} alt={`${username}'s profile`} className={styles.profilePic} />
        <span className={styles.username}>{username}</span>
        <div className={styles.room}>{room}</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', height: '50px' }}>
        <h3 className={styles.title}>{title}</h3>
        {allowDelete && (
          <IconButton
            sx={{ color: 'red' }}
            onClick={(e) => {
              e.stopPropagation();
              if (onDelete) {
                onDelete();
              }
            }}
          >
            <DeleteIcon />
          </IconButton>
        )}  
      </div>
      <p className={styles.description}>{description}</p>
      {postImage && (
        <img src={postImage} alt="Post" className={styles.postImage} />
      )}
    </div>
  );
};

export default Post;
