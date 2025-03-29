// This is just a test page, you can use it or delete it
import React from 'react'

interface PostProps {
  postId: string | undefined;
}

function Post({ postId }: PostProps): React.JSX.Element {
  return (
    <div>
      <div>Post</div>
      <div>Id is {postId}</div>
    </div>
  )
}

export default Post