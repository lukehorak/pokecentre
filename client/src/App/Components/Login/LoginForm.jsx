import React, { Component } from 'react';

// TODO - build this form

class LoginForm extends Component {

  render() {

    return (
      <form>
        <h2>Login</h2>
        <label>
          Email:
          <input type="email" name="email" />
        </label>
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

export default LoginForm;
