import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import type { MessageStatusState } from "./deriveMessageStatusState";
import {
  DEFAULT_ERROR_CLASSNAME,
  DEFAULT_RUNNING_CLASSNAME,
  DEFAULT_SPINNER_CLASSNAME,
} from "./defaults";

function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="8"
        cy="8"
        r="6"
        stroke="currentColor"
        strokeOpacity="0.3"
        strokeWidth="2"
      />
      <path
        d="M8 2a6 6 0 0 1 6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function MessageStatusVisual({
  state,
  error,
  runningClassName,
  errorClassName,
  spinnerClassName,
}: {
  state: MessageStatusState;
  error?: unknown;
  runningClassName?: string;
  errorClassName?: string;
  spinnerClassName?: string;
}) {
  if (state === "running") {
    return (
      <span className={runningClassName ?? DEFAULT_RUNNING_CLASSNAME}>
        <Spinner className={spinnerClassName ?? DEFAULT_SPINNER_CLASSNAME} />
      </span>
    );
  }

  if (state === "error") {
    return (
      <span className={errorClassName ?? DEFAULT_ERROR_CLASSNAME}>
        <ExclamationTriangleIcon className="size-3.5 inline mr-1" />
        {error ? String(error) : "An error occurred"}
      </span>
    );
  }

  return null;
}
