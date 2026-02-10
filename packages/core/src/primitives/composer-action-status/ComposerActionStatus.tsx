"use client";
import { ComposerActionVisual } from "./ComposerActionVisual";
import {
  DEFAULT_BUTTON_CLASSNAME,
  DEFAULT_ICON_CLASSNAME,
  DEFAULT_IDLE_BUTTON_CLASSNAME,
} from "./defaults";
import {
  ComposerActionState,
  deriveComposerActionState,
} from "./deriveComposerActionState";
import { ComposerPrimitive, useComposer, useThread } from "@assistant-ui/react";

export function ComposerActionStatus({
  /**
   * Class applied to inner visual (Icon)
   */
  className,
  /**
   * Class applied to the action button wrapper (Send / Cancel).
   */
  buttonClassName,
  /**
   * Class applied to the idle button wrapper.
   * Falls back to buttonClassName if not provided.
   */
  idleButtonClassName,
  /**
   * Optional custom visual renderer.
   * If provided, replaces the default icons.
   */
  renderVisual,
}: {
  className?: string;
  buttonClassName?: string;
  idleButtonClassName?: string;
  renderVisual?: (state: ComposerActionState) => React.ReactNode;
}) {
  // TODO: migrate to store — useThread to useAuiState(({ thread }) => thread)
  const thread = useThread();
  // TODO: migrate to store — useComposer to useAuiState(({ composer }) => composer)
  const composer = useComposer();

  const state = deriveComposerActionState({
    isRunning: thread.isRunning,
    isEditing: composer.isEditing,
    isEmpty: composer.isEmpty,
  });

  const visual = renderVisual ? (
    renderVisual(state)
  ) : (
    <ComposerActionVisual
      state={state}
      className={className ?? DEFAULT_ICON_CLASSNAME}
    />
  );

  if (state === "running") {
    return (
      <ComposerPrimitive.Cancel
        className={buttonClassName ?? DEFAULT_BUTTON_CLASSNAME}
      >
        {visual}
      </ComposerPrimitive.Cancel>
    );
  }

  if (state === "composing") {
    return (
      <ComposerPrimitive.Send
        className={buttonClassName ?? DEFAULT_BUTTON_CLASSNAME}
      >
        {visual}
      </ComposerPrimitive.Send>
    );
  }

  return (
    <button
      type="button"
      disabled
      className={
        idleButtonClassName ?? buttonClassName ?? DEFAULT_IDLE_BUTTON_CLASSNAME
      }
    >
      {visual}
    </button>
  );
}
