import React from 'react';
import Post from './Post';

const PostList = ({ posts, onToggleFavorite, onRemoveFavorite }) => {
  return (
    <div>
      <h2>Top 10 Posts</h2>
      {Array.isArray(posts) && posts.length > 0 ? (
        posts.map(post => (
          <Post 
            key={post.id} 
            post={post} 
            onToggleFavorite={onToggleFavorite}
            onRemoveFavorite={onRemoveFavorite} // Add this line to pass the function down
          />
        ))
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
};

export default PostList;
