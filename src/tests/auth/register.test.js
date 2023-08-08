/* eslint-disable testing-library/no-wait-for-multiple-assertions */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable no-undef */
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import { Register } from "../../pages";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

describe("Register page test", () => {
  beforeEach(() => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </HelmetProvider>
    );
  });

  test("should load register page", async () => {
    const headings = screen.queryAllByRole("heading", {
      id: "Register Company",
    });

    const isRegisterHeadingVisible = headings.some(
      (heading) => heading.textContent === "Register Company"
    );

    expect(isRegisterHeadingVisible).toBe(true);
  });
  it("should display error message on form submission failure", async () => {
    // Fill in the input fields with invalid data (triggering form submission failure)
    const companyNameInput = screen.getByLabelText("Company Name");
    fireEvent.change(companyNameInput, {
      target: { value: "Invalid Company" },
    });
    const addressLine1Input = screen.getByLabelText("Address Line 1");
    fireEvent.change(addressLine1Input, { target: { value: "" } });

    const state = screen.getByLabelText("State");
    fireEvent.change(state, { target: { value: "" } });
    const city = screen.getByLabelText("City");
    fireEvent.change(city, { target: { value: "" } });
    const county = screen.getByLabelText("Country");
    fireEvent.change(county, { target: { value: "" } });
    const code = screen.getByLabelText("Postal Code");
    fireEvent.change(state, { target: { value: "" } });

    // ... Add more input field changes here if required ...

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: "Next" }));

    // Wait for the form submission to complete
    await waitFor(() => {
      expect(companyNameInput).toBeInTheDocument("Company Name is required");
      expect(addressLine1Input).toBeInTheDocument("Address is required");
      expect(state).toBeInTheDocument("State is required");
      expect(city).toBeInTheDocument("City is required");
      expect(county).toBeInTheDocument("Country is required");
      expect(code).toBeInTheDocument("Postal code is required");
    });
  });

  test('should update the step when "Next" button is clicked', () => {
    // Click the "Next" button to go to the next step
    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);

    // Assert that the step has been updated
    
    const userDetailsStep = screen.getByText("User details");
    expect(userDetailsStep).toBeInTheDocument();
  });
 
});
