import { useContext } from "react";
import { WindowContext } from "../context";

export const useWindowContext = () => {
  const windowInfo = useContext(WindowContext);

  const handleToggle = () => {
    windowInfo.toggleDarkMode();
  };

  return { windowInfo, handleToggle };
};
