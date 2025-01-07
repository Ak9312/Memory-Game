import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { shuffleGrid, flipCard, checkMatch } from "./gridUtilities/gridSlice";
import { getIconByName } from "./gridUtilities/constansts";
import "./App.css";

const App = () => {
  const mainGrid = useSelector((state) => state.grid.value);
  const icons = useSelector((state) => state.grid.icons);
  const flippedIndices = useSelector((state) => state.grid.flippedIndices);
  const matchedIndices = useSelector((state) => state.grid.matchedIndices);
  const isGameWon = useSelector((state) => state.grid.isGameWon);
  const dispatch = useDispatch();

  const [clickCount, setClickCount] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);

  // Shuffle grid on mount
  useEffect(() => {
    dispatch(shuffleGrid());
  }, [dispatch]);

  // Timer logic
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 1000);
    } else if (!isActive && timer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timer]);

  // Check for matches
  useEffect(() => {
    if (flippedIndices.length === 2) {
      setTimeout(() => {
        dispatch(checkMatch());
      }, 1000);
    }
  }, [flippedIndices, dispatch]);

  // Game won logic
  useEffect(() => {
    if (isGameWon) {
      alert("You won the game!");
      setIsActive(false);
    }
  }, [isGameWon]);

  // Handle card click
  const handleCardClick = (index) => {
    if (
      flippedIndices.length < 2 &&
      !flippedIndices.includes(index) &&
      !matchedIndices.includes(index)
    ) {
      dispatch(flipCard(index));
      setClickCount((prev) => prev + 1);
      if (clickCount === 0) {
        setIsActive(true);
      }
    }
  };

  // Reset game
  const handleShuffle = () => {
    dispatch(shuffleGrid());
    setClickCount(0);
    setTimer(0);
    setIsActive(false);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="mb-4">
        <button
          onClick={handleShuffle}
          className="mr-2 px-4 py-2 bg-red-500 text-white rounded shadow"
        >
          Reset
        </button>
      </div>
      <div className="mb-4">
        <p>Clicks: {clickCount}</p>
        <p>Timer: {timer}s</p>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {mainGrid.map((item, index) => (
          <div
            key={index}
            className={`card ${
              flippedIndices.includes(index) || matchedIndices.includes(index)
                ? "flipped"
                : ""
            }`}
            onClick={() => handleCardClick(index)}
          >
            <div className="card-inner">
              <div className="card-front">
                <img
                  src={getIconByName("question")}
                  alt="hidden"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="card-back">
                <img
                  src={getIconByName(icons[item])}
                  alt={item}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
