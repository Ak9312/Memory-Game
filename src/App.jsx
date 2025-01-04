import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { shuffleGrid } from "./gridUtilities/gridSlice";
import { getIconByName } from "./gridUtilities/constansts";

const App = () => {
  const mainGrid = useSelector((state) => state.grid.value);
  const icons = useSelector((state) => state.grid.icons);
  const dispatch = useDispatch();

  console.log(icons);
  const handleShuffle = () => {
    dispatch(shuffleGrid());
  };

  useEffect(() => {
    handleShuffle();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <button
        onClick={handleShuffle}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded shadow"
      >
        Shuffle
      </button>
      <div className="grid grid-cols-4 gap-4">
        {mainGrid.map((item, index) => (
          <div
            key={index}
            className="flex justify-center items-center w-16 h-16 bg-white border border-gray-300 rounded shadow"
          >
            {item !== null && <img src={getIconByName(icons[item])} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
