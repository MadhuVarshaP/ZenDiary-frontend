import React from "react";
import image1 from "../assets/illustration2.svg";
import image2 from "../assets/illustration1.png";
import { cardsData } from "../data/Data";

const IllustrationCard = ({ title, description, image, bgcolor }) => {
  return (
    <div
      className={`${bgcolor} text-white rounded-xl p-6 shadow-lg w-[600px] h-[200px] relative flex flex-col justify-between`}
    >
      <div>
        <h3 className="text-lg font-semibold mb-2">
          {title}
        </h3>
        <p className="text-sm text-gray-200">
          {description}
        </p>
      </div>
      <div className="absolute bottom-2 right-4 transform translate-y-1/2">
        <img src={image} alt="Illustration" className="w-30 h-24" />
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div className="bg-beige min-h-screen flex flex-col">
      <section className=" flex justify-center items-center">
        <img src={image1} alt="illustration" className="w-[140px] h-[140px]" />
        <div className="flex flex-col items-center justify-center text-center py-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-6 text-center neon-effect">
            Stay Positive, Stay Consistent
          </h1>

          <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
            Track your mood, jot down daily thoughts, and stay motivated with
            our simple journaling app. Let’s help you grow, one day at a time.
          </p>
          <button className="btn btn-accent text-white text-lg rounded-full hover:bg-mint transition duration-300">
            Get Started
          </button>
        </div>
        <img src={image2} alt="illustration" className="w-[180px] h-[140px]" />
      </section>

      <div className="max-w-7xl mx-auto text-center" />
      <h2 className="text-3xl font-semibold text-gray-800 mt-8 text-center">
        Why ZenDiary?
      </h2>
      <div className="flex justify-center w-full m-8 space-x-5 max-w-7xl mx-auto">
        {cardsData.map((card, index) =>
          <IllustrationCard
            key={index}
            title={card.title}
            description={card.description}
            image={card.image}
            bgcolor={card.bgcolor}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
