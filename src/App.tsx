import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Greet from "./components/Greet";
import EventBind from "./components/EventBind";
import UserGreetings from "./components/UserGreetings";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Greet name="Bruce" messageCount={20} isLoggedIn={true} />
        <UserGreetings isLoggedIn={false} />
      </div>
    );
  }
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
