import React, { Component } from "react";

class EventBind extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      message: "Hello",
    };
  }
  clickHandler = () => {
    this.setState({
      message: "Goodbye!",
    });
  };

  render() {
    return (
      <div>
        {/* <div>{this.state.message}</div> */}
        <div>Hello</div>
        <button onClick={this.clickHandler.bind(this)}>Click</button>
      </div>
    );
  }
}

export default EventBind;
