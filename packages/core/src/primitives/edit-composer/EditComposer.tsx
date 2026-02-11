"use client";

import { ComposerPrimitive, useComposer } from "@assistant-ui/react";
import {
  DEFAULT_ROOT_CLASSNAME,
  DEFAULT_INPUT_CLASSNAME,
  DEFAULT_ACTIONS_CLASSNAME,
  DEFAULT_BUTTON_CLASSNAME,
} from "./defaults";

export function EditComposer({
  /**
   * Class applied to the root container.
   */
  className,
  /**
   * Class applied to the input field.
   */
  inputClassName,
  /**
   * Class applied to the actions container.
   */
  actionsClassName,
  /**
   * Class applied to cancel/save buttons.
   */
  buttonClassName,
  /**
   * Placeholder text for the input.
   */
  inputPlaceholder = "Edit your message...",
  /**
   * Label for cancel button.
   */
  cancelLabel = "Cancel",
  /**
   * Label for save button.
   */
  saveLabel = "Save",
}: {
  className?: string;
  inputClassName?: string;
  actionsClassName?: string;
  buttonClassName?: string;
  inputPlaceholder?: string;
  cancelLabel?: string;
  saveLabel?: string;
} = {}) {
  // TODO: migrate to store — useComposer to useAuiState(({ composer }) => composer)
  const composer = useComposer();

  return (
    <ComposerPrimitive.Root className={className ?? DEFAULT_ROOT_CLASSNAME}>
      <ComposerPrimitive.Input
        placeholder={inputPlaceholder}
        className={inputClassName ?? DEFAULT_INPUT_CLASSNAME}
      />
      <div className={actionsClassName ?? DEFAULT_ACTIONS_CLASSNAME}>
        <ComposerPrimitive.Cancel
          className={buttonClassName ?? DEFAULT_BUTTON_CLASSNAME}
          disabled={!composer.canCancel}
        >
          {cancelLabel}
        </ComposerPrimitive.Cancel>
        <ComposerPrimitive.Send
          className={buttonClassName ?? DEFAULT_BUTTON_CLASSNAME}
          disabled={composer.isEmpty}
        >
          {saveLabel}
        </ComposerPrimitive.Send>
      </div>
    </ComposerPrimitive.Root>
  );
}
