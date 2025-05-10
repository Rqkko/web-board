import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TextField, Button, Avatar } from '@mui/material';

import styles from '../styles/PostDetail.module.css';
import NotFound from './NotFound';
import { api } from 'utils/api';
import defaultProfilePicture from '../assets/defaultProfilePicture.png';
import LargePostCard from 'components/LargePostCard';
import Loader from 'components/Loader';

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
  profilePicture: string | null;
}

interface Comment {
  username: string;
  content: string;
  profilePicture: string | null;
}

const PostDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  function handleAddComment() {
    api.get('/api/user/getUsername', {
      withCredentials: true,
    })
      .then(response => {
        if (response.data) {
          // User is logged in, proceed with adding the comment
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
          } else {
            alert('Comment cannot be empty.');
          }
        } else {
          // User is not logged in
          alert("Please login to comment on a post.");
        }
      })
      .catch(() => {
        alert("Please login to comment on a post.");
      });
  }

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
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
        setIsLoading(false);
      });

    updateCommentList();
  }, [id, updateCommentList])

  return isLoading ? (
    <div style={{ marginTop: '150px' }}>
      <Loader />
    </div>
  ) : !post ? (
    <NotFound />
  ) : (
    <div className={styles.container}>
      <div className={styles.card}>
        <LargePostCard
          username={post.username}
          profilePic={post.profilePicture ? post.profilePicture : defaultProfilePicture}
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
              <div key={idx} className={styles.comment}>
                <Avatar
                  src={comment.profilePicture ? comment.profilePicture : defaultProfilePicture}
                  alt={comment.username}
                  style={{ width: '30px', height: '30px', marginRight: '10px' }}
                />
                <strong>{comment.username}:</strong> {comment.content}
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
};

export default PostDetails;
