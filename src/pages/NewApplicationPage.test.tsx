import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { NewApplicationPage } from "./NewApplicationPage";

describe("NewApplicationPage", () => {
  it("shows errors when submitted empty", async () => {
    render(
      <MemoryRouter>
        <NewApplicationPage />
      </MemoryRouter>
    );

    await userEvent.click(screen.getByRole("button", { name: /save application/i }));

    const alerts = await screen.findAllByRole("alert");
    expect(alerts.length).toBeGreaterThan(0);
    expect(screen.getByLabelText(/company/i)).toBeInvalid();
  });
});