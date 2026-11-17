import { usePointerGlow } from './hooks/usePointerGlow';

export default function App() {
  usePointerGlow();
  return (
    <>
      <div className="ambient" aria-hidden="true" />
      <div id="spot" aria-hidden="true" />
      <main>
        <h1>Código limpo. Interfaces que acolhem.</h1>
      </main>
    </>
  );
}
