import React, { useState } from 'react';

const SubredditInput = ({ onSubmit }) => {
  const [subreddit, setSubreddit] = useState('');

  const handleChange = (event) => {
    setSubreddit(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(subreddit);
    setSubreddit('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter subreddit name"
        value={subreddit}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default SubredditInput;
