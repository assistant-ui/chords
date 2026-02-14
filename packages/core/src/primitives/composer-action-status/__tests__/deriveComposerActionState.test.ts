import { describe, it, expect } from "vitest";
import { deriveComposerActionState } from "../deriveComposerActionState";

describe("deriveComposerActionState", () => {
  it('returns "running" when thread is running', () => {
    expect(
      deriveComposerActionState({
        isRunning: true,
        isEditing: false,
        isEmpty: true,
      }),
    ).toBe("running");
  });

  it('returns "running" even when editing and not empty', () => {
    expect(
      deriveComposerActionState({
        isRunning: true,
        isEditing: true,
        isEmpty: false,
      }),
    ).toBe("running");
  });

  it('returns "composing" when editing and not empty', () => {
    expect(
      deriveComposerActionState({
        isRunning: false,
        isEditing: true,
        isEmpty: false,
      }),
    ).toBe("composing");
  });

  it('returns "idle" when not editing', () => {
    expect(
      deriveComposerActionState({
        isRunning: false,
        isEditing: false,
        isEmpty: true,
      }),
    ).toBe("idle");
  });

  it('returns "idle" when editing but empty', () => {
    expect(
      deriveComposerActionState({
        isRunning: false,
        isEditing: true,
        isEmpty: true,
      }),
    ).toBe("idle");
  });

  it('returns "idle" when not running, not editing, not empty', () => {
    expect(
      deriveComposerActionState({
        isRunning: false,
        isEditing: false,
        isEmpty: false,
      }),
    ).toBe("idle");
  });
});
