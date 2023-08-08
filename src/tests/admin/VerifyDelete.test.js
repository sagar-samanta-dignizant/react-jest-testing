import React from 'react';
import { render, screen ,fireEvent} from '@testing-library/react';
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import homeService from '../../services/home.service';
import "@testing-library/jest-dom/extend-expect";
import VerifyDelete from '../../pages/admin/VerifyDelete';

const mockOnSuccessClose = jest.fn();

describe("Profile component", () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(
      <HelmetProvider>
        <MemoryRouter><VerifyDelete onSuccessClose={mockOnSuccessClose} /></MemoryRouter>
      </HelmetProvider>
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the component correctly', () => {
    // Check if the title is rendered
    expect(screen.getByText(/Are you sure you want to delete user ?/i)).toBeInTheDocument();
    // Check if the "Yes" button is rendered
    expect(screen.getByText(/Yes/i)).toBeInTheDocument();
    // Check if the "No" button is rendered
    expect(screen.getByText(/No/i)).toBeInTheDocument();
  });
  it('should call onSuccessClose with true when "Yes" button is clicked', () => {
    // Find the "Yes" button and click it
    fireEvent.click(screen.getByText(/Yes/i));
    // Check if onSuccessClose was called with true
    expect(mockOnSuccessClose).toHaveBeenCalledWith(true);
  });
  it('should call onSuccessClose with false when "No" button is clicked', () => {
    // Find the "No" button and click it
    fireEvent.click(screen.getByText(/No/i));
    // Check if onSuccessClose was called with false
    expect(mockOnSuccessClose).toHaveBeenCalledWith(false);
  });
});
