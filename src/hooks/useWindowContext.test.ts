import { useContext } from "react";
import { renderHook, act } from "@testing-library/react";
import { useWindowContext } from "./useWindowContext";

const testWindowContext = {
  height: window.innerHeight,
  width: window.innerWidth,
  deviceType: window.navigator.userAgent,
  darkMode: false,
  resizeCount: 0,
  toggleDarkMode: jest.fn(),
};

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useContext: jest.fn(),
}));

describe("window info context", () => {
  beforeEach(() => {
    (useContext as jest.Mock).mockReturnValue(testWindowContext);
  });

  it("should return correct values", () => {
    const { result } = renderHook(() => useWindowContext());
    expect(result.current.windowInfo).toBe(testWindowContext);
  });

  it("triggers toggleDarkMode method", () => {
    const { result } = renderHook(() => useWindowContext());
    act(() => {
      result.current.handleToggle();
    });
    expect(testWindowContext.toggleDarkMode).toHaveBeenCalled();
  });
});
