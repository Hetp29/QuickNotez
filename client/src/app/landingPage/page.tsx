'use client';
import Link from "next/link";
import TitleSection from "../components/landing-page/title-section";


const LandingPage = () => {
  return (
    <section>
      <div className="
        overflow-hidden
        px-4
        sm:px-6
        mt-10
        sm:flex
        sm:flex-col
        gap-4
        md: justify-center
        md:items-center
      ">
        <TitleSection 
          pill="✨ Your Own Notetaking Space, Perfected"
          title="This is your collaboration and productivity platform, welcome to QuickNotez"
        />
      </div>
    </section>
  )
}

export default LandingPage;
