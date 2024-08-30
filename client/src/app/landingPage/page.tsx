'use client';
import Navbar from "./Navbar";
import TitleSection from "./Slogan";
import { Card } from '@/components/ui/card';
import Footer from './Footer';
import { Image } from '@chakra-ui/react';


const LandingPage = () => {
  
  return (
    <section className="min-h-screen flex flex-col pt-16 bg-white dark:bg-zinc-800 text-black dark:text-white transition-colors ">
      <Navbar  />
      <div className="flex-1 flex flex-col justify-center items-center text-center overflow-auto px-4 sm:px-6 mt-16 pt-20">
      <TitleSection 
        title={
          <div className="flex flex-col items-center">
            <span 
              className="block text-4xl sm:text-6xl font-semibold mb-4 text-black dark:text-white tracking-wide transition-transform duration-200 ease-out hover:scale-105"
              style={{ 
                fontFamily: "'Fira Code', monospace", 
                letterSpacing: '0.15em',
                textShadow: 'none',
                fontWeight: '900'
              }}
            >
              Design. Plan. Conquer.
            </span>

            <span 
              className="text-4xl sm:text-4xl font-semibold text-black dark:text-white tracking-wide transition-transform duration-200 ease-out hover:scale-105"
              style={{ 
                fontFamily: "'Fira Code', monospace", 
                letterSpacing: '0.15em',
                textShadow: 'none',
                fontWeight: '900'
              }}
            >
              <span className='text-black dark:text-white'>Welcome to </span>
              <span className='text-blue-400'>QuickNotez</span>!
            </span>

            <p 
              className="mt-4 text-lg sm:text-xl text-black dark:text-white tracking-wide transition-transform duration-200 ease-out hover:scale-105"
              style={{ 
                fontFamily: "'Fira Code', monospace", 
                letterSpacing: '0.1em',
                textShadow: 'none', 
              }}
            >
              Organize your life—Manage your notes, tasks, and projects seamlessly—Stay productive and achieve more with everything you need in one place.
            </p>
          </div>
        }
      />

        <div className="mt-8">
          <a href="/signup">
            <button className="bg-gray-900 dark:bg-white text-white dark:text-black text-lg px-24 py-6 rounded-full font-semibold duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 hover:bg-blue-600 dark:hover:bg-gray-300 tracking-wide transition-transform duration-200 ease-out hover:scale-105">
              Get Started For Free
            </button>
          </a>
        </div>


        <div className="mt-8 text-lg">
          <p className="text-gray-700 dark:text-white transition-transform duration-200 ease-out hover:scale-105">
            Already have an account?{' '}
            <a href="/login" className="text-blue-500 dark:text-blue-400 hover:underline">
              Log in now
            </a>
          </p>
        </div>

        <div className="mt-28 mb-6 mt-48 flex justify-center items-center space-x-4">
          <div className="relative h-[500px] w-[500px] hidden md:block">
            <Image
              src="/images/documents-dark.png"
              alt="App Trailer"
              className="object-contain transition-transform duration-200 ease-out hover:scale-105 filter invert dark:hidden"
            />
            <Image
              src="/images/documents.png"
              alt="App Trailer in Dark Mode"
              className="object-contain transition-transform duration-200 ease-out hover:scale-105 filter invert hidden dark:block"
            />
          </div>
          <div className="relative h-[500px] w-[500px] hidden md:block">
            <Image
              src="/images/reading-dark.png"  
              alt="Second Image"
              className="object-contain transition-transform duration-200 ease-out hover:scale-105 filter invert dark:hidden"
            />
            <Image
              src="/images/reading.png"
              alt="Second Image in Dark Mode"
              className="object-contain transition-transform duration-200 ease-out hover:scale-105 filter invert hidden dark:block"
            />
          </div>
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
                <span className="block text-4xl sm:text-6xl font-semibold mb-8 text-black dark:text-white tracking-wide transition-transform duration-200 ease-out hover:scale-105"
                  style={{ 
                    fontFamily: "'Fira Code', monospace", 
                    letterSpacing: '0.15em',
                    textShadow: 'none',
                    fontWeight: '900'
                  }}
                >
                  Keep track of all your work in one place.
                </span>

                <p className="mt-2 text-base sm:text-lg tracking-wide text-black dark:text-white transition-transform duration-200 ease-out hover:scale-105"
                  style={{ 
                    fontFamily: "'Fira Code', monospace", 
                    letterSpacing: '0.1em',
                    textShadow: 'none', 
                  }}
                >
                  Capture your ideas, thoughts, and meeting notes
                </p>

                <p className="mt-2 text-base sm:text-lg text-black dark:text-white tracking-wide transition-transform duration-200 ease-out hover:scale-105"
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

          <div className="mt-44 relative h-[500px] w-[500px] hidden md:block">
            
            <Image
              src="/images/error-dark.png"
              alt="App Trailer"
              className="object-contain transition-transform duration-200 ease-out hover:scale-105 filter invert dark:hidden"
            />
            
          
            <Image
              src="/images/error.png"
              alt="App Trailer Dark Mode"
              className="object-contain transition-transform duration-200 ease-out hover:scale-105 filter invert hidden dark:block"
            />
          </div>



          <TitleSection
            title={
              <div className="flex flex-col items-center text-center">
                <p className="mt-2 text-base sm:text-lg text-black dark:text-white tracking-wide transition-transform duration-200 ease-out hover:scale-105"
                  style={{ 
                    fontFamily: "'Fira Code', monospace", 
                    letterSpacing: '0.1em',
                    textShadow: 'none', 
                  }}
                >
                  Our users enjoy a seamless experience
                </p>
                <p className="mt-2 text-base sm:text-lg text-black dark:text-white tracking-wide transition-transform duration-200 ease-out hover:scale-105"
                  style={{ 
                    fontFamily: "'Fira Code', monospace", 
                    letterSpacing: '0.1em',
                    textShadow: 'none', 
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
        <span 
          className="block text-4xl sm:text-5xl font-semibold mb-4 text-black dark:text-white tracking-wide transition-transform duration-200 ease-out hover:scale-105"
          style={{ 
            fontFamily: "'Fira Code', monospace", 
            letterSpacing: '0.15em',
            textShadow: 'none',
            fontSize: '65px',
            fontWeight: '900'
          }}
        >
          Hear from our users
        </span>
      </div>
    }
  />

        <div className="flex flex-col  items-center gap-12 mt-8">

        <div className="flex flex-wrap justify-center gap-12">
          <Card className="p-8 dark:bg-zinc-800 dark:border-gray-900 max-w-xs hover:shadow-lg transition-transform duration-200 ease-out hover:scale-105">
            <p className="text-lg font-medium mb-4">
              &quot;QuickNotez has completely changed the way I manage my projects. It's intuitive, efficient, and reliable.&quot;
            </p>
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium">— Alex M.</p>
              <p className="text-sm">Project Manager</p>
            </div>
          </Card>
          <Card className="p-8 dark:bg-zinc-800 dark:border-gray-900 max-w-xs hover:shadow-lg transition-transform duration-200 ease-out hover:scale-105">
            <p className="text-lg font-medium mb-4">
              &quot;The integration of tasks and notes is seamless. QuickNotez makes collaboration and organization a breeze.&quot;
            </p>
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium">— Jamie L.</p>
              <p className="text-sm">Software Developer</p>
            </div>
          </Card>
          <Card className="p-8 dark:bg-zinc-800 dark:border-gray-900 max-w-xs hover:shadow-lg transition-transform duration-200 ease-out hover:scale-105">
            <p className="text-lg font-medium mb-4">
              &quot;An exceptional tool for anyone who needs to stay organized. The user interface is clean and easy to use.&quot;
            </p>
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium">— Morgan K.</p>
              <p className="text-sm">Entrepreneur</p>
            </div>
          </Card>
        </div>

        <div className="flex flex-wrap justify-center gap-12 mt-8">
        <Card className="p-8 dark:bg-zinc-800 dark:border-gray-900 max-w-xs hover:shadow-lg transition-transform duration-200 ease-out hover:scale-105">
            <p className="text-lg font-medium mb-4">
              &quot;QuickNotez has become an essential part of my daily workflow. The features are just what I needed to stay on top of things.&quot;
            </p>
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium">— Taylor B.</p>
              <p className="text-sm">Marketing Specialist</p>
            </div>
          </Card>
          <Card className="p-8 dark:bg-zinc-800 dark:border-gray-900 max-w-xs hover:shadow-lg transition-transform duration-200 ease-out hover:scale-105">
            <p className="text-lg font-medium mb-4">
              &quot;I love how QuickNotez integrates all my notes and tasks into one place. It's incredibly user-friendly and efficient.&quot;
            </p>
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium">— Riley J.</p>
              <p className="text-sm">Graphic Designer</p>
            </div>
          </Card>
          <Card className="p-8 dark:bg-zinc-800 dark:border-gray-900 max-w-xs hover:shadow-lg transition-transform duration-200 ease-out hover:scale-105">
            <p className="text-lg font-medium mb-4">
              &quot;The customization options are fantastic. When I use QuickNotez, I am able to tailor everything to fit my unique needs.&quot;
            </p>
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium">— Casey D.</p>
              <p className="text-sm">Product Designer</p>
            </div>
          </Card>
        </div>



      </div>

      <div>

<section id="pricing" className="bg-white py-16 bg-white dark:bg-zinc-800 text-black dark:text-white transition-colors">
      <div className="text-center mb-12">
        <span 
          className="block text-4xl sm:text-6xl font-semibold mb-4 text-black dark:text-white tracking-wide transition-transform duration-200 ease-out hover:scale-105"
          style={{ 
            fontFamily: "'Fira Code', monospace", 
            letterSpacing: '0.15em',
            textShadow: 'none',
            fontWeight: '900'
          }}
        >
          Choose your plan!
        </span>
        <p className="text-lg text-gray-600 dark:text-gray-300 mt-12">
          Select a plan that suits your needs the best and start maximizing your productivity today.
        </p>
      </div>

  <div className="flex flex-wrap justify-center gap-8">

  <div className="p-6 rounded-lg shadow-lg flex flex-col flex-grow flex-basis-[300px] min-w-[300px] max-w-[350px] text-center bg-white dark:bg-zinc-800 border border-gray-300 dark:border-gray-900 transition-colors" style={{ minHeight: '550px' }}>
      <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Free</h3>
      <p className="mb-4 text-gray-500 dark:text-gray-300">$0/month</p>
      <ul className="text-left mb-4 space-y-2 text-gray-900 dark:text-white">
        <li className="text-black dark:text-white">Unlimited blocks for teams</li>
        <li className="text-black dark:text-white">Unlimited file uploads</li>
        <li className="text-black dark:text-white">30-day page history</li>
        <li className="text-black dark:text-white">Invite 10 guests</li>
        <li className="text-black dark:text-white">Basic templates</li>
        <li className="text-black dark:text-white">Simple Mind Map (2 maps)</li>
        <li className="text-black dark:text-white">Basic QuickNotez AI (limited text completion)</li>
        <li className="text-black dark:text-white">Sync across 2 devices</li>
      </ul>
      <a href="/signup" className="mt-auto">
        <button className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded font-semibold hover:bg-gray-300 dark:hover:bg-gray-700">
          Sign Up
        </button>
      </a>
  </div>

  <div className="p-6 rounded-lg shadow-lg flex flex-col flex-grow flex-basis-[300px] min-w-[300px] max-w-[350px] text-center bg-white dark:bg-zinc-800 border border-gray-300 dark:border-gray-900 transition-colors" style={{ minHeight: '550px' }}>
  <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Plus</h3>
      <p className="  mb-4 text-gray-500 dark:text-gray-300">
        $8/month (billed annually) <br />
        $10/month (billed monthly)
        
      </p>
      <ul className="text-left mb-4 space-y-2 text-gray-900 dark:text-white">
        <li className='text-black dark:text-white'>Everything in Free +</li>
        <li className='text-black dark:text-white'>90-day page history</li>
        <li className='text-black dark:text-white'>Invite 25 guests</li>
        <li className='text-black dark:text-white'>Advanced templates</li>
        <li className='text-black dark:text-white'>Mind Map (unlimited maps)</li>
        <li className='text-black dark:text-white'>Enhanced QuickNotez AI (note summarization, idea generation)</li>
        <li className='text-black dark:text-white'>Priority support</li>
        <li className='text-black dark:text-white'>Sync across unlimited devices</li>
      </ul>
      <a href="/signup" className="mt-auto">
        <button className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded font-semibold hover:bg-gray-300 dark:hover:bg-gray-700">Get Started</button>
      </a>
    </div>

    <div className="p-6 rounded-lg shadow-lg flex flex-col flex-grow flex-basis-[300px] min-w-[300px] max-w-[350px] text-center bg-white dark:bg-zinc-800 border border-gray-300 dark:border-gray-900 transition-colors" style={{ minHeight: '550px' }}>
    <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Pro</h3>
    <p className="  mb-4 text-gray-500 dark:text-gray-300">
        $15/month (billed annually) <br />
        $18/month (billed monthly)
      </p>
      <ul className="text-left mb-4 space-y-2 text-gray-900 dark:text-white">
        <li className='text-black dark:text-white'>Everything in Plus +</li>
        <li className='text-black dark:text-white'>Unlimited page history</li>
        <li className='text-black dark:text-white'>Invite 50 guests</li>
        <li className='text-black dark:text-white'>Collaborative workspace (real-time collaboration)</li>
        <li className='text-black dark:text-white'>Advanced QuickNotez AI (full access to all AI features)</li>
        <li className='text-black dark:text-white'>Workspace analytics (basic insights)</li>
      </ul>
      <a href="/signup" className="mt-auto">
      <button className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded font-semibold hover:bg-gray-300 dark:hover:bg-gray-700">Get Started</button>
      </a>
    </div>

    <div className="p-6 rounded-lg shadow-lg flex flex-col flex-grow flex-basis-[300px] min-w-[300px] max-w-[350px] text-center bg-white dark:bg-zinc-800 border border-gray-300 dark:border-gray-900 transition-colors" style={{ minHeight: '550px' }}>
    <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Enterprise</h3>
    <p className="  mb-4 text-gray-500 dark:text-gray-300">
        $20/month (billed annually)<br />
        $25/month (billed monthly)
      </p>
      <ul className="text-left mb-4 space-y-2 text-gray-900 dark:text-white">
        <li className='text-black dark:text-white'>Everything in Pro +</li>
        <li className='text-black dark:text-white'>Custom workspace analytics</li>
        <li className='text-black dark:text-white'>Invite unlimited guests</li>
        <li className='text-black dark:text-white'>Enterprise-grade security & compliance</li>
        <li className='text-black dark:text-white'>Dedicated account manager</li>
        <li className='text-black dark:text-white'>24/7 priority support</li>
        <li className='text-black dark:text-white'>Custom SLAs</li>
      </ul>
      <a href="#/signup" className="mt-auto">
      <button className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded font-semibold hover:bg-gray-300 dark:hover:bg-gray-700">Get Started</button>
      </a>
    </div>

  </div>
</section>

</div>
    </div>

    <Footer />

        </section>
      );
    };

export default LandingPage;