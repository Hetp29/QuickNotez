'use client';
import { useState } from 'react';
import Navbar from "./Navbar";
import TitleSection from "./Slogan";
import { Card } from '@/components/ui/card';

const LandingPage = () => {
  
  return (
    <section className="min-h-screen flex flex-col pt-16 bg-white text-black transition-colors duration-300">
      <Navbar  />
      <div className="flex-1 flex flex-col justify-center items-center text-center overflow-auto px-4 sm:px-6 mt-16 pt-20">
        <TitleSection 
          title={
            <div className="flex flex-col items-center">
              <span className="block text-4xl sm:text-6xl font-semibold mb-4 text-black tracking-wide transition-transform duration-200 ease-out hover:scale-105"
                style={{ 
                fontFamily: "'Fira Code', monospace", 
                letterSpacing: '0.15em',
                textShadow: 'none',
                fontWeight: '900'
          }}
>
                Design. Plan. Conquer.
              </span>

              <span className="text-4xl sm:text-4xl font-semibold text-black tracking-wide transition-transform duration-200 ease-out hover:scale-105"
              style={{ 
                fontFamily: "'Fira Code', monospace", 
                letterSpacing: '0.15em',
                textShadow: 'none',
                fontWeight: '900'
              }}
            >
              <span className='text-black'>Welcome to </span>
              <span className='text-blue-400'>QuickNotez</span>!
            </span>

            <p className={`mt-4 text-lg sm:text-xl text-black tracking-wide transition-transform duration-200 ease-out hover:scale-105`}
              style={{ 
                fontFamily: "'Fira Code', monospace", 
                letterSpacing: '0.1em',
                textShadow: 'none', // Adjust this if needed
              }}
            >
              Organize your life—Manage your notes, tasks, and projects seamlessly—Stay productive and achieve more with everything you need in one place.
            </p>

            </div>
          }
        />
        <div className="mt-8">
        <a href="#get-started">
          <button className={`bg-blue-500 text-white text-lg px-24 py-6 rounded-full font-semibold duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 hover:bg-blue-600 tracking-wide transition-transform duration-200 ease-out hover:scale-105`}>
            Get Started For Free
          </button>
        </a>
      </div>

      <div className="mt-8 text-lg">
        <p className={`text-gray-700 transition-transform duration-200 ease-out hover:scale-105`}>
          Already have an account?{' '}
          <a href="/login" className={`text-blue-500 hover:underline`}>
            Log in now
          </a>
        </p>
      </div>
        <div className="mt-16 mb-16">
          <img
            src="/images/appBanner.png"
            alt="App Trailer"
            className="w-32 h-32 object-contain transition-transform duration-200 ease-out hover:scale-105 filter invert"
          />
        </div>
        <div className="flex flex-wrap justify-center gap-28 mt-16 mb-16">
          <img
            src="/images/client1.png"
            alt="Client 1"
            className="w-32 h-32 object-contain transition-transform duration-200 ease-out hover:scale-105 filter invert"
          />
          <img
            src="/images/client2.png"
            alt="Client 2"
            className="w-32 h-32 object-contain transition-transform duration-200 ease-out hover:scale-105 filter invert"
          />
          <img
            src="/images/client3.png"
            alt="Client 3"
            className="w-32 h-32 object-contain transition-transform duration-200 ease-out hover:scale-105 filter invert"
          />
          <img
            src="/images/client4.png"
            alt="Client 4"
            className="w-32 h-32 object-contain transition-transform duration-200 ease-out hover:scale-105 filter invert"
          />
          <img
            src="/images/client5.png"
            alt="Client 5"
            className="w-32 h-32 object-contain transition-transform duration-200 ease-out hover:scale-105 filter invert"
          />
        </div>
        <TitleSection
          title={
            <div className="flex flex-col items-center text-center">
              <span className={`block text-4xl sm:text-6xl font-semibold mb-4 text-black tracking-wide transition-transform duration-200 ease-out hover:scale-105`}
                  style={{ 
                    fontFamily: "'Fira Code', monospace", 
                    letterSpacing: '0.15em',
                    textShadow: 'none', // Remove text shadow for black text on white background
                    fontWeight: '900'
                  }}
                >
                  Keep track of all your work in one place.
            </span>

            <p className={`mt-2 text-base sm:text-lg tracking-wide transition-transform duration-200 ease-out hover:scale-105`}
              style={{ 
                fontFamily: "'Fira Code', monospace", 
                letterSpacing: '0.1em',
                color: 'black', 
                textShadow: 'none', 
              }}
            >
              Capture your ideas, thoughts, and meeting notes
          </p>


          <p className={`mt-2 text-base sm:text-lg text-black tracking-wide transition-transform duration-200 ease-out hover:scale-105`}
            style={{ 
              fontFamily: "'Fira Code', monospace", 
              letterSpacing: '0.1em',
              textShadow: 'none', 
            }}
          >
            in a structured and organized manner.
        </p>

            </div>
          }
        />
        <div className="flex flex-wrap justify-center gap-28 mt-12 mb-14 bg-gray-200 border-gray-300 transition-colors duration-300">
          <img
            src="/images/cal.png"
            alt="Calendar"
            className="h-64 w-74 max-w-screen-lg mx-auto object-contain border border-gray-300 transition-transform duration-200 ease-out hover:scale-105"
          />
        </div>

        <TitleSection
            title={
              <div className="flex flex-col items-center text-center">
                <p className={`mt-2 text-base sm:text-lg text-black tracking-wide transition-transform duration-200 ease-out hover:scale-105`}
                  style={{ 
                    fontFamily: "'Fira Code', monospace", 
                    letterSpacing: '0.1em',
                    textShadow: 'none', // Remove text shadow for black text
                  }}
                >
                  Our users enjoy a seamless experience
                </p>
                <p className={`mt-2 text-base sm:text-lg text-black tracking-wide transition-transform duration-200 ease-out hover:scale-105`}
                  style={{ 
                    fontFamily: "'Fira Code', monospace", 
                    letterSpacing: '0.1em',
                    textShadow: 'none', // Remove text shadow for black text
                  }}
                >
                  across multiple devices.
                </p>
              </div>
            }
          />

      </div>

      <div className="mt-16 mb-16">
      <TitleSection
          title={
            <div className="flex flex-col items-center text-center">
              <span className="block text-4xl sm:text-5xl font-semibold mb-4 text-black tracking-wide transition-transform duration-200 ease-out hover:scale-105"
                style={{ 
                  fontFamily: "'Fira Code', monospace", 
                  letterSpacing: '0.15em',
                  textShadow: '0 0 10px rgba(0, 0, 0, 0.8)', // Adjusted text shadow for black text
                  fontWeight: '900'
                }}
              >
                Hear from our users
              </span>
            </div>
          }
        />

        <div className="flex flex-col items-center gap-12 mt-8">

          <div className="flex flex-wrap justify-center gap-12">
            <Card className="bg-gray-900 p-8 max-w-xs text-white hover:shadow-lg transition-transform duration-200 ease-out hover:scale-105">
              <p className="text-lg font-medium">
                &quot;QuickNotez has completely changed the way I manage my projects. It's intuitive, efficient, and reliable.
              </p>
              <p className="mt-4 text-sm font-light text-gray-300">— Alex M., Project Manager</p>
            </Card>
            <Card className="bg-gray-900 p-8 max-w-xs text-white hover:shadow-lg transition-transform duration-200 ease-out hover:scale-105">
              <p className="text-lg font-medium">
                &quot;The integration of tasks and notes is seamless. QuickNotez makes collaboration and organization a breeze.
              </p>
              <p className="mt-4 text-sm font-light text-gray-300">— Jamie L., Software Developer</p>
            </Card>
            <Card className="bg-gray-900 p-8 max-w-xs text-white hover:shadow-lg transition-transform duration-200 ease-out hover:scale-105">
              <p className="text-lg font-medium">
                &quot;An exceptional tool for anyone who needs to stay organized. The user interface is clean and easy to use.&quot;
              </p>
              <p className="mt-4 text-sm font-light text-gray-300">— Morgan K., Entrepreneur</p>
            </Card>
          </div>


          <div className="flex flex-wrap justify-center gap-12 mt-8">
            <Card className="bg-gray-900 p-8 max-w-xs text-white hover:shadow-lg transition-transform duration-200 ease-out hover:scale-105">
              <p className="text-lg font-medium">
                &quot;QuickNotez has become an essential part of my daily workflow. The features are just what I needed to stay on top of things.
              </p>
              <p className="mt-4 text-sm font-light text-gray-300">— Taylor B., Marketing Specialist</p>
            </Card>
            <Card className="bg-gray-900 p-8 max-w-xs text-white hover:shadow-lg transition-transform duration-200 ease-out hover:scale-105">
              <p className="text-lg font-medium">
                &quot;I love how QuickNotez integrates all my notes and tasks into one place. It's incredibly user-friendly and efficient.
              </p>
              <p className="mt-4 text-sm font-light text-gray-300">— Riley J., Graphic Designer</p>
            </Card>
            <Card className="bg-gray-900 p-8 max-w-xs text-white hover:shadow-lg transition-transform duration-200 ease-out hover:scale-105">
              <p className="text-lg font-medium">
                &quot;The customization options are fantastic. QuickNotez allows me to tailor everything to fit my unique needs.
              </p>
              <p className="mt-4 text-sm font-light text-gray-300">— Casey D., Product Designer</p>
            </Card>
          </div>
        </div>


        <section id="pricing" className="bg-white py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-semibold mb-4 text-gray-900">Choose the Plan That Fits You Best</h2>
            <p className="text-lg text-gray-600">Select a plan that suits your needs and start maximizing your productivity today.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg flex flex-col flex-grow flex-basis-[300px] min-w-[300px] max-w-[350px] text-center">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Free</h3>
              <p className="text-xl font-bold mb-4 text-gray-900">$0/month</p>
              <ul className="text-left mb-4 space-y-2 text-gray-900">
                <li className='text-black'>Unlimited blocks for teams</li>
                <li className='text-black'>Unlimited file uploads</li>
                <li className='text-black'>30 day page history</li>
                <li className='text-black'>Invite 100 guests</li>
                <li className='text-black'>Synced databases with 3rd party apps</li>
                <li className='text-black'>Custom websites</li>
                <li className='text-black'>Custom automations</li>
                <li className='text-black'>Basic charts & dashboards</li>
              </ul>
              <a href="#get-started" className="mt-auto">
                <button className="bg-gray-900 text-white px-4 py-2 rounded font-semibold hover:bg-gray-800">Sign Up</button>
              </a>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg flex flex-col flex-grow flex-basis-[300px] min-w-[300px] max-w-[350px] text-center">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Plus</h3>
              <p className="text-xl font-bold mb-4 text-gray-900">$8/month per seat</p>
              <ul className="text-left mb-4 space-y-2 text-gray-900">
                <li className='text-black'>Everything in Free +</li>
                <li className='text-black'>SAML SSO</li>
                <li className='text-black'>Private teamspaces</li>
                <li className='text-black'>Bulk PDF export</li>
                <li className='text-black'>Advanced page analytics</li>
                <li className='text-black'>90 day page history</li>
                <li className='text-black'>Invite 250 guests</li>
              </ul>
              <a href="#get-started" className="mt-auto">
                <button className="bg-gray-900 text-white px-4 py-2 rounded font-semibold hover:bg-gray-800">Get Started</button>
              </a>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg flex flex-col flex-grow flex-basis-[300px] min-w-[300px] max-w-[350px] text-center">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Business</h3>
              <p className="text-xl font-bold mb-4 text-gray-900">$12/month per seat</p>
              <ul className="text-left mb-4 space-y-2 text-gray-900">
                <li className='text-black'>Everything in Plus +</li>
                <li className='text-black'>User provisioning (SCIM)</li>
                <li className='text-black'>Advanced security & controls</li>
                <li className='text-black'>Audit log</li>
                <li className='text-black'>Customer success manager</li>
                <li className='text-black'>Workspace analytics</li>
                <li className='text-black'>Unlimited page history</li>
                <li className='text-black'>Security & Compliance integrations</li>
                <li className='text-black'>Invite 250 guests</li>
              </ul>
              <a href="#get-started" className="mt-auto">
                <button className="bg-gray-900 text-white px-4 py-2 rounded font-semibold hover:bg-gray-800">Get Started</button>
              </a>
            </div>
          </div>
        </section>

  
    </div>

        </section>
      );
    };

export default LandingPage;