import Greeting from "./Greeting";
import { render, screen } from "@testing-library/react";

describe("<Greeting />", () => {
  test("renders Hello World as text", () => {
    // Arrange
    render(<Greeting />);
    // Act
    // ... nothing
    // Assert
    const helloWorldElement = screen.getByText("Hello World!");
    expect(helloWorldElement).toBeInTheDocument();
  });
  test("renders 'good to see you' if the button was NOT clicked", () => {
    // Arrange
    render(<Greeting />);
    // Act
    // ... nothing
    // Assert
    const outputElement = screen.getByText("good to see you", { exact: false });
    expect(outputElement).toBeInTheDocument();
  });
  test("renders 'Changed!' if the button was clicked", () => {
    // Arrange
    render(<Greeting />);
    // Act
    const buttonElement = screen.getByRole("button");
    buttonElement.click();
    // Assert
    const outputElement = screen.getByText("Changed!");
    expect(outputElement).toBeInTheDocument();
  });
  test("does not render 'good to see you' if the button was clicked", () => {
    // Arrange
    render(<Greeting />);
    // Act
    const buttonElement = screen.getByRole("button");
    buttonElement.click();
    // Assert
    const outputElement = screen.queryByText("good to see you", {
      exact: false,
    });
    expect(outputElement).toBeNull();
  });
});
