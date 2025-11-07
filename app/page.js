// app/page.js
import HeroWithNav from "./Hero";
import About from "./about";
import Objectives from "./objective";
import RegistrationForm from "./registraction";
import Contact from "./contact";
import Footer from "./footer";
import DownloadSection from "./DownloadSection";
import CampaignActionPlan from "./CampaigenActionPlan";
import PravariSearchUI from "./PariwarList";

export default function Page() {
  return (
    <main className="min-h-screen">
      <HeroWithNav />
      <About />
     
      <Objectives />
      <CampaignActionPlan/>
      <RegistrationForm />
      <DownloadSection />
      <PravariSearchUI/>
      <Contact />
      <Footer />
    </main>
  );
}
