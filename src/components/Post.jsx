import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faStar } from '@fortawesome/free-solid-svg-icons';
import '../styles/Post.css';

const Post = ({ post, onToggleFavorite }) => {
  const { id, score, title, commentsUrl, isFavorite } = post;

  const handleToggleFavorite = () => {
    onToggleFavorite(id);
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <h3 className="post-title">{title}</h3>
        <div className="post-score">
          <FontAwesomeIcon icon={faStar} className="star-icon" />
          <span>{score}</span>
        </div>
      </div>
      <div className="post-body">
        <a href={commentsUrl} className="comments-link">
          <FontAwesomeIcon icon={faComment} className="comment-icon" />
          Comments
        </a>
        <button onClick={handleToggleFavorite} className="favorite-btn">
          <FontAwesomeIcon
            icon={isFavorite ? faStar : ['far', 'star']}
            className="favorite-icon"
          />
          {isFavorite ? 'Remove from Favorites' : 'Add Favorite'}
        </button>
      </div>
    </div>
  );
};

export default Post;