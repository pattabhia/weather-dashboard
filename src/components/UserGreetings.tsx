import React, { Component } from "react";

interface UserGreetingsState {
  isLoggedIn: boolean;
}

type UserGreetingsProps = {
  isLoggedIn: boolean;
};

class UserGreetings extends Component<UserGreetingsProps, UserGreetingsState> {
  constructor(props: UserGreetingsProps) {
    super(props);
    this.state = {
      isLoggedIn: props.isLoggedIn,
    };
  }

  render() {
    return this.state.isLoggedIn ? (
      <div>Welcome User</div>
    ) : (
      <div>Welcome Guest</div>
    );
  }
}

export default UserGreetings;
