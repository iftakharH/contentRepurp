import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import InputForm from "./InputForm";
import { DEFAULT_MODEL } from "../data/options";

describe("InputForm", () => {
  it("submits the draft with the chosen platform, tone, and model", () => {
    const onSubmit = jest.fn();
    render(<InputForm onSubmit={onSubmit} loading={false} />);

    fireEvent.change(screen.getByLabelText(/source content/i), {
      target: { value: "A draft about repurposing content." },
    });
    fireEvent.click(screen.getByRole("button", { name: "LinkedIn" }));
    fireEvent.click(screen.getByRole("button", { name: "Casual" }));
    fireEvent.click(screen.getByRole("button", { name: /repurpose content/i }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        originalContent: "A draft about repurposing content.",
        platform: "linkedin",
        tone: "casual",
        model: DEFAULT_MODEL,
        customApiKey: "",
      })
    );
  });

  it("keeps the submit button disabled until a draft is typed", () => {
    render(<InputForm onSubmit={jest.fn()} loading={false} />);

    expect(
      screen.getByRole("button", { name: /repurpose content/i })
    ).toBeDisabled();
  });
});
