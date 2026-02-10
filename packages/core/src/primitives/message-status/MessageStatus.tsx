"use client";

import { useMessage } from "@assistant-ui/react";
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
  // TODO: migrate to store — useMessage to useAuiState(({ message }) => message)
  const message = useMessage();

  const state = deriveMessageStatusState({
    statusType: message.status?.type ?? "complete",
    statusReason:
      message.status?.type === "incomplete"
        ? message.status.reason
        : undefined,
  });

  // Don't render anything for complete messages
  if (state === "complete") return null;

  const error =
    message.status?.type === "incomplete" ? message.status.error : undefined;

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
