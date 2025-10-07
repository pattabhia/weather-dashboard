import React from "react";
import type GreetProps from "../types/greet.type";

const Greet = (props: GreetProps) => {
  console.log("Greet component rendered", props.name);
  return (
    <div>
      <h1>
        {props.isLoggedIn
          ? `Welcome, ${props.name}! you have ${props.messageCount} messages`
          : "Welcome Guest!"}
      </h1>
    </div>
  );
};

export default Greet;
