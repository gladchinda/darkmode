function supportsLocalStorage(): boolean {
  try {
    if ('localStorage' in self) {
      let stored: string;
      const storedValue = '1';
      const storageKey = `_${Date.now()}${String(Math.random() * 1e5).split('.')[1]}`;

      localStorage.setItem(storageKey, storedValue);
      stored = localStorage.getItem(storageKey);
      localStorage.removeItem(storageKey);

      return stored === storedValue;
    }
  } catch (e) {}

  return false;
}

function supportsMatchMedia(): boolean {
  return 'matchMedia' in self;
}

export {
  supportsLocalStorage,
  supportsMatchMedia
};
