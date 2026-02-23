import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@assistant-ui/react", () => ({
  useAuiState: vi.fn(),
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
import { useAuiState } from "@assistant-ui/react";

const mockUseAuiState = useAuiState as ReturnType<typeof vi.fn>;

function setMockState(message: {
  branchCount?: number;
  branchNumber?: number;
}) {
  const state = { message };
  mockUseAuiState.mockImplementation((selector: (s: any) => any) =>
    selector(state),
  );
}

describe("BranchNavigation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns null when single branch and hideWhenSingleBranch is true", () => {
    setMockState({ branchCount: 1, branchNumber: 1 });
    const { container } = render(<BranchNavigation />);
    expect(container.innerHTML).toBe("");
  });

  it("renders when multiple branches exist", () => {
    setMockState({ branchCount: 3, branchNumber: 2 });
    render(<BranchNavigation />);
    expect(screen.getByTestId("branch-root")).toBeInTheDocument();
  });

  it("shows counter with branch number and count", () => {
    setMockState({ branchCount: 3, branchNumber: 2 });
    render(<BranchNavigation />);
    expect(screen.getByText("2 / 3")).toBeInTheDocument();
  });

  it("renders when single branch and hideWhenSingleBranch is false", () => {
    setMockState({ branchCount: 1, branchNumber: 1 });
    render(<BranchNavigation hideWhenSingleBranch={false} />);
    expect(screen.getByTestId("branch-root")).toBeInTheDocument();
  });

  it("renders prev and next buttons", () => {
    setMockState({ branchCount: 3, branchNumber: 2 });
    render(<BranchNavigation />);
    expect(screen.getByLabelText("Previous branch")).toBeInTheDocument();
    expect(screen.getByLabelText("Next branch")).toBeInTheDocument();
  });

  it("uses custom renderCounter", () => {
    setMockState({ branchCount: 5, branchNumber: 3 });
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
    setMockState({ branchCount: 2, branchNumber: 1 });
    render(<BranchNavigation className="custom-root" />);
    expect(screen.getByTestId("branch-root").className).toBe("custom-root");
  });

  it("defaults branchCount and branchNumber to 1 when undefined", () => {
    setMockState({});
    const { container } = render(<BranchNavigation />);
    expect(container.innerHTML).toBe("");
  });
});
