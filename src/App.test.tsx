import React from "react";
import { act, render, screen } from "@testing-library/react";
import App from "./App";
import { WindowContext } from "./context";

const defaultContext = {
  height: window.innerHeight,
  width: window.innerWidth,
  deviceType: window.navigator.userAgent,
  darkMode: false,
  resizeCount: 0,
  toggleDarkMode: () => {},
};

describe("App component", () => {
  beforeAll(() => {
    global.innerHeight = 800;
    global.innerWidth = 800;
  });

  it("renders window info", () => {
    render(<App />);
    expect(screen.getByTestId("infowrapper")).toBeInTheDocument();
  });

  it("has default values", () => {
    render(
      <WindowContext.Provider value={defaultContext}>
        <App />
      </WindowContext.Provider>
    );

    expect(screen.getByTestId("width")).toHaveTextContent("800px");
    expect(screen.getByTestId("height")).toHaveTextContent("800px");
    expect(screen.getByTestId("counter")).toHaveTextContent("0");
  });

  it("updates values on resize", async () => {
    render(
      <WindowContext.Provider value={defaultContext}>
        <App />
      </WindowContext.Provider>
    );

    act(() => {
      global.innerWidth = 500;
      global.dispatchEvent(new Event("resize"));
    });

    const asyncWidth = await screen.findByText("Width: 500px");
    const asyncHeight = await screen.findByText("Height: 800px");
    const asyncCount = await screen.findByText("Resize count: 1");

    expect(asyncWidth).toBeInTheDocument();
    expect(asyncHeight).toBeInTheDocument();
    expect(asyncCount).toBeInTheDocument();
  });

  it("changes the theme on button click", () => {
    render(
      <WindowContext.Provider value={defaultContext}>
        <App />
      </WindowContext.Provider>
    );

    const toggle = screen.getByTestId("toggle");

    act(() => {
      toggle.click();
    });

    expect(screen.getByText("Dark Mode: true")).toBeInTheDocument();

    act(() => {
      toggle.click();
    });

    expect(screen.getByText("Dark Mode: false")).toBeInTheDocument();
  });
});
