import "./App.css";
import { square, container } from "./application.css";

const Square = () => <div className={square} />

function App() {
  return (
    <div className={container}>
      <Square />
      <button>Click to Hide/Show</button>
    </div>
  );
}

export default App;
