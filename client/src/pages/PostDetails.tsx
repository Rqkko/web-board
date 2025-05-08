import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TextField, Button } from '@mui/material';

import styles from '../styles/PostDetail.module.css';
import NotFound from './NotFound';
import { api } from 'utils/api';
import profilePicture from '../assets/profilePicture.jpg';
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

interface Comment {
  username: string;
  content: string;
}

const PostDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

  function handleAddComment() {
    api.get('/api/user/getUsername', {
      withCredentials: true,
    })
      .then(response => response.data)
      .catch((error) => {
        alert("Please login to comment on a post.");
      });
    
    if (newComment.trim()) {
      api.post(`/api/reply/${id}`,
        { content: newComment },
        { 
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true 
        }
      )
        .then(response => {
          if (response.status === 200 || response.status === 201) {
            alert('Comment added successfully!');
            updateCommentList();
            setNewComment('');
          }
        })
        .catch(error => {
          console.error('Error adding comment:', error);
          alert('Failed to add comment. Please try again.');
        });
    }
  };

  const updateCommentList = useCallback(() => {
    api.get(`/api/reply/${id}`)
      .then(response => {
        setComments(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
      });
  }, [id]);

  useEffect(() => {
    api.get(`/api/post/${id}`)
      .then(response => {
        setPost(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });

    updateCommentList();
  }, [id, updateCommentList])

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
                <strong>{comment.username}:</strong> {comment.content}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
