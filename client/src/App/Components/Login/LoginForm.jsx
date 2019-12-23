import React, { Component } from 'react';

// TODO - build this form

class LoginForm extends Component {

  handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      "email": event.target.email.value,
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
      <form onSubmit={this.handleSubmit}>
        <h2>Login</h2>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" />
        
        <label htmlFor="password">Password </label>
        <input type="password" name="password" />

        <input type="submit" value="Submit" />
      </form>
    )
  }
}

export default LoginForm;
