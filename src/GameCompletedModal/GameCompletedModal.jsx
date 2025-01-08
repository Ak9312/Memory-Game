import React from "react";

const GameCompletedModal = ({ isOpen, onClose, timer, clickCount }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative bg-white p-8 rounded shadow-lg z-10">
        <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
        <p className="mb-4">You won the game!</p>
        <p>
          You took {timer} seconds and {clickCount} clicks
        </p>
        <div className="mt-3 flex justify-center items-center">
          {" "}
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded shadow"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameCompletedModal;
