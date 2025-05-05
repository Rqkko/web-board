import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Post.module.css';

type PostProps = {
  id: string;
  username: string;
  profilePic: string;
  title: string;
  description: string;
  image: string;
};

const Post: React.FC<PostProps> = ({ id, username, profilePic, title, description, image }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/posts/${id}`); // Go to post detail page
  };

  return (
    <div className={styles.post} onClick={handleClick}>
      <div className={styles.header}>
        <img src={profilePic} alt={`${username}'s profile`} className={styles.avatar} />
        <span className={styles.username}>{username}</span>
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <img src={image} alt={title} className={styles.image} />
    </div>
  );
};

export default Post;
