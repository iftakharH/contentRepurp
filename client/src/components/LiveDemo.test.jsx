import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import LiveDemo from "./LiveDemo";

describe("LiveDemo", () => {
  it("switches the preview when another platform tab is chosen", () => {
    render(<LiveDemo autoPlay={false} />);

    const linkedInTab = screen.getByRole("tab", { name: "LinkedIn" });
    expect(linkedInTab).toHaveAttribute("aria-selected", "true");

    fireEvent.click(screen.getByRole("tab", { name: "X / Twitter" }));

    expect(screen.getByRole("tab", { name: "X / Twitter" })).toHaveAttribute(
      "aria-selected",
      "true"
    );
    expect(linkedInTab).toHaveAttribute("aria-selected", "false");
    expect(screen.getByText(/You don't need more ideas/i)).toBeInTheDocument();
  });
});
