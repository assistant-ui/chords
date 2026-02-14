import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@assistant-ui/react", () => ({
  useMessage: vi.fn(),
  BranchPickerPrimitive: {
    Root: ({ children, className }: any) => (
      <div data-testid="branch-root" className={className}>
        {children}
      </div>
    ),
    Previous: ({ children }: any) => <>{children}</>,
    Next: ({ children }: any) => <>{children}</>,
  },
}));

import { BranchNavigation } from "../BranchNavigation";
import { useMessage } from "@assistant-ui/react";

const mockMessage = useMessage as ReturnType<typeof vi.fn>;

describe("BranchNavigation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns null when single branch and hideWhenSingleBranch is true", () => {
    mockMessage.mockReturnValue({ branchCount: 1, branchNumber: 1 });
    const { container } = render(<BranchNavigation />);
    expect(container.innerHTML).toBe("");
  });

  it("renders when multiple branches exist", () => {
    mockMessage.mockReturnValue({ branchCount: 3, branchNumber: 2 });
    render(<BranchNavigation />);
    expect(screen.getByTestId("branch-root")).toBeInTheDocument();
  });

  it("shows counter with branch number and count", () => {
    mockMessage.mockReturnValue({ branchCount: 3, branchNumber: 2 });
    render(<BranchNavigation />);
    expect(screen.getByText("2 / 3")).toBeInTheDocument();
  });

  it("renders when single branch and hideWhenSingleBranch is false", () => {
    mockMessage.mockReturnValue({ branchCount: 1, branchNumber: 1 });
    render(<BranchNavigation hideWhenSingleBranch={false} />);
    expect(screen.getByTestId("branch-root")).toBeInTheDocument();
  });

  it("renders prev and next buttons", () => {
    mockMessage.mockReturnValue({ branchCount: 3, branchNumber: 2 });
    render(<BranchNavigation />);
    expect(screen.getByLabelText("Previous branch")).toBeInTheDocument();
    expect(screen.getByLabelText("Next branch")).toBeInTheDocument();
  });

  it("uses custom renderCounter", () => {
    mockMessage.mockReturnValue({ branchCount: 5, branchNumber: 3 });
    render(
      <BranchNavigation
        renderCounter={(current, total) => (
          <span data-testid="custom-counter">
            {current} of {total}
          </span>
        )}
      />,
    );
    expect(screen.getByTestId("custom-counter").textContent).toBe("3 of 5");
  });

  it("uses custom className", () => {
    mockMessage.mockReturnValue({ branchCount: 2, branchNumber: 1 });
    render(<BranchNavigation className="custom-root" />);
    expect(screen.getByTestId("branch-root").className).toBe("custom-root");
  });

  it("defaults branchCount and branchNumber to 1 when undefined", () => {
    mockMessage.mockReturnValue({});
    const { container } = render(<BranchNavigation />);
    expect(container.innerHTML).toBe("");
  });
});
