type Opts = { reduceMotion?: boolean; finePointer?: boolean };

export function mockMedia({ reduceMotion = false, finePointer = true }: Opts = {}) {
  window.matchMedia = ((query: string) => ({
    matches: query.includes('prefers-reduced-motion') ? reduceMotion : query.includes('pointer: fine') ? finePointer : false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  })) as typeof window.matchMedia;
}

export function clearMedia() {
  // @ts-expect-error jsdom does not define matchMedia
  delete window.matchMedia;
}
