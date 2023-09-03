import React from "react";
import "./App.css";
import { container, square } from "./application.css";

const Square: React.FC = () => <div className={square} />;

function App() {
  return (
    <div className={container}>
      <Square />
      <button>Click to Hide/Show</button>
    </div>
  );
}

export default App;
