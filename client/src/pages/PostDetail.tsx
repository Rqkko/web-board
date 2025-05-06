import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../styles/PostDetail.module.css';

import aliceProfile from '../assets/alice.jpg';
import mountainImg from '../assets/mountain.jpg';

const samplePosts = [
  {
    id: '1',
    username: 'alice',
    profilePic: aliceProfile,
    title: 'Beautiful View',
    description: 'I went hiking and saw this amazing view!',
    image: mountainImg,
  },
];

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const post = samplePosts.find(p => p.id === id);

  const [comments, setComments] = useState([
    { user: 'bob123', text: 'Wow! Amazing view!' },
    { user: 'jane', text: 'Where is this place?' },
  ]);

  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, { user: 'you', text: newComment }]);
      setNewComment('');
    }
  };

  if (!post) return <div>Post not found</div>;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <img src={post.profilePic} alt={post.username} className={styles.avatar} />
          <span className={styles.username}>{post.username}</span>
        </div>
        <h2 className={styles.title}>{post.title}</h2>
        <p className={styles.description}>{post.description}</p>
        <img src={post.image} alt="Post visual" className={styles.image} />

        {/* Comment Section */}
        <div className={styles.commentSection}>
          <h3>Comments</h3>
          <div className={styles.commentInput}>
            <input
              type="text"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button onClick={handleAddComment}>Post</button>
          </div>
          <ul className={styles.commentList}>
            {comments.map((comment, idx) => (
              <li key={idx} className={styles.comment}>
                <strong>{comment.user}:</strong> {comment.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
