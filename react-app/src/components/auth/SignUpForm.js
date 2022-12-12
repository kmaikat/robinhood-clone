import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { signUp } from '../../store/session';
import signupImage from "../../assets/signup.png";
import "../../stylesheets/SignUpForm.css";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [buyingPower, setBuyingPower] = useState(0.00);
  const [signupStage, setSignupStage] = useState(1);
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const phase1Check = async (e) => {
    const errors = {};
    e.preventDefault();
    if (firstName.length > 0 === false) errors.firstName = "Please enter your first name.";
    if (lastName.length > 0 === false) errors.lastName = "Please enter your last name.";
    if (email.length > 0 === false) errors.email = "Please enter your email.";
    if (password.length > 0 === false) errors.password = "Please enter your password.";
    if (repeatPassword.length > 0 === false) errors.repeatPassword = "Please retype your password.";

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      console.log(errors)
      return;
    }

    setSignupStage(2);
  };

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data);
      }
    }
  };

  const spinner = <div id="signup-spinner"></div>;

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='signup-page'>
      {console.log(errors)}
      <div className='signup-page-left'>
        <div className='signup-page-left-top'>
          <div className="landing-page-logo" id="signup-logo">
            <p className="landing-page-logo-text">Rockethood</p>
            <i className="fa-solid fa-rocket"></i>
          </div>
          <p id="signup-title">Invest with zero commission fees</p>
          <p id="signup-support-text">Plus, request 24/7 live support from the app</p>
        </div>

        <div className='signup-page-left-bottom'>
          <img src={signupImage} id="signup-image" />
          <p id="signup-disclosure">Stocks, options, and ETFs are not offered through Rockethood Financial. Crypto is not offered through Rockethood Crypto. Rockethood is not a real company. Please do not treat this app as a real banking app.</p>
        </div>
      </div>
      <div className='signup-page-right'>
        <form onSubmit={onSignUp} id="signup-form">
          <p id="signup-id-warning">Enter your first and last name as they appear on your government ID.</p>
          <div className='signup-names'>
            <div>
              <input
                type="text"
                name="firstName"
                onChange={updateFirstName}
                value={firstName}
                className={errors.firstName ? "error-input" : null}
                placeholder="First Name"
              />
              <p className="error-label">
                {errors.firstName}
              </p>
            </div>
            <div>
              <input
                type="text"
                name="lastName"
                onChange={updateLastName}
                value={lastName}
                className={errors.lastName ? "error-input" : null}
                placeholder="Last Name"
              />
              <p className="error-label">
                {errors.lastName}
              </p>
            </div>
          </div>
          <div>
            <input
              type='text'
              name='email'
              onChange={updateEmail}
              value={email}
              className={errors.email ? "error-input" : null}
              placeholder="Email"
            ></input>
            <p className="error-label">
              {errors.email}
            </p>
          </div>
          <div>
            <input
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
              className={errors.password ? "error-input" : null}
              placeholder="Password"
            ></input>
            <p className="error-label">
              {errors.password}
            </p>
          </div>
          <div>
            <input
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
              className={errors.repeatPassword ? "error-input" : null}
              placeholder="Repeat Password"
            />
            <p className="error-label">
              {errors.repeatPassword}
            </p>
          </div>


          <div id="signup-login-container">
            <p id="signup-already">Already have an account?</p>
            <Link to="/login"><p id="signup-login">Log in instead</p></Link>
          </div>
        </form>
        <div className='signup-bottom'>
          <div id="signup-progress-bar-container">
            <div id={`signup-progress-bar-${signupStage}`}>
            </div>
          </div>
          <div className='signup-button-container'>
            <div className="signup-button">
              {signupStage === 1 && <button className='signup-button-bottom' onClick={phase1Check}>Next</button>}
              {signupStage === 2 && <button className='signup-button-bottom' onClick={(e) => {
                setSignupStage(3);
                onSignUp(e);
              }}>Complete Sign up</button>}
              {signupStage === 3 && <button className='signup-button-bottom'>{spinner}</button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
