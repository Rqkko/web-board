import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { TextField, Button } from '@mui/material';

import styles from '../styles/PostDetail.module.css';
import NotFound from './NotFound';
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

const PostDetails = () => {
  const { id } = useParams<{ id: string }>();
  const post = samplePosts.find(p => p.id === id);

  const [comments, setComments] = useState([
    { user: 'bob123', text: 'Wow! Amazing view!' },
    { user: 'jane', text: 'Where is this place?' },
    { user: 'jane', text: 'Lorem ipsumals;dkfjas;dfdssdsafksafnl;asjf;lsj;klsajg;klsajg;opiajsiogjaisogjaosipjgoaisjgoiasjgiosajgpiosjiopgjasogjasdgasgaskgjasl;gjasoipgjasiogjaiosgjaosigjpaosjgsjgaposjgpaosigjopasjoasij' },
    { user: 'jane', text: 'Lorem ipsumals;dkfjas;dfdssdsafksafnl;asjf;lsj;klsajg;klsajg;opiajsiogjaisogjaosipjgoaisjgoiasjgiosajgpiosjiopgjasogjasdgasgaskgjasl;gjasoipgjasiogjaiosgjaosigjpaosjgsjgaposjgpaosigjopasjoasij' },
    { user: 'jane', text: 'Lorem ipsumals;dkfjas;dfdssdsafksafnl;asjf;lsj;klsajg;klsajg;opiajsiogjaisogjaosipjgoaisjgoiasjgiosajgpiosjiopgjasogjasdgasgaskgjasl;gjasoipgjasiogjaiosgjaosigjpaosjgsjgaposjgpaosigjopasjoasij' },
    { user: 'jane', text: 'Lorem ipsumals;dkfjas;dfdssdsafksafnl;asjf;lsj;klsajg;klsajg;opiajsiogjaisogjaosipjgoaisjgoiasjgiosajgpiosjiopgjasogjasdgasgaskgjasl;gjasoipgjasiogjaiosgjaosigjpaosjgsjgaposjgpaosigjopasjoasij' },
  ]);

  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, { user: 'you', text: newComment }]);
      setNewComment('');
    }
  };

  if (!post) return <NotFound />;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <img src={post.profilePic} alt={post.username} className={styles.avatar} />
          <span className={styles.username}>{post.username}</span>
          <div className={styles.room}>Announcement</div>
        </div>
        <h2 className={styles.title}>{post.title}</h2>
        <p className={styles.description}>{post.description}</p>
        <img src={post.image} alt="Post visual" className={styles.image} />

        <div className={styles.divider}></div>

        {/* Comment Section */}
        <div className={styles.commentSection}>
          <h3>Comments</h3>
          <div className={styles.commentInput}>
            <TextField
              variant="outlined"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              style={{ width: '70%', marginRight: '10px' }}
              multiline
              rows={2}
              size="small"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddComment}
              style={{ marginLeft: '10px', width: '15%', height: '50%', alignSelf: 'end', marginBottom: '5px' }}
            >
              Post
            </Button>
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

export default PostDetails;
