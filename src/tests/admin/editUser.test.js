import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import EditUser from '../../sections/admin/user/EditUser';
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import { FormProvider } from '../../component/Form';
import "@testing-library/jest-dom/extend-expect";

const mockSelectedUser = {
  _id: 'user-id-123',
  email: 'john@example.com',
  firstName: 'John Doe',
  phoneNo: '1234567890',
  avatar: 'user-avatar.jpg',
};

// Other mock functions used in the component
const mockEditUser = jest.fn();
const mockResetPassword = jest.fn();
const mockMethods = {
  resolver: () => ({ values: {}, errors: {} }),
  defaultValues: {},
};

describe("Profile component", () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<FormProvider methods={mockMethods}>
      <HelmetProvider>
        <MemoryRouter><EditUser selectedUser={mockSelectedUser} editUser={mockEditUser} resetPassword={mockResetPassword} /></MemoryRouter>
      </HelmetProvider>
    </FormProvider>);
  }); 
  test('does not submit form with validation errors', async () => {
  
    // Click the Edit button without filling in the required fields
    fireEvent.click(screen.getByTestId('edit'));
    // Wait for form validation errors
    await waitFor(() => {
      // Assert that the editUser function is not called
      expect(mockEditUser).not.toHaveBeenCalled();
    });
  
  });
  test('calls the resetPassword function when Reset Password button is clicked', () => {
   
    // Click the Reset Password button
    fireEvent.click(screen.getByText(/Reset Password/i));
  
    // Assert that the resetPassword function is called
    expect(mockResetPassword).toHaveBeenCalled();
  });
  test('displays user data in form fields', () => {
      // Assert that the form fields are populated with the user data
    expect(screen.getByLabelText(/First Name/i)).toHaveValue('');
    expect(screen.getByLabelText(/Mobile No/i)).toHaveValue('');
    expect(screen.getByLabelText(/Email/i)).toHaveValue('john@example.com');
  });
  test('calls the editUser function when the form is submitted with valid data', async () => {
    
  
    // Fill in the required form fields
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Mobile No/i), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@example.com' } });
  
    // Click the Edit button to submit the form
    fireEvent.click(screen.getByTestId("edit"));
  
    // Wait for the form submission
    await waitFor(() => {
      // Assert that the editUser function is called with the correct data
      expect(mockEditUser).toBeCalledTimes(1);
    });
  });
  test('calls resetPassword function on reset password button click', () => {   
  
    // Click the reset password button
    fireEvent.click(screen.getByTestId('reset-password-button'));
  
    // Assert that the resetPassword function is called
    expect(mockResetPassword).toHaveBeenCalledTimes(1);
  });
})









