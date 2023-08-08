import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import VerifyEmail from '../../pages/admin/VerifyEmail';

// Mock the onAddPassword function and selectedUser prop
const mockOnAddPassword = jest.fn();
const mockSelectedUser = { _id: 'user_id' };

describe("Profile component", () => {
    beforeEach(() => {
        // eslint-disable-next-line testing-library/no-render-in-setup
        render(
            <HelmetProvider>
                <MemoryRouter><VerifyEmail onAddPassword={mockOnAddPassword} selectedUser={mockSelectedUser} /></MemoryRouter>
            </HelmetProvider>
        );
    });
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render the component correctly', () => {
        // Check if the title is rendered
        expect(screen.getByTestId(/verify-password/i)).toBeInTheDocument();
        // Check if the password input field is rendered
        expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
        // Check if the "Verify Admin Password" button is rendered
        expect(screen.getByTestId("verify-admin-password")).toBeInTheDocument();
      });
      it('should update the password value when input field is changed', () => {
        const passwordInput = screen.getByLabelText(/Password/i);
        // Simulate typing in the input field
        fireEvent.change(passwordInput, { target: { value: 'test123' } });
        // Check if the password value is updated
        expect(passwordInput.value).toBe('test123');
      });
      it('should call onAddPassword with the correct values when "Verify Admin Password" button is clicked', () => {
        const passwordInput = screen.getByLabelText(/Password/i);
        // Simulate typing in the input field
        fireEvent.change(passwordInput, { target: { value: 'test123' } });
        // Find the "Verify Admin Password" button and click it
        fireEvent.click(screen.getByTestId("verify-admin-password"));
        // Check if onAddPassword was called with the correct values
        expect(mockOnAddPassword).toHaveBeenCalledWith({
          password: 'test123',
          customer_id: 'user_id',
        });
      });
});
