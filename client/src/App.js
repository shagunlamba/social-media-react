import React, { useState } from 'react';
import {Route, Switch, Redirect } from 'react-router-dom';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Feed from './pages/Feed/Feed';
import Profile from './pages/Profile/Profile';
import Upload from './pages/UploadPosts/Upload';
import IndividualPost from './pages/IndividualPost/IndividualPost';

const App = () => {

  const [isAuth, setAuth] = useState(localStorage.getItem('user-info'));

  return (
    <>
    <Switch>
      <Route path="/" exact component={Home} />

      <Route path="/login" exact >
          <Login setAuth={setAuth} />
      </Route>

      <Route path="/register" exact component={Register} />

      {
        isAuth ?
        <Route path="/feed" exact component={Feed} /> :
        <Redirect to="/" />
      }

      {
        isAuth ?
        <Route path="/profile/:username" exact component={Profile} /> :
        <Redirect to="/" />
      }
      {
        isAuth ?
        <Route path="/upload" exact component={Upload} /> :
        <Redirect to="/" />
      }
      {
        isAuth ?
        <Route path="/post/:postID" exact component={IndividualPost} /> :
        <Redirect to="/" />
      }
    </Switch>
    </>
  );
}

export default App;
