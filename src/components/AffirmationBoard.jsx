import React from "react";
import image1 from "../assets/heartbook.png";

const AffirmationBoard = ({ affirmation }) => {
  return (
    <div className="bg-[#80D4D4] p-6 rounded-lg shadow-md flex justify-between">
      <div>
        <h2 className="text-xl font-bold text-black mb-4">
          Affirmation of the Day!
        </h2>
        {affirmation
          ? <p className="text-center text-[#004F4F] text-xl font-medium">
              "{affirmation}"
            </p>
          : <p className="text-center text-gray-500">
              Hold on! Something special is coming for you...
            </p>}
      </div>
      <img src={image1} alt="Affirmation" className="w-20 h-20" />
    </div>
  );
};

export default AffirmationBoard;
