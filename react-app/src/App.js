import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import LandingPageNavbar from './components/LandingPageNavbar';
import { authenticate } from './store/session';
import ChartTest from './components/ChartTest';
import "./stylesheets/reset.css";
import "./stylesheets/global.css";
import WatchList from './components/WatchList';
import AppHome from './components/AppHome';
import StockShowcase from './components/StockShowcase';
import ProfilePage from './components/ProfilePage.js';


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/invest">
          <LandingPageNavbar />
          Invest
        </Route>
        <Route path="/crypto">
          <LandingPageNavbar />
          crypto
        </Route>
        <Route path="/learn">
          <LandingPageNavbar />
          learn
        </Route>
        <Route path="/snacks">
          <LandingPageNavbar />
          snacks
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/charttest'>
          <ChartTest />
        </Route>
        <Route path='/' exact={true} >
          <LandingPageNavbar />
          <h1>My Home Page</h1>
        </Route>
        <Route path='/watchlists' exact={true} >
          <WatchList />
        </Route>
        <Route path='/stocks/:symbol' >
          <StockShowcase />
        </Route>
      </Switch>
      <ProtectedRoute path="/app" exact>
        <AppHome />
      </ProtectedRoute>
      <ProtectedRoute path="/profile" exact>
        <ProfilePage />
      </ProtectedRoute>
    </BrowserRouter>
  );
}

export default App;
