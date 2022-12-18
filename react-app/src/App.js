import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import LandingPageNavbar from './components/LandingPageNavbar';
import { authenticate } from './store/session';
// import ChartTest from './components/ChartTest';
import "./stylesheets/reset.css";
import "./stylesheets/global.css";
import WatchList from './components/WatchList';
import AppHome from './components/AppHome';
import StockShowcase from './components/StockShowcase';
import ProfilePage from './components/ProfilePage.js';
import LearnPage from './components/LandingPages/Learn';
import LandingHome from './components/LandingPages/LandingHome';
import CashCard from './components/CashCard';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.session);

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
          <LearnPage />
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
        {/* <Route path='/charttest'>
          <ChartTest />
        </Route> */}
        <Route path='/' exact={true} >
          <LandingPageNavbar />
          <LandingHome/>
        </Route>
        <ProtectedRoute path='/stocks/:symbol' >
          <StockShowcase />
        </ProtectedRoute>
      </Switch>
      <ProtectedRoute path="/app" exact>
        <AppHome />
      </ProtectedRoute>
      <ProtectedRoute path="/profile" exact>
        <ProfilePage />
      </ProtectedRoute>
      <Route path="/cashcard">
        <LandingPageNavbar />
        <CashCard/>
      </Route>
    </BrowserRouter>
  );
}

export default App;
