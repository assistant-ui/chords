"use client";

import { useAuiState } from "@assistant-ui/react";
import {
  type MessageStatusState,
  deriveMessageStatusState,
} from "./deriveMessageStatusState";
import { DEFAULT_CONTAINER_CLASSNAME } from "./defaults";
import { MessageStatusVisual } from "./MessageStatusVisual";

export function MessageStatus({
  /**
   * Class applied to the container wrapper.
   */
  className,
  /**
   * Class applied when in running state.
   */
  runningClassName,
  /**
   * Class applied when in error state.
   */
  errorClassName,
  /**
   * Class applied to the spinner SVG.
   */
  spinnerClassName,
  /**
   * Optional custom visual renderer.
   * If provided, replaces the default visual.
   */
  renderVisual,
}: {
  className?: string;
  runningClassName?: string;
  errorClassName?: string;
  spinnerClassName?: string;
  renderVisual?: (
    state: MessageStatusState,
    error?: unknown,
  ) => React.ReactNode;
}) {
  const status = useAuiState((s) => s.message.status);

  const state = deriveMessageStatusState({
    statusType: status?.type ?? "complete",
    statusReason:
      status?.type === "incomplete"
        ? status.reason
        : undefined,
  });

  // Don't render anything for complete messages
  if (state === "complete") return null;

  const error =
    status?.type === "incomplete" ? status.error : undefined;

  const visual = renderVisual ? (
    renderVisual(state, error)
  ) : (
    <MessageStatusVisual
      state={state}
      error={error}
      runningClassName={runningClassName}
      errorClassName={errorClassName}
      spinnerClassName={spinnerClassName}
    />
  );

  return <div className={className ?? DEFAULT_CONTAINER_CLASSNAME}>{visual}</div>;
}
