// app/page.js
import Hero from "./Hero";
import About from "./about";
import Objectives from "./objective";
import RegistrationForm from "./registraction";
import Contact from "./contact";
import Footer from "./footer";

export default function Page() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Objectives />
      <RegistrationForm />
      <Contact />
      <Footer />
    </main>
  );
}
