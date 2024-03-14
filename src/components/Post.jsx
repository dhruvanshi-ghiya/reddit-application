import React from 'react';

const Post = ({ post, onRemoveFavorite }) => {
  const { score, title, commentsUrl } = post;

  const handleRemoveFavorite = () => {
    onRemoveFavorite(post.id);
  };

  return (
    <div>
      <p>Score: {score}</p>
      <p>Title: {title}</p>
      <a href={commentsUrl}>Comments</a>
      {onRemoveFavorite && (
        <button onClick={handleRemoveFavorite}>Remove Favorite</button>
      )}
    </div>
  );
};

export default Post;
