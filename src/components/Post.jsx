import React from 'react';

const Post = ({ post, onToggleFavorite }) => {
  const { id, score, title, commentsUrl, isFavorite } = post;

  const handleToggleFavorite = () => {
    onToggleFavorite(id);
  };

  return (
    <div>
      <p>Score: {score}</p>
      <p>Title: {title}</p>
      <a href={commentsUrl}>Comments</a>
      <button onClick={handleToggleFavorite}>
        {isFavorite ? 'Remove from Favorites' : 'Add Favorite'}
      </button>
    </div>
  );
};

export default Post;