import React from 'react';
import Post from './Post';

const FavoritePostList = ({ favoritePosts, onRemoveFavorite }) => {
  return (
    <div>
      <h2>Favorite Posts</h2>
      {favoritePosts.map(post => (
        <Post key={post.id} post={post} onRemoveFavorite={onRemoveFavorite} />
      ))}
    </div>
  );
};

export default FavoritePostList;
