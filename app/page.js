// app/page.js
import HeroWithNav from "./Hero";
import About from "./about";
import Objectives from "./objective";
import RegistrationForm from "./registraction";
import Contact from "./contact";
import Footer from "./footer";

export default function Page() {
  return (
    <main className="min-h-screen">
      <HeroWithNav />
      <About />
      <Objectives />
      <RegistrationForm />
      <Contact />
      <Footer />
    </main>
  );
}
