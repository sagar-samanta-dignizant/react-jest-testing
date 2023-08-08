import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import Profile from "../../pages/admin/Profile";
import "@testing-library/jest-dom/extend-expect";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("Profile component", () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(
      <HelmetProvider>
        <MemoryRouter>
          <Profile />
        </MemoryRouter>
      </HelmetProvider>
    );
  }); 
  it("should render the correct title", () => {
    const pageTitle = screen.getByText("Admin Settings");
    expect(pageTitle).toBeInTheDocument();
  });
  // it("should render the Company Details form by default", () => {
  //   const companyDetailsForm = screen.getByTestId("company-details-form");
  //   expect(companyDetailsForm).toBeInTheDocument();
  // });

  test("displays correct form section when selecting Company Details tab", async () => {
    // Click the "Company Details" tab
    fireEvent.click(screen.getByRole("tab", { name: "Company Details" }));

    // Wait for the Company Details form section to appear
    await waitFor(() => {
      expect(screen.getByText("Company Details")).toBeInTheDocument();
    });
  });

  test("displays correct form section when selecting Admin Details tab", async () => {
    // Click the "Admin Details" tab
    fireEvent.click(screen.getByRole("tab", { name: "Admin Details" }));

    // Wait for the Admin Details form section to appear
    await waitFor(() => {
      expect(screen.getByText("Admin Details")).toBeInTheDocument();
    });
  });

  test("displays correct form section when selecting 2 Factor Authentication tab", async () => {
    // Click the "2 Factor Authentication" tab
    fireEvent.click(screen.getByRole("tab", { name: "2 Factor Authentication" }));

    // Wait for the 2 Factor Authentication form section to appear
    await waitFor(() => {
      expect(screen.getByText("2 Factor Authentication")).toBeInTheDocument();
    });
  });

  test("displays correct form section when selecting Subscription tab", async () => {
    // Click the "Subscription" tab
    fireEvent.click(screen.getByRole("tab", { name: "Subscription" }));

    // Wait for the Subscription form section to appear
    await waitFor(() => {
      expect(screen.getByText("Subscription")).toBeInTheDocument();
    });
  });
});
