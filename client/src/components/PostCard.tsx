// src/pages/PostFeed.tsx
import React from 'react';
import Post from '../pages/Post';
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

const PostFeed: React.FC = () => {
    return (
      <>
  
        <div style={{ padding: '20px', marginTop: '60px' }}>
          {samplePosts.map(post => (
            <Post key={post.id} {...post} />
          ))}
        </div>
      </>
    );
  };

export default PostFeed;
