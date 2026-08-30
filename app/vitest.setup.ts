// Minimal browser globals: @gamepark/react-game and its dependencies touch the DOM when imported
const storage = new Map<string, string>()
const localStorage = {
  getItem: (key: string) => storage.get(key) ?? null,
  setItem: (key: string, value: string) => void storage.set(key, value),
  removeItem: (key: string) => void storage.delete(key)
}
const fakeElement = () => ({
  style: {}, children: [], classList: { add: () => {}, remove: () => {} },
  appendChild: () => {}, setAttribute: () => {}, addEventListener: () => {},
  querySelector: () => null, querySelectorAll: () => []
})
const document = {
  documentElement: fakeElement(), body: fakeElement(), head: fakeElement(),
  addEventListener: () => {}, createElement: fakeElement, createTextNode: () => ({}),
  getElementsByTagName: () => [fakeElement()], getElementById: () => null,
  querySelector: () => null, querySelectorAll: () => []
}
const screen = {
  width: 1000, height: 800, onorientationchange: null,
  orientation: { type: 'landscape-primary', angle: 0, addEventListener: () => {}, removeEventListener: () => {}, unlock: () => {} }
}
const window = {
  localStorage, document, screen, Promise, devicePixelRatio: 1, innerWidth: 1000, innerHeight: 800,
  location: { search: '', href: 'http://localhost/', pathname: '/' },
  addEventListener: () => {}, removeEventListener: () => {}, getComputedStyle: () => ({}),
  matchMedia: () => ({ matches: false, addEventListener: () => {}, addListener: () => {} })
}
Object.assign(globalThis, { window, document, screen, localStorage })
