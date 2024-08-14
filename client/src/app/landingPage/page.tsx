'use client';
import Navbar from "./Navbar";
import TitleSection from "./Slogan";

const LandingPage = () => {
  return (
    <section className="min-h-screen flex flex-col">
      <Navbar />
      <div className="
        flex-1
        flex
        flex-col
        justify-start
        items-center
        text-center
        overflow-auto
        px-4
        sm:px-6
        mt-16
      ">
        <TitleSection 
          pill="✨ Your Own Space, Perfected"
          title={
            <div className="flex flex-col items-center">
              <span className="
                block 
                text-4xl 
                sm:text-6xl 
                font-semibold 
                mb-4
                text-white
                tracking-wide
                transition-transform
                duration-200
                ease-out
                hover:scale-105
                "
                style={{ 
                  fontFamily: "'Fira Code', monospace", 
                  letterSpacing: '0.15em',
                  textShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                  fontWeight: '900'
                }}
              >
                Design. Plan. Conquer.
              </span>
              <span className="
                text-4xl 
                sm:text-4xl 
                font-semibold 
                text-blue-400
                tracking-wide
                transition-transform
                duration-200
                ease-out
                hover:scale-105
                "
                style={{ 
                  fontFamily: "'Fira Code', monospace", 
                  letterSpacing: '0.15em',
                  textShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                  fontWeight: '900'
                }}
              >
                Welcome to <span className="text-blue-400">QuickNotez</span>!
              </span>
              <p className="
                mt-4
                text-lg
                sm:text-xl
                text-white
                tracking-wide
                transition-transform
                duration-200
                ease-out
                hover:scale-105
                "
                style={{ 
                  fontFamily: "'Fira Code', monospace", 
                  letterSpacing: '0.1em',
                  textShadow: '0 0 8px rgba(255, 255, 255, 0.8)',
                }}
              >
                Organize your life—Manage your notes, tasks, and projects seamlessly—Stay productive and achieve more with everything you need in one place.
              </p>
            </div>
          }
        />
        <div className="mt-8">
          <a href="#get-started">
            <button className="
              bg-white
              text-black
              text-lg
              px-24
              py-6
              rounded-none
              font-semibold
              duration-300
              focus:outline-none
              focus:ring-2
              focus:ring-blue-400
              focus:ring-opacity-50
              hover:bg-gray-200
              tracking-wide
              transition-transform
              duration-200
              ease-out
              hover:scale-105
            ">
              Get Started For Free
            </button>
          </a>
        </div>
        <div className="mt-8 text-lg">
          <p className="text-white tracking-wide transition-transform duration-200 ease-out hover:scale-105">
            Already have an account?{' '}
            <a href="/login" className="text-blue-400 hover:underline">
              Log in now
            </a>
          </p>
        </div>
        <div className="mt-16 mb-16">
          <img
            src="/images/appBanner.png"
            alt="App Trailer"
            className="
              w-full
              h-auto
              max-w-screen-lg
              mx-auto
              transition-transform
              duration-200
              ease-out
              hover:scale-105
            "
          />
        </div>
        <div className="flex flex-wrap justify-center gap-28 mt-16 mb-16">
          <img
            src="/images/client1.png"
            alt="Client 1"
            className="w-32 h-32 object-contain transition-transform duration-200 ease-out hover:scale-105"
          />
          <img
            src="/images/client2.png"
            alt="Client 2"
            className="w-32 h-32 object-contain transition-transform duration-200 ease-out hover:scale-105"
          />
          <img
            src="/images/client3.png"
            alt="Client 3"
            className="w-32 h-32 object-contain transition-transform duration-200 ease-out hover:scale-105"
          />
          <img
            src="/images/client4.png"
            alt="Client 4"
            className="w-32 h-32 object-contain transition-transform duration-200 ease-out hover:scale-105"
          />
          <img
            src="/images/client5.png"
            alt="Client 5"
            className="w-32 h-32 object-contain transition-transform duration-200 ease-out hover:scale-105"
          />
        </div>
        <TitleSection
          pill="✨ Features"
          title={
            <div className="flex flex-col items-center text-center">
              <span className="
                block 
                text-4xl 
                sm:text-6xl 
                font-semibold 
                mb-4
                text-white
                tracking-wide
                transition-transform
                duration-200
                ease-out
                hover:scale-105
                "
                style={{ 
                  fontFamily: "'Fira Code', monospace", 
                  letterSpacing: '0.15em',
                  textShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                  fontWeight: '900'
                }}
              >
                Keep track of all your work in one place.
              </span>
              <p className="
                mt-2
                text-base
                sm:text-lg
                text-white
                tracking-wide
                transition-transform
                duration-200
                ease-out
                hover:scale-105
                "
                style={{ 
                  fontFamily: "'Fira Code', monospace", 
                  letterSpacing: '0.1em',
                  textShadow: '0 0 8px rgba(255, 255, 255, 0.8)',
                }}
              >
                Capture your ideas, thoughts, and meeting notes in
              </p>
              <p className="
                mt-2
                text-base
                sm:text-lg
                text-white
                tracking-wide
                transition-transform
                duration-200
                ease-out
                hover:scale-105
                "
                style={{ 
                  fontFamily: "'Fira Code', monospace", 
                  letterSpacing: '0.1em',
                  textShadow: '0 0 8px rgba(255, 255, 255, 0.8)',
                }}
              >
                a structured and organized manner.
              </p>
            </div>
          }
        />

        <div className="flex flex-wrap justify-center gap-28 mt-12 mb-14">  
          <img
            src="/images/cal.png"
            alt="Calendar"
            className="
              h-64
              w-74
              max-w-screen-lg
              mx-auto
              object-contain
              border
              border-purple-400
              transition-transform
              duration-200
              ease-out
              hover:scale-105
            "
          />
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
