import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from './Post';

const FavoritePostList = () => {
  const [favoritePosts, setFavoritePosts] = useState([]);

  useEffect(() => {
    // Fetch favorite post IDs from local storage
    const favoritePostIds = JSON.parse(localStorage.getItem('favoritePosts')) || [];

    // Fetch favorite posts from Reddit API based on IDs
    const fetchFavoritePosts = async () => {
      const postsData = await Promise.all(favoritePostIds.map(async postId => {
        try {
          const response = await axios.get(`https://www.reddit.com/api/info.json?id=${postId}`);
          return response.data.data.children[0].data; // Extract post data
        } catch (error) {
          console.error('Error fetching favorite post:', error);
          return null;
        }
      }));

      // Filter out any null values (failed fetches) and update state
      setFavoritePosts(postsData.filter(post => post !== null));
    };

    fetchFavoritePosts();
  }, []);

  return (
    <div>
      <h2>Favorite Posts</h2>
      {favoritePosts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default FavoritePostList;
