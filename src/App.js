import React, { useState } from 'react';
import axios from 'axios';
import SubredditInput from './components/SubRedditInput.jsx';
import PostList from './components/PostList';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [favoritePosts, setFavoritePosts] = useState([]);

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

  const handleSubredditSubmit = async (subreddit) => {
    const fetchedPosts = await fetchPosts(subreddit);
    setPosts(fetchedPosts);
  };

  const toggleFavorite = (postId) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return { ...post, isFavorite: !post.isFavorite };
      }
      return post;
    });
    setPosts(updatedPosts);

    const updatedFavoritePosts = updatedPosts.filter(post => post.isFavorite);
    setFavoritePosts(updatedFavoritePosts);
    
    // Store favorite post IDs in local storage
    localStorage.setItem('favoritePosts', JSON.stringify(updatedFavoritePosts.map(post => post.id)));
  };

  const removeFavorite = (postId) => {
    const updatedFavoritePosts = favoritePosts.filter(post => post.id !== postId);
    setFavoritePosts(updatedFavoritePosts);

    // Update local storage to remove the post ID
    localStorage.setItem('favoritePosts', JSON.stringify(updatedFavoritePosts.map(post => post.id)));
  };

  return (
    <div className="App">
      <h1>Reddit Favorites</h1>
      <SubredditInput onSubmit={handleSubredditSubmit} />
      {posts.length > 0 ? (
        <PostList 
          posts={posts} 
          onToggleFavorite={toggleFavorite} 
          onRemoveFavorite={removeFavorite} // Make sure this line is added
        />
      ) : (
        <p>No posts found. Please enter a valid subreddit name.</p>
      )}
    </div>
  );
};

export default App;
