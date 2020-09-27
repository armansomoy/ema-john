import React, { useContext, useState } from 'react';
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './LoginManager';






function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignIn: false,
    name: '',
    email: '',
    password: '',
    photo: ''
  });

  
  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    handleGoogleSignIn()
    .then(res => {
        handleResponse(res, true);
    })
  }

  const signOut = () => {
      handleSignOut()
      .then(res => {
        handleResponse(res, false);
      })
  }

  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if (redirect) {
        history.replace(from);
    }
  }

  const fbSignIn = () => {
    handleFbSignIn()
    .then(res => {
        handleResponse(res, true);
    })
  }

  


  const handleBlur = (e) => {
    let isFieldValid = true ;
    if(e.target.name === 'email'){
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if(e.target.name === 'password'){
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber ;
    }
    if(isFieldValid){
      const newUserInfo = {...user}
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }
  const handleSubmit = (e) => {
    // console.log(user.email, user.password)
    if( newUser && user.email && user.password){
        createUserWithEmailAndPassword(user.name, user.email, user.password)
        .then(res => {
            handleResponse(res, true);
        })
    }
    if(!newUser && user.email && user.password ){
        signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
            handleResponse(res, true);
        })
    }
    e.preventDefault();
  }



  return (
    <div style={{ textAlign: 'center' }} >
      {
        user.isSignIn ? <button onClick={signOut} >Sign Out From Google</button>  : <button onClick={googleSignIn} >Sign In With Google </button>
      }
      <br/>
      <button onClick={fbSignIn} >Sign In Using Facebook</button>
      {
        user.isSignIn && <div> 
          <h3>Welcome {user.name} </h3>
          <p>Your Email : {user.email} </p>
          <img src={user.photo} alt=""/>
        </div>
      }

      <h1>New Authentication</h1>
      <input type="checkbox" onChange={() => setNewUser(!newUser) } name="newUser" id=""/>
      <label htmlFor="newUser">New User Sign Up</label>
      <form onSubmit={handleSubmit}>
        { newUser && <input type="text" name="name" placeholder="Your Name"  onBlur={handleBlur} required /> }
        <br/>
        <input type="text" onBlur={handleBlur}  name="email" placeholder="Write Your Email Address" id=""  required /> 
        <br/>
        <input type="password" onBlur={handleBlur} placeholder="password" name="password" id=""  required/>
        <br/>
        <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'}  />
        <p style={{color: 'red'}}> {user.error} </p>
        { user.success && <p style={{color: 'green'}}>Your Account { newUser ?  'Created' : 'Logged in'} Successfully</p>   }
      </form>
    </div>
  );
}

export default Login;
