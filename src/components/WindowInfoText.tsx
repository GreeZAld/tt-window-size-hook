import { useWindowContext } from "../hooks/useWindowContext";
import "./WindowInfoText.css";

function WindowInfoText() {
  const { windowInfo, handleToggle } = useWindowContext();
  return (
    <div className="infoWrapper" data-testid="infowrapper">
      <p data-testid="height">Height: {windowInfo.height}px</p>
      <p data-testid="width">Width: {windowInfo.width}px</p>
      <p data-testid="device">Device Type: {windowInfo.deviceType}</p>
      <p data-testid="theme">Dark Mode: {windowInfo.darkMode.toString()}</p>
      <button
        onClick={handleToggle}
        className={`${windowInfo.darkMode ? "light" : "dark"}Toggle`}
        data-testid="toggle"
      >
        Switch to {windowInfo.darkMode ? "light" : "dark"}
      </button>
      <p data-testid="counter">Resize count: {windowInfo.resizeCount}</p>
    </div>
  );
}

export default WindowInfoText;
