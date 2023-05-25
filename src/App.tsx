import React, { useEffect, useState } from "react";
import { WindowContext } from "./context";
import "./App.css";
import WindowInfoText from "./components/WindowInfoText";

function App() {
  const [windowData, setWindowData] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
    deviceType: window.navigator.userAgent, // common device info, there was no special requirement on this point
    darkMode: false,
    resizeCount: 0,
  });

  useEffect(() => {
    // Here is a bit tricky throttling applied.
    // Actually it's more like debounce
    // I have found this one as a pretty straightforward and readable way of
    // making the resize method fire only once in set number of ms.

    let timer: any = null; // had to infer types to simplify, I know it's definitely not a good thing to do

    const handleResize = () => {
      clearTimeout(timer); // clearing the previous timer if exists to avoid executing each change just later
      timer = setTimeout(() => {
        setWindowData((prevState) => ({
          ...prevState,
          height: window.innerHeight,
          width: window.innerWidth,
          resizeCount: prevState.resizeCount + 1,
        }));
      }, 30);

      // value of timeout depends on what we are looking for: smooth changing numbers but a lot of re-renders
      // or optimizing the number of re-renders with a short delay on change
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  const handleToggle = () => {
    setWindowData((prevState) => ({
      ...prevState,
      darkMode: !prevState.darkMode,
    }));
  };

  return (
    <WindowContext.Provider
      value={{ ...windowData, toggleDarkMode: handleToggle }}
    >
      <div className={`${windowData.darkMode ? "dark" : "light"} wrapper`}>
        <WindowInfoText />
      </div>
    </WindowContext.Provider>
  );
}

export default App;
