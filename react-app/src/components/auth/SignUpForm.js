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
  const [signupStage, setSignupStage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [bank, setBank] = useState("");
  const [lastFour, setLastFour] = useState("");
  const [accountNickname, setAccountNickname] = useState("");
  const [buyingPower, setBuyingPower] = useState("");
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const [usernameError, setUsernameError] = useState('');
  const [showUsernameError, setShowUsernameError] = useState(false);
  const regex = RegExp(
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
  );
  useEffect(() => {
    setShowUsernameError(false);

    if (username.length < 3 || username.length > 20)
      setUsernameError('Your username must be between 3 and 20 characters long.');
    else if (/[^a-zA-Z\d\_]+/.test(username))
      setUsernameError('Your username can only have letters, numbers, and underscores.');
    else setUsernameError('');

  }, [username]);

  const usernameCheck = async (e) => {
    e.preventDefault();

    if (username.length < 3 || username.length > 20) {
      setUsernameError('Your username must be between 3 and 20 characters long.');
      setShowUsernameError(true);
      return;
    } else if (/[^a-zA-Z\d\_]+/.test(username)) {
      setUsernameError('Your username can only have letters, numbers, and underscores.');
      setShowUsernameError(true);
      return;
    }

    setLoading(true);
    const success = await fetch(`/api/users/check-username/${username}`)
      .then(res => {
        setLoading(false);
        return res.ok;
      })
      .catch(e => {
        setLoading(false);
      });

    if (success) setSignupStage(signupStage + 1);

    else {
      setUsernameError('Username duplicated. Please try again');
      setShowUsernameError(true);
    }
  };

  const phase1Check = async (e) => {
    const errors = {};
    e.preventDefault();
    if (firstName.length > 0 === false) errors.firstName = "Please enter your first name.";
    if (lastName.length > 0 === false) errors.lastName = "Please enter your last name.";
    if (email.length > 0 === false) errors.email = "Please enter your email.";
    else if (!email.trim().match(regex)) {
      errors.email = 'Please provide a valid Email';
    }

    if (password.length >= 10 === false) errors.password = "Password must be at least 10 characters long";
    if (repeatPassword.length > 0 === false) errors.repeatPassword = "Please retype your password.";
    else if (repeatPassword !== password) errors.repeatPassword = "Passwords must match!";

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    setLoading(true);
    const response = await fetch(`/api/users/${email}`);
    setTimeout(() => setLoading(false), 250);

    if (response.status === 409) {
      errors.email = "Email already in use.";
      setErrors(errors);
      return;
    }

    setErrors(errors);
    setSignupStage(2);
  };

  const phase2Check = async (e) => {
    const errors = {};
    e.preventDefault();
    if (bank.length > 0 === false) errors.bank = "Please enter your bank information.";
    if (!lastFour || lastFour < 0) errors.lastFour = "Please enter the last four of your bank account.";
    else if (lastFour.toString().length < 4) errors.lastFour = "Please enter the last four of your bank account.";
    if (accountNickname.length > 0 === false) errors.accountNickname = "Please enter a nickname for your account.";
    if (!buyingPower || buyingPower <= 0) errors.buyingPower = "Please enter a number greater than 0";
    else if (buyingPower > 10000000) errors.buyingPower = "Rockethood's current max limit is $10,000,000.00. Please deposit less money.";
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    setLoading(true);
    const data = await dispatch(signUp(firstName, lastName, email, password, buyingPower, username));
    setLoading(false);
    setErrors(errors);
    setSignupStage(3);
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

  const updateBank = (e) => {
    setBank(e.target.value);
  };

  const updateLastFour = (e) => {
    const value = e.target.value.slice(0, e.target.maxLength);
    setLastFour(value);
  };

  const updateAccountNickname = (e) => {
    setAccountNickname(e.target.value);
  };

  const updateBuyingPower = (e) => {
    setBuyingPower((e.target.value));
  };

  if (user) {
    return <Redirect to='/app' />;
  }

  return (
    <div className='signup-page'>
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
        {signupStage === 1 &&
          <form id="signup-form" onSubmit={phase1Check}>
            <p id="signup-id-warning" className='signup-form-heading'>Enter your first and last name as they appear on your government ID.</p>
            <div className='signup-names'>
              <div className='signup-names-inner'>
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
              <div className='signup-names-inner'>
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
          </form>}
        {/* step 2 */}
        {signupStage === 2 &&
          <form id="signup-form" onSubmit={usernameCheck}>
            <p className='signup-form-heading'>Enter your username.</p>
            <div>
              <input
                type='text'
                className={showUsernameError ? 'error-input' : null}
                value={username}
                onChange={updateUsername}
                placeholder='Username'
              />
            </div>
            <p className='error-label'>
              {showUsernameError && usernameError}
            </p>
          </form>
        }
        {signupStage === 3 &&
          <form id="signup-form" onSubmit={phase2Check}>
            <p className='signup-form-heading'>Let's get your account funded!</p>
            <div>
              <input
                type="text"
                className={errors.bank ? "error-input" : null}
                value={bank}
                onChange={updateBank}
                placeholder='Bank'
              />
              <p className="error-label">
                {errors.bank}
              </p>
            </div>
            <div>
              <input
                type="number"
                className={errors.lastFour ? "error-input" : null}
                placeholder="Last 4 of your bank account"
                maxLength={4}
                onChange={updateLastFour}
                value={lastFour}
              />
              <p className="error-label">
                {errors.lastFour}
              </p>
            </div>
            <div>
              <input
                type="text"
                className={errors.accountNickname ? "error-input" : null}
                placeholder="Account nickname"
                onChange={updateAccountNickname}
                value={accountNickname}
              />
              <p className="error-label">
                {errors.accountNickname}
              </p>
            </div>
            <div>
              <input
                type="number"
                className={errors.buyingPower ? "error-input" : null}
                placeholder="How much would you like to get started with?"
                onChange={updateBuyingPower}
                value={buyingPower}
              />
              <p className="error-label">
                {errors.buyingPower}
              </p>
            </div>
          </form>}
        <div className='signup-bottom'>
          <div id="signup-progress-bar-container">
            <div id={`signup-progress-bar-${signupStage}`}>
            </div>
          </div>
          <div className='signup-button-container'>
            <div className="signup-button">
              {signupStage === 1 && <button form='signup-form' className='signup-button-bottom' type='submit'>{loading ? spinner : "Next"}</button>}
              {signupStage === 2 && <button form='signup-form' className='signup-button-bottom' type='submit'>{loading ? spinner : "Next"}</button>}
              {signupStage === 3 && <button form='signup-form' className='signup-button-bottom' type='submit'>{loading ? spinner : "Complete Sign up"}</button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
