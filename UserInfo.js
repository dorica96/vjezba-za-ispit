import React, { Component } from 'react';

class UserInfo extends Component {
  render() {
    const { login, avatar_url, id } = this.props.user;
    return (
      <div>
        <h2>User Info</h2>
        <p><strong>Login:</strong> {login}</p>
        <p><strong>ID:</strong> {id}</p>
        <img src={avatar_url} alt={login + "'s avatar"} width="100" />
      </div>
    );
  }
}

export default UserInfo;
