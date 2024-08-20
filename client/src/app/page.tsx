'use client'
import LandingPage from "./landingPage/page";
import LoginPage from "./login/page";
import HomePageLayout from "./landingPage/layout";

export default function HomePage() {
  return (
    <HomePageLayout>
      <LandingPage />
      </HomePageLayout>
  );
  
  
}
