import React from 'react';
import { useParams } from 'react-router-dom';
import '../index.css'; // ✅ Correct path

function Post(): React.JSX.Element {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="container">
      <div className="main">
        <h2>Post Page</h2>
        <p>Displaying post with ID:</p>
        <div className="roomCard">
          <p>{id}</p>
        </div>
      </div>
    </div>
  );
}

export default Post;
