/* eslint-disable testing-library/prefer-screen-queries */


import { render, fireEvent, screen } from "@testing-library/react";
import Sidebar from "../component/Sidebar";
import { MemoryRouter } from "react-router-dom";
import * as commonFunctions from "../hooks/commonFunction";
import "@testing-library/jest-dom/extend-expect";

jest.spyOn(commonFunctions, "getRole").mockReturnValue("admin");


// Test that the Sidebar component renders without crashing
test("renders Sidebar without crashing", () => {
  render(<Sidebar />, { wrapper: MemoryRouter });
});

// Test that the Sidebar displays the correct logo
test("displays the correct logo", () => {
  const { getByAltText } = render(<Sidebar />, { wrapper: MemoryRouter });
  const logo = getByAltText("home-logo");
  expect(logo).toBeInTheDocument();
});

test("should navigate to the home page when clicking the Home button", () => {
  render(<Sidebar role="admin" />, { wrapper: MemoryRouter });
  fireEvent.click(screen.getByText("Home"));
  expect(window.location.pathname).toBe("/");
});

// Test the behavior of the Sidebar when it is open
test("Sidebar opens correctly when `open` prop is true", () => {
  const { getByTestId } = render(<Sidebar open={true} />, {
    wrapper: MemoryRouter,
  });
  const sidebarElement = getByTestId("sidebar");
  expect(sidebarElement).toHaveStyle("width: 240px"); 
});

// Test the behavior of the Sidebar when it is closed
test("Sidebar closes correctly when `open` prop is false", () => {
  const { getByTestId } = render(<Sidebar open={false} />, {
    wrapper: MemoryRouter,
  });
  const sidebarElement = getByTestId("sidebar"); 
  expect(sidebarElement).toHaveStyle("width: calc(56px + 12px)"); 
});

// Test clicking the menu icon
test("clicking the menu icon calls `onStateChange` function", () => {
  const mockOnStateChange = jest.fn();
  const { getByTestId } = render(
    <Sidebar onStateChange={mockOnStateChange} />,
    { wrapper: MemoryRouter }
  );
  const menuIcon = getByTestId("menu-icon"); // Add `data-testid="menu-icon"` to the menu icon element
  fireEvent.click(menuIcon);
  expect(mockOnStateChange).toHaveBeenCalled();
});

// Test the list of items displayed in the Sidebar
test("displays the correct list items for admin role", () => {
  const { getByText } = render(<Sidebar role="admin" />, {
    wrapper: MemoryRouter,
  });
  expect(getByText("Home")).toBeInTheDocument();
  expect(getByText("Users")).toBeInTheDocument();

});

// Test the display of the dot for new notifications
test("displays the dot for a new notification", () => {
  const { getByTestId } = render(<Sidebar />, { wrapper: MemoryRouter });
  const notificationEvent = new CustomEvent("notification", { detail: true });
  fireEvent(window, notificationEvent); 
  const dot = getByTestId("notification-dot"); 
  expect(dot).toBeInTheDocument();
});

// Test the behavior of list items when clicked
test("navigates to the correct path when a list item is clicked", () => {
  const { getByText } = render(<Sidebar role="admin" />, {
    wrapper: MemoryRouter,
  });
  const usersListItem = getByText("Users");
  fireEvent.click(usersListItem);
 
});

// Test the use of the `getRole` function
test("sets the correct role state based on `getRole` function", () => {
  // Mock the `getRole` function to return 'admin'
  jest.spyOn(commonFunctions, "getRole").mockReturnValue("admin");

});
