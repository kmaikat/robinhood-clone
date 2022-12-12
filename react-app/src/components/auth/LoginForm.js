import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import loginImage from "../../assets/login.png";
import "../../stylesheets/LoginForm.css";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setTimeout(() => {
        setErrors({});
        const errors = {};
        errors.login = "Please fill out all fields";
        setErrors(errors);
      }, 1);
      return;
    }

    const data = await dispatch(login(email, password));
    if (data) {
      setErrors({});
      const errors = {};
      errors.login = "Invalid Credentials";
      setErrors(errors);
    }

  };

  const demoLogin = async (e) => {
    const email = "demo@aa.io";
    const password = "password";
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/app' />;
  }

  return (
    <div className='login-page'>
      <div className='login-page-left'>
        <img src={loginImage} alt="people together on rockethood" />
      </div>
      <div className='login-page-right'>
        <div className='login-form-container'>
          <h1 id="login-title">Log in to Rockethood</h1>
          <form id="login-form" onSubmit={onLogin}>
            {/* <div>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div> */}
            <div className='login-form-input'>
              <label htmlFor='email'>Email</label>
              <input
                name='email'
                type='text'
                className={errors.login ? "login-failed-input" : null}
                placeholder='Email'
                value={email}
                onChange={updateEmail}
              />
            </div>
            <div className='login-form-input'>
              <label htmlFor='password'>Password</label>
              <input
                name='password'
                type='password'
                className={errors.login ? "login-failed-input" : null}
                placeholder='Password'
                value={password}
                onChange={updatePassword}
              />
            </div>
            {errors.login && <p id="login-failed-text">{errors.login}</p>}
            <button type='submit' id="login-submit">Login</button>
          </form>
          <Link to="/sign-up" ><p id="login-create-account">Not on Rockethood? <span id="create-an-account">Create an account</span></p></Link>
          <p>Don't feel like doing that? <span id="login-demo-user" onClick={demoLogin}>Log in as Demo User </span></p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
