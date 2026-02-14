import { describe, it, expect } from "vitest";
import { deriveMessageStatusState } from "../deriveMessageStatusState";

describe("deriveMessageStatusState", () => {
  it('returns "running" when statusType is "running"', () => {
    expect(
      deriveMessageStatusState({ statusType: "running" }),
    ).toBe("running");
  });

  it('returns "error" when statusType is "incomplete" and reason is "error"', () => {
    expect(
      deriveMessageStatusState({
        statusType: "incomplete",
        statusReason: "error",
      }),
    ).toBe("error");
  });

  it('returns "complete" when statusType is "incomplete" with non-error reason', () => {
    expect(
      deriveMessageStatusState({
        statusType: "incomplete",
        statusReason: "cancelled",
      }),
    ).toBe("complete");
  });

  it('returns "complete" when statusType is "incomplete" with no reason', () => {
    expect(
      deriveMessageStatusState({ statusType: "incomplete" }),
    ).toBe("complete");
  });

  it('returns "complete" when statusType is "complete"', () => {
    expect(
      deriveMessageStatusState({ statusType: "complete" }),
    ).toBe("complete");
  });

  it('returns "complete" for unknown statusType', () => {
    expect(
      deriveMessageStatusState({ statusType: "unknown" }),
    ).toBe("complete");
  });
});
