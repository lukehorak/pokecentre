import React, { Component } from 'react';

// TODO - build this form

class LoginForm extends Component {

  handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      "username": event.target.username.value,
      "password": event.target.password.value
    };

    fetch(this.props.url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  render() {

    return (
      <form className="cred-form" onSubmit={this.handleSubmit}>
        <h2>Login</h2>
        <label htmlFor="username">Email</label>
        <input type="email" name="username" />
        
        <label htmlFor="password">Password </label>
        <input type="password" name="password" />

        <input type="submit" value="Submit" />
      </form>
    )
  }
}

export default LoginForm;
