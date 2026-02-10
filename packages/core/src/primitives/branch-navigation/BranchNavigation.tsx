"use client";

import { BranchPickerPrimitive, useMessage } from "@assistant-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import {
  DEFAULT_BUTTON_CLASSNAME,
  DEFAULT_CONTAINER_CLASSNAME,
  DEFAULT_COUNTER_CLASSNAME,
  DEFAULT_ICON_CLASSNAME,
} from "./defaults";

export function BranchNavigation({
  /**
   * Class applied to the root container
   */
  className,
  /**
   * Class applied to prev/next buttons
   */
  buttonClassName,
  /**
   * Class applied to the counter text
   */
  counterClassName,
  /**
   * Class applied to icon
   */
  iconClassName,
  /**
   * Hide this component when there's only one branch
   */
  hideWhenSingleBranch = true,
  /**
   * Custom counter renderer
   */
  renderCounter,
}: {
  className?: string;
  buttonClassName?: string;
  counterClassName?: string;
  iconClassName?: string;
  hideWhenSingleBranch?: boolean;
  renderCounter?: (current: number, total: number) => React.ReactNode;
} = {}) {
  // TODO: migrate to store — useMessage to  useAuiState(({ message }) => message)
  const message = useMessage();

  const branchCount = message.branchCount ?? 1;
  const branchNumber = message.branchNumber ?? 1;

  // Hide when single branch (if enabled)
  if (hideWhenSingleBranch && branchCount <= 1) {
    return null;
  }

  const counter = renderCounter ? (
    renderCounter(branchNumber, branchCount)
  ) : (
    <span className={counterClassName ?? DEFAULT_COUNTER_CLASSNAME}>
      {branchNumber} / {branchCount}
    </span>
  );

  return (
    <BranchPickerPrimitive.Root
      className={className ?? DEFAULT_CONTAINER_CLASSNAME}
    >
      <BranchPickerPrimitive.Previous
        asChild
        className={buttonClassName ?? DEFAULT_BUTTON_CLASSNAME}
      >
        <button type="button" aria-label="Previous branch">
          <ChevronLeftIcon
            className={iconClassName ?? DEFAULT_ICON_CLASSNAME}
          />
        </button>
      </BranchPickerPrimitive.Previous>

      {counter}

      <BranchPickerPrimitive.Next
        asChild
        className={buttonClassName ?? DEFAULT_BUTTON_CLASSNAME}
      >
        <button type="button" aria-label="Next branch">
          <ChevronRightIcon
            className={iconClassName ?? DEFAULT_ICON_CLASSNAME}
          />
        </button>
      </BranchPickerPrimitive.Next>
    </BranchPickerPrimitive.Root>
  );
}
