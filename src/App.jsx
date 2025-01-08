import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { shuffleGrid, flipCard, checkMatch } from "./gridUtilities/gridSlice";
import { getIconByName } from "./gridUtilities/constansts";
import "./App.css";
import GameCompletedModal from "./GameCompletedModal/GameCompletedModal";

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
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      setIsModalOpen(true);
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
    window.location.reload(); // Reload the page
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    handleShuffle();
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="mb-4">
        {isActive ? (
          <button
            onClick={handleShuffle}
            className="mr-2 px-4 py-2 bg-red-500 text-white rounded shadow"
          >
            Reset
          </button>
        ) : (
          <button className="mr-2 px-4 py-2"></button>
        )}
      </div>
      <div className="mb-4">
        {isActive ? (
          <p>Clicks: {clickCount}</p>
        ) : (
          <p className="text-2xl">Welcome to memory game</p>
        )}
        {isActive ? (
          <p>Timer: {timer}s</p>
        ) : (
          <p className="text-gray-700">Click on any tiles to begin!</p>
        )}
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
      <GameCompletedModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        timer={timer}
        clickCount={clickCount}
      />
      <div className="text-center mt-10 text-gray-400 text-sm">
        <p>
          &copy; {new Date().getFullYear()} Abhinandan. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default App;
