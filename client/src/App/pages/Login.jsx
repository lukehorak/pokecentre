import React, { Component } from 'react';
import LoginForm from '../Components/Login/LoginForm';

class Login extends Component {
  render() {
    return (
      <div className="App">
        <LoginForm url='/api/auth/register'/>
      </div>
    );
  }
}

export default Login;