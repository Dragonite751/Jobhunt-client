import React from 'react';

const WelcomeMessage = () => {
  return (
    <div className="text-black px-4 py-8 flex items-center">
      <div className="container mx-auto flex flex-col md:flex-row justify-around items-start space-y-8 md:space-y-0 md:space-x-8">
        <div className="max-w-lg">
          <h3 className="text-2xl font-bold">Welcome message</h3>
          <p className="text-lg mt-4 leading-relaxed">
            We are immensely elated to invite you to NIT Warangal for the placement and internship drive for the AY 2023-2024. We understand the importance of youth in shaping the future of the world and so our mission extends beyond academic excellence to encompass holistic development.
            We also focus on developing the students with the ability to tackle multifaceted challenges and that is why we have highly equipped laboratories, extensive libraries, games and sports facilities, and enormous research and development facilities.
          </p>
        </div>
        <div className="nirf flex flex-col items-center align-content-center">
          <h2 className="text-2xl font-bold mb-4">Ranking NIRF-2023</h2>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 md:items-center">
            <div className="one box bg-blue-800 rounded-full flex items-center justify-center text-white text-center h-48 w-48">
              <div>
                <h3 className="text-xl font-bold">ENGINEERING</h3>
                <h4 className="text-2xl">21</h4>
              </div>
            </div>
            <div className="two box bg-blue-800 rounded-full flex items-center justify-center text-white text-center h-48 w-48">
              <div>
                <h3 className="text-xl font-bold">OVERALL</h3>
                <h4 className="text-2xl">53</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;
