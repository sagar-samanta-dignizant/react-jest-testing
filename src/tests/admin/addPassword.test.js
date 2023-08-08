import React from "react";
import { render, fireEvent, screen } from '@testing-library/react';
import AddPassword from "../../sections/admin/user/AddPassword";
import "@testing-library/jest-dom/extend-expect";

describe("AddPassword", () => {
  const mockOnAddPassword = jest.fn();

  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<AddPassword onAddPassword={mockOnAddPassword} selectedUser={{ _id: "user_id" }} />);
  });

  test('renders the component and its children', () => {
    const titleElement = screen.getByText("Verify Password");
    const passwordInput = screen.getByPlaceholderText(/Enter Your Password/i);
    const createButton = screen.getByRole("button", { name: "Create Headset Key" });

    expect(titleElement).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(createButton).toBeInTheDocument();
  });

  test('initial state of password input field is empty', () => {
    const passwordInput = screen.getByPlaceholderText(/Enter Your Password/i);
    expect(passwordInput.value).toBe('');
  });

  test('updates the password value on input change', () => {
    const passwordInput = screen.getByPlaceholderText(/Enter Your Password/i);
    fireEvent.change(passwordInput, { target: { value: "testPassword123" } });
    expect(passwordInput.value).toBe("testPassword123");
  });

//   test('calls onAddPassword function when the button is clicked', () => {
//     const passwordInput = screen.getByLabelText("Password");
//     fireEvent.change(passwordInput, { target: { value: "testPassword123" } });

//     const createButton = screen.getByRole("button", { name: "Create Headset Key" });
//     fireEvent.click(createButton);

//     expect(mockOnAddPassword).toHaveBeenCalledTimes(1);
//     expect(mockOnAddPassword).toHaveBeenCalledWith({ password: "testPassword123", customer_id: "user_id" });
//   });


// test('calls onAddPassword function when the button is clicked', () => {
//     const passwordInput = screen.getByTestId("password");
//     fireEvent.change(passwordInput, { target: { value: "testPassword123" } });

//     const createButton = screen.getByRole("button", { name: "Create Headset Key" });
//     fireEvent.click(createButton);

//     expect(mockOnAddPassword).toHaveBeenCalledTimes(1);
//     expect(mockOnAddPassword).toHaveBeenCalledWith({ password: "testPassword123", customer_id: "user_id" });
//   });

});
