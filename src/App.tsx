import { CSSProperties, useRef, useState } from "react";
import "./App.css";
import { square, container } from "./application.css";
import { Transition, TransitionStatus } from "react-transition-group";

const duration = 300;
const defaultStyle: CSSProperties = {
  transition: `translate ${duration}ms ease-in-out`,
  translate: "0 50px",
  opacity: "1"
};

const transitionStyles: Record<TransitionStatus, CSSProperties> = {
  entering: { opacity: 1, translate: "0 0" },
  entered: { opacity: 1, translate: "0 0" },
  exiting: { opacity: 0, translate: "0 50px"},
  exited: { opacity: 0, translate: "0 50px" },
  unmounted: {},
};

const Square: React.FC<{ inProp: boolean }> = ({ inProp }) => {
  const nodeRef = useRef(null);

  return (
    <Transition nodeRef={nodeRef} in={inProp} timeout={duration}>
      {(state) => (
        <div
          className={square}
          ref={nodeRef}
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}
        />
      )}
    </Transition>
  );
};

function App() {
  const [status, setStatus] = useState(true);

  return (
    <div className={container}>
      <Square inProp={status} />
      <button onClick={() => setStatus(!status)}>Click to Hide/Show</button>
    </div>
  );
}

export default App;
