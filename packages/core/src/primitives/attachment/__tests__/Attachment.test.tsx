import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

const mockAuiState: Record<string, any> = {};

vi.mock("@assistant-ui/react", () => ({
  useAui: vi.fn(),
  useAuiState: vi.fn((selector: (s: any) => any) => selector(mockAuiState)),
  AttachmentPrimitive: {
    Root: ({ children, className }: any) => (
      <div data-testid="attachment-root" className={className}>
        {children}
      </div>
    ),
    Remove: ({ children, className }: any) => (
      <button data-testid="remove-btn" className={className}>
        {children}
      </button>
    ),
  },
}));

import { Attachment } from "../Attachment";
import { useAui } from "@assistant-ui/react";

const mockUseAui = useAui as ReturnType<typeof vi.fn>;

describe("Attachment", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Default: file attachment from message (not composer)
    mockUseAui.mockReturnValue({
      attachment: { source: "message" },
    });
    mockAuiState.attachment = {
      type: "file",
      name: "document.pdf",
    };
  });

  it("renders file icon for non-image attachments", () => {
    render(<Attachment />);
    const root = screen.getByTestId("attachment-root");
    expect(root.querySelector("svg")).toBeInTheDocument();
  });

  it("renders image when src is available", () => {
    mockAuiState.attachment = {
      type: "image",
      name: "photo.png",
      content: [{ type: "image", image: "data:image/png;base64,abc" }],
    };
    render(<Attachment />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("alt", "photo.png");
  });

  it("does not render remove button for message attachments", () => {
    render(<Attachment />);
    expect(screen.queryByTestId("remove-btn")).toBeNull();
  });

  it("renders remove button for composer attachments", () => {
    mockUseAui.mockReturnValue({
      attachment: { source: "composer" },
    });
    render(<Attachment />);
    expect(screen.getByTestId("remove-btn")).toBeInTheDocument();
  });

  it("uses custom className", () => {
    render(<Attachment className="custom-root" />);
    expect(screen.getByTestId("attachment-root").className).toBe(
      "custom-root",
    );
  });
});
