import Shape from "./components/Shape";

import "./App.css";

const DATA = [
  [1, 1, 1],
  [1, 0, 0],
  [1, 1, 1],
];

function App() {
  return (
    <>
      <Shape data={DATA} />
    </>
  );
}

export default App;
