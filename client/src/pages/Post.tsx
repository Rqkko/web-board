// src/components/Post.tsx

import React from 'react';
import styles from '../styles/Post.module.css';

interface PostProps {
  id: string;
  username: string;
  profilePic: string;
  title: string;
  description: string;
  image?: string;
}

const Post: React.FC<PostProps> = ({ username, profilePic, title, description, image }) => {
  return (
    <div className={styles.postContainer}>
      {/* Header with profile pic and username */}
      <div className={styles.header}>
        <img src={profilePic} alt={`${username}'s profile`} className={styles.profilePic} />
        <span className={styles.username}>{username}</span>
      </div>

      {/* Post Title */}
      <h2 className={styles.title}>{title}</h2>

      {/* Post Description */}
      <p className={styles.description}>{description}</p>

      {/* Optional Post Image */}
      {image && <img src={image} alt="Post content" className={styles.postImage} />}
    </div>
  );
};

export default Post;
