import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import GlowTrail from './components/GlowTrail';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Services from './components/Services';
import SkipLink from './components/SkipLink';
import { usePointerGlow } from './hooks/usePointerGlow';

export default function App() {
  usePointerGlow();
  return (
    <>
      <SkipLink />
      <div className="ambient" aria-hidden="true" />
      <div id="spot" aria-hidden="true" />
      <GlowTrail />
      <Header />
      <main id="conteudo" tabIndex={-1}>
        <Hero />
        <Projects />
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
