'use client';
import Navbar from "./Navbar";
import TitleSection from "./Slogan";

const LandingPage = () => {
  return (
    <section>
      <Navbar />
      <div className="
        overflow-hidden
        px-4
        sm:px-6
        mt-16
        flex
        flex-col
        sm:flex-row
        items-center
        gap-4
        md:justify-center
      ">
        <div className="flex-1 flex flex-col items-center text-center">
          <TitleSection 
            pill="✨ Your Own Space, Perfected"
            title={
              <div className="flex flex-col items-center">
                <span className="block text-4xl sm:text-6xl font-semibold mb-4">
                  Design. Plan. Conquer.
                </span>
                <span className="text-4xl sm:text-4xl font-semibold">
                  Welcome to <span className="text-blue-400">QuickNotez</span>!
                </span>
              </div>
            }
          />
          <div className="mt-8">
            <a href="#get-started">
              <button className="
                bg-blue-500
                hover:bg-blue-600
                text-white
                px-6
                py-3
                rounded-lg
                font-semibold
                shadow-lg
                transition-colors
                duration-300
                focus:outline-none
                focus:ring-2
                focus:ring-blue-400
                focus:ring-opacity-50
              ">
                Get Started
              </button>
            </a>
          </div>
        </div>
        <div className="flex-1">
          {/* Image or additional content goes here */}
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
