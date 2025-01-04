import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import { useEffect } from "react";
import { gridInitialize, shuffleGrid } from "./gridUtilities/gridSlice";

function App() {
  const mainGrid = useSelector((state) => state.grid.value);
  const iconsName = useSelector((state) => state.grid.icons);
  const dispatch = useDispatch();
  console.log(mainGrid);
  console.log(iconsName);
  useEffect(() => {
    dispatch(gridInitialize());
  }, []);

  const shuffle = () => {
    dispatch(shuffleGrid());
  };
  return (
    <div>
      <h1 className="text-red-400">Memory Game</h1>
      <button onClick={shuffle} className="btn-red-500">
        Shuffle
      </button>
    </div>
  );
}

export default App;
