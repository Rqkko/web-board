import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TextField, Button } from '@mui/material';

import styles from '../styles/PostDetail.module.css';
import NotFound from './NotFound';
import { api } from 'utils/api';
import profilePicture from '../assets/profilePicture.jpg';
import { profile } from 'console';
import LargePostCard from 'components/LargePostCard';

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

const PostDetails = () => {
  const { id } = useParams<{ id: string }>();
  // const post = samplePosts.find(p => p.id === id);
  const [post, setPost] = useState<Post | null>(null);

  const [comments, setComments] = useState([
    { user: 'bob123', text: 'Wow! Amazing view!' },
    { user: 'jane', text: 'Where is this place?' },
    { user: 'jane', text: 'Lorem ipsumals;dkfjas;dfdssdsafksafnl;asjf;lsj;klsajg;klsajg;opiajsiogjaisogjaosipjgoaisjgoiasjgiosajgpiosjiopgjasogjasdgasgaskgjasl;gjasoipgjasiogjaiosgjaosigjpaosjgsjgaposjgpaosigjopasjoasij' },
    { user: 'jane', text: 'Lorem ipsumals;dkfjas;dfdssdsafksafnl;asjf;lsj;klsajg;klsajg;opiajsiogjaisogjaosipjgoaisjgoiasjgiosajgpiosjiopgjasogjasdgasgaskgjasl;gjasoipgjasiogjaiosgjaosigjpaosjgsjgaposjgpaosigjopasjoasij' },
    { user: 'jane', text: 'Lorem ipsumals;dkfjas;dfdssdsafksafnl;asjf;lsj;klsajg;klsajg;opiajsiogjaisogjaosipjgoaisjgoiasjgiosajgpiosjiopgjasogjasdgasgaskgjasl;gjasoipgjasiogjaiosgjaosigjpaosjgsjgaposjgpaosigjopasjoasij' },
    { user: 'jane', text: 'Lorem ipsumals;dkfjas;dfdssdsafksafnl;asjf;lsj;klsajg;klsajg;opiajsiogjaisogjaosipjgoaisjgoiasjgiosajgpiosjiopgjasogjasdgasgaskgjasl;gjasoipgjasiogjaiosgjaosigjpaosjgsjgaposjgpaosigjopasjoasij' },
  ]);

  const [newComment, setNewComment] = useState('');

  function handleAddComment() {
    if (newComment.trim()) {
      setComments([...comments, { user: 'you', text: newComment }]);
      setNewComment('');
    }
  };

  useEffect(() => {
    api.get(`/api/post/${id}`)
      .then(response => {
        setPost(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });

  }, [id])

  if (!post) return <NotFound />;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <LargePostCard 
          id={post.id}
          username={post.username}
          profilePic={profilePicture}
          roomId={post.room_id}
          title={post.title}
          content={post.content}
          image={post.imageUrl}
        />
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
