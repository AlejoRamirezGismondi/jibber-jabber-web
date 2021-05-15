import React from 'react';
import Header from "../header/Header";
import NewPost from "../post/NewPost";
import Feed from "../feed/Feed";

const Home = () => {
  return (
    <div>
      <Header/>
      <NewPost/>
      <Feed/>
    </div>
  );
}

export default Home;
