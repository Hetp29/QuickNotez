'use client';
import { useState } from 'react';
import Navbar from "./Navbar";
import TitleSection from "./Slogan";
import { Card } from '@/components/ui/card';

const LandingPage = () => {
  const [isLightMode, setIsLightMode] = useState(false);

  const toggleTheme = () => {
    setIsLightMode(!isLightMode);
  };

  return (
    <section className={`min-h-screen flex flex-col pt-16 ${isLightMode ? 'bg-white text-black' : 'bg-gray-900 text-white'} transition-colors duration-300`}>
      <Navbar toggleTheme={toggleTheme} isLightMode={isLightMode} />
      <div className="flex-1 flex flex-col justify-center items-center text-center overflow-auto px-4 sm:px-6 mt-16 pt-20">
        <TitleSection 
          
          title={
            <div className="flex flex-col items-center">
              <span className={`block text-4xl sm:text-6xl font-semibold mb-4 ${isLightMode ? 'text-black' : 'text-white'} tracking-wide transition-transform duration-200 ease-out hover:scale-105`}
                style={{ 
                  fontFamily: "'Fira Code', monospace", 
                  letterSpacing: '0.15em',
                  textShadow: isLightMode ? 'none' : '0 0 10px rgba(255, 255, 255, 0.8)',
                  fontWeight: '900'
                }}
              >
                Design. Plan. Conquer.
              </span>
              <span className={`text-4xl sm:text-4xl font-semibold ${isLightMode ? 'text-black' : 'text-blue-400'} tracking-wide transition-transform duration-200 ease-out hover:scale-105`}
                style={{ 
                  fontFamily: "'Fira Code', monospace", 
                  letterSpacing: '0.15em',
                  textShadow: isLightMode ? 'none' : '0 0 10px rgba(255, 255, 255, 0.8)',
                  fontWeight: '900'
                }}
              >
                Welcome to <span className={`${isLightMode ? 'text-black' : 'text-blue-400'}`}>QuickNotez</span>!
              </span>
              <p className={`mt-4 text-lg sm:text-xl ${isLightMode ? 'text-black' : 'text-white'} tracking-wide transition-transform duration-200 ease-out hover:scale-105`}
                style={{ 
                  fontFamily: "'Fira Code', monospace", 
                  letterSpacing: '0.1em',
                  textShadow: isLightMode ? 'none' : '0 0 8px rgba(255, 255, 255, 0.8)',
                }}
              >
                Organize your life—Manage your notes, tasks, and projects seamlessly—Stay productive and achieve more with everything you need in one place.
              </p>
            </div>
          }
        />
        <div className="mt-8">
          <a href="#get-started">
            <button className={`bg-white text-black text-lg px-24 py-6 rounded-none font-semibold duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 hover:bg-gray-200 tracking-wide transition-transform duration-200 ease-out hover:scale-105 ${isLightMode ? 'bg-black text-white hover:bg-gray-800' : ''}`}>
              Get Started For Free
            </button>
          </a>
        </div>
        <div className="mt-8 text-lg">
        <p className={`text-white ${isLightMode ? 'text-black' : ''} transition-transform duration-200 ease-out hover:scale-105`}>
            Already have an account?{' '}
            <a href="/login" className={`text-blue-400 hover:underline ${isLightMode ? 'text-blue-600' : ''}`}>
              Log in now
            </a>
          </p>
        </div>
        <div className="mt-16 mb-16">
          <img
            src="/images/appBanner.png"
            alt="App Trailer"
            className={`w-full h-auto max-w-screen-lg mx-auto transition-transform duration-200 ease-out hover:scale-105 ${isLightMode ? 'filter invert' : ''}`}
          />
        </div>
        <div className="flex flex-wrap justify-center gap-28 mt-16 mb-16">
          <img
            src="/images/client1.png"
            alt="Client 1"
            className={`w-32 h-32 object-contain transition-transform duration-200 ease-out hover:scale-105 ${isLightMode ? 'filter invert' : ''}`}
          />
          <img
            src="/images/client2.png"
            alt="Client 2"
            className={`w-32 h-32 object-contain transition-transform duration-200 ease-out hover:scale-105 ${isLightMode ? 'filter invert' : ''}`}
          />
          <img
            src="/images/client3.png"
            alt="Client 3"
            className={`w-32 h-32 object-contain transition-transform duration-200 ease-out hover:scale-105 ${isLightMode ? 'filter invert' : ''}`}
          />
          <img
            src="/images/client4.png"
            alt="Client 4"
            className={`w-32 h-32 object-contain transition-transform duration-200 ease-out hover:scale-105 ${isLightMode ? 'filter invert' : ''}`}
          />
          <img
            src="/images/client5.png"
            alt="Client 5"
            className={`w-32 h-32 object-contain transition-transform duration-200 ease-out hover:scale-105 ${isLightMode ? 'filter invert' : ''}`}
          />
        </div>
        <TitleSection
          pill="✨ Features"
          title={
            <div className="flex flex-col items-center text-center">
              <span className={`block text-4xl sm:text-6xl font-semibold mb-4 ${isLightMode ? 'text-black' : 'text-white'} tracking-wide transition-transform duration-200 ease-out hover:scale-105`}
                style={{ 
                  fontFamily: "'Fira Code', monospace", 
                  letterSpacing: '0.15em',
                  textShadow: isLightMode ? 'none' : '0 0 10px rgba(255, 255, 255, 0.8)',
                  fontWeight: '900'
                }}
              >
                Keep track of all your work in one place.
              </span>
              <p className={`mt-2 text-base sm:text-lg ${isLightMode ? 'text-black' : 'text-white'} tracking-wide transition-transform duration-200 ease-out hover:scale-105`}
                style={{ 
                  fontFamily: "'Fira Code', monospace", 
                  letterSpacing: '0.1em',
                  textShadow: isLightMode ? 'none' : '0 0 8px rgba(255, 255, 255, 0.8)',
                }}
              >
                Capture your ideas, thoughts, and meeting notes 
              </p>
              <p className={`mt-2 text-base sm:text-lg ${isLightMode ? 'text-black' : 'text-white'} tracking-wide transition-transform duration-200 ease-out hover:scale-105`}
                style={{ 
                  fontFamily: "'Fira Code', monospace", 
                  letterSpacing: '0.1em',
                  textShadow: isLightMode ? 'none' : '0 0 8px rgba(255, 255, 255, 0.8)',
                }}
              >
                in a structured and organized manner.
              </p>
            </div>
          }
        />
        <div className={`flex flex-wrap justify-center gap-28 mt-12 mb-14 ${isLightMode ? 'bg-gray-200 border-gray-300' : 'bg-brand-primaryPurple/50 border-purple-400'} transition-colors duration-300`}>
          <img
            src="/images/cal.png"
            alt="Calendar"
            className={`h-64 w-74 max-w-screen-lg mx-auto object-contain border ${isLightMode ? 'border-gray-300' : 'border-purple-400'} transition-transform duration-200 ease-out hover:scale-105`}
          />
        </div>

        <TitleSection
          pill="✨ Trusted by all"
          title={
            <div className="flex flex-col items-center text-center">
              <p className={`mt-2 text-base sm:text-lg ${isLightMode ? 'text-black' : 'text-white'} tracking-wide transition-transform duration-200 ease-out hover:scale-105`}
                style={{ 
                  fontFamily: "'Fira Code', monospace", 
                  letterSpacing: '0.1em',
                  textShadow: isLightMode ? 'none' : '0 0 8px rgba(255, 255, 255, 0.8)',
                }}
              >
                Our users enjoy a seamless experience
              </p>
              <p className={`mt-2 text-base sm:text-lg ${isLightMode ? 'text-black' : 'text-white'} tracking-wide transition-transform duration-200 ease-out hover:scale-105`}
                style={{ 
                  fontFamily: "'Fira Code', monospace", 
                  letterSpacing: '0.1em',
                  textShadow: isLightMode ? 'none' : '0 0 8px rgba(255, 255, 255, 0.8)',
                }}
              >
                tailored to their needs.
              </p>
            </div>
          }
        />

<div className="mt-16 mb-16">
          <TitleSection
            pill="✨ What our users say"
            title={
              <div className="flex flex-col items-center text-center">
                <span className="block text-4xl sm:text-5xl font-semibold mb-4 text-white tracking-wide transition-transform duration-200 ease-out hover:scale-105"
                  style={{ 
                    fontFamily: "'Fira Code', monospace", 
                    letterSpacing: '0.15em',
                    textShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                    fontWeight: '900'
                  }}
                >
                  Hear from our users
                </span>
              </div>
            }
          />
          <div className="flex flex-wrap justify-center gap-12 mt-8">
            <Card className="bg-gray-800 p-8 max-w-xs text-white hover:shadow-lg transition-transform duration-200 ease-out hover:scale-105">
              <p className="text-lg font-medium">
                "QuickNotez has completely changed the way I manage my projects. It's intuitive, efficient, and reliable."
              </p>
              <p className="mt-4 text-sm font-light text-gray-400">— Alex M., Project Manager</p>
            </Card>
            <Card className="bg-gray-800 p-8 max-w-xs text-white hover:shadow-lg transition-transform duration-200 ease-out hover:scale-105">
              <p className="text-lg font-medium">
                "The integration of tasks and notes is seamless. QuickNotez makes collaboration and organization a breeze."
              </p>
              <p className="mt-4 text-sm font-light text-gray-400">— Jamie L., Software Developer</p>
            </Card>
            <Card className="bg-gray-800 p-8 max-w-xs text-white hover:shadow-lg transition-transform duration-200 ease-out hover:scale-105">
              <p className="text-lg font-medium">
                "An exceptional tool for anyone who needs to stay organized. The user interface is clean and easy to use."
              </p>
              <p className="mt-4 text-sm font-light text-gray-400">— Morgan K., Entrepreneur</p>
            </Card>
            {/* New Testimonials */}
            <Card className="bg-gray-800 p-8 max-w-xs text-white hover:shadow-lg transition-transform duration-200 ease-out hover:scale-105">
              <p className="text-lg font-medium">
                "QuickNotez has become an essential part of my daily workflow. The features are just what I needed to stay on top of things."
              </p>
              <p className="mt-4 text-sm font-light text-gray-400">— Taylor B., Marketing Specialist</p>
            </Card>
            <Card className="bg-gray-800 p-8 max-w-xs text-white hover:shadow-lg transition-transform duration-200 ease-out hover:scale-105">
              <p className="text-lg font-medium">
                "I love how QuickNotez integrates all my notes and tasks into one place. It's incredibly user-friendly and efficient."
              </p>
              <p className="mt-4 text-sm font-light text-gray-400">— Riley J., Graphic Designer</p>
            </Card>
            <Card className="bg-gray-800 p-8 max-w-xs text-white hover:shadow-lg transition-transform duration-200 ease-out hover:scale-105">
              <p className="text-lg font-medium">
                "The customization options are fantastic. QuickNotez allows me to tailor everything to fit my unique needs."
              </p>
              <p className="mt-4 text-sm font-light text-gray-400">— Casey D., Product Designer</p>
            </Card>
          </div>
        </div>
      </div>

      <div id="pricing" className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
  <div className="text-center mb-12">
    <h2 className="text-4xl font-semibold mb-4">Choose the Plan That Fits You Best</h2>
    <p className="text-lg text-gray-400">Select a plan that suits your needs and start maximizing your productivity today.</p>
  </div>
  <div className="flex flex-wrap justify-center gap-8">
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col flex-grow flex-basis-[300px] min-w-[300px] max-w-[350px] text-center">
      <h3 className="text-2xl font-semibold mb-4">Free</h3>
      <p className="text-xl font-bold mb-4">$0/month</p>
      <ul className="text-left mb-4 space-y-2">
        <li className="text-white">Unlimited blocks for teams</li>
        <li className="text-white">Unlimited file uploads</li>
        <li className="text-white">30 day page history</li>
        <li className="text-white">Invite 100 guests</li>
        <li className="text-white">Synced databases with 3rd party apps</li>
        <li className="text-white">Custom websites</li>
        <li className="text-white">Custom automations</li>
        <li className="text-white">Basic charts & dashboards</li>
      </ul>
      <a href="#get-started" className="mt-auto">
        <button className="bg-white text-black px-4 py-2 rounded font-semibold hover:bg-gray-200">Sign Up</button>
      </a>
    </div>
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col flex-grow flex-basis-[300px] min-w-[300px] max-w-[350px] text-center">
      <h3 className="text-2xl font-semibold mb-4">Plus</h3>
      <p className="text-xl font-bold mb-4">$8/month per seat</p>
      <ul className="text-left mb-4 space-y-2">
        <li className="text-white">Everything in Free +</li>
        <li className="text-white">SAML SSO</li>
        <li className="text-white">Private teamspaces</li>
        <li className="text-white">Bulk PDF export</li>
        <li className="text-white">Advanced page analytics</li>
        <li className="text-white">90 day page history</li>
        <li className="text-white">Invite 250 guests</li>
      </ul>
      <a href="#get-started" className="mt-auto">
        <button className="bg-white text-black px-4 py-2 rounded font-semibold hover:bg-gray-200">Get Started</button>
      </a>
    </div>

    
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col flex-grow flex-basis-[300px] min-w-[300px] max-w-[350px] text-center">
      <h3 className="text-2xl font-semibold mb-4">Business</h3>
      <p className="text-xl font-bold mb-4">$12/month per seat</p>
      <ul className="text-left mb-4 space-y-2">
        <li className="text-white">Everything in Plus +</li>
        <li className="text-white">User provisioning (SCIM)</li>
        <li className="text-white">Advanced security & controls</li>
        <li className="text-white">Audit log</li>
        <li className="text-white">Customer success manager</li>
        <li className="text-white">Workspace analytics</li>
        <li className="text-white">Unlimited page history</li>
        <li className="text-white">Security & Compliance integrations</li>
        <li className="text-white">Invite 250 guests</li>
      </ul>
      <a href="#get-started" className="mt-auto">
        <button className="bg-white text-black px-4 py-2 rounded font-semibold hover:bg-gray-200">Get Started</button>
      </a>
    </div>
  </div>
</div>


        

        <div className="flex flex-col justify-center items-center">
          <div className={`border-t-2 border-gray-700 ${isLightMode ? 'border-gray-300' : 'border-gray-700'} border-opacity-20 my-12`} />
          <p className={`text-lg ${isLightMode ? 'text-black' : 'text-white'} tracking-wide transition-transform duration-200 ease-out hover:scale-105`}>
            &copy; 2024 QuickNotez. All rights reserved.
          </p>
        </div>
      
    </section>
  );
};

export default LandingPage;
