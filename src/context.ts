import { createContext } from "react";

export const WindowContext = createContext({
  height: window.innerHeight,
  width: window.innerWidth,
  deviceType: window.navigator.userAgent,
  darkMode: false,
  resizeCount: 0,
  toggleDarkMode: () => {},
});
