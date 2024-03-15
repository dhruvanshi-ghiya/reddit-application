import React, { useState } from 'react';
import axios from 'axios';
import SubredditInput from 'components/SubRedditInput.jsx';
import PostList from 'components/PostList';

const App = () => {
  const [posts, setPosts] = useState([]);

  // Step 2: Add the fetchPosts function here
  const fetchPosts = async (subreddit) => {
    try {
      const response = await axios.get(`https://www.reddit.com/r/${subreddit}/hot.json?limit=10`);
      const fetchedPosts = response.data.data.children.map(child => ({
        id: child.data.id,
        score: child.data.score,
        title: child.data.title,
        commentsUrl: `https://www.reddit.com${child.data.permalink}`
      }));
      return fetchedPosts;
    } catch (error) {
      console.error('Error fetching posts:', error);
      return []; // Return an empty array in case of an error
    }
  };  

  // Step 3: Call the fetchPosts function and update state here
  const handleSubredditSubmit = async (subreddit) => {
    const fetchedPosts = await fetchPosts(subreddit);
    console.log('Fetched posts:', fetchedPosts); // Add this line
    setPosts(fetchedPosts); // Ensure fetchedPosts is an array
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
