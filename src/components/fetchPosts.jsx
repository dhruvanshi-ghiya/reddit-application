import React, { useState } from 'react';
import axios from 'axios';
import SubredditInput from 'components/SubRedditInput.jsx';
import PostList from './PostList';

const App = () => {
  const [posts, setPosts] = useState([]);

  // Step 2: Add the fetchPosts function here
  const fetchPosts = async (subreddit) => {
    try {
      const response = await axios.get(`https://www.reddit.com/r/${subreddit}/hot.json?limit=10`);
      return response.data.data.children.map(child => ({
        id: child.data.id,
        score: child.data.score,
        title: child.data.title,
        commentsUrl: `https://www.reddit.com${child.data.permalink}`
      }));
    } catch (error) {
      console.error('Error fetching posts:', error);
      return [];
    }
  };

  // Step 3: Call the fetchPosts function and update state here
  const handleSubredditSubmit = async (subreddit) => {
    const fetchedPosts = await fetchPosts(subreddit);
    setPosts(fetchedPosts);
  };

  return (
    <div className="App">
      <h1>Reddit Favorites</h1>
      {/* Step 3: Pass handleSubredditSubmit as onSubmit prop */}
      <SubredditInput onSubmit={handleSubredditSubmit} />
      {/* Step 3: Pass fetched posts as posts prop */}
      <PostList posts={posts} />
    </div>
  );
};

export default App;
