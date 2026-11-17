import Header from './components/Header';
import SkipLink from './components/SkipLink';
import { usePointerGlow } from './hooks/usePointerGlow';

export default function App() {
  usePointerGlow();
  return (
    <>
      <SkipLink />
      <div className="ambient" aria-hidden="true" />
      <div id="spot" aria-hidden="true" />
      <Header />
      <main id="conteudo">
        <h1 id="topo">Código limpo. Interfaces que acolhem.</h1>
      </main>
    </>
  );
}
