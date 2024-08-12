'use client';
import Navbar from "../components/landing-page/Navbar";
import TitleSection from "../components/landing-page/title-section";

const LandingPage = () => {
  return (
    <section>
      <Navbar />
      <div className="
        overflow-hidden
        px-4
        sm:px-6
        mt-16
        sm:flex
        sm:flex-col
        gap-4
        md:justify-center
        md:items-center
      ">
        <TitleSection 
          pill="✨ Your Own Space, Perfected"
          title={<><span>Your ultimate collaboration and productivity hub—welcome to </span><span className="text-blue-400">QuickNotez</span>!</>}
        />
      </div>
    </section>
  );
};


export default LandingPage;

