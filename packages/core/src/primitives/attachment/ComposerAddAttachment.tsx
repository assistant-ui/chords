"use client";

import { ComposerPrimitive } from "@assistant-ui/react";
import { PlusIcon } from "@radix-ui/react-icons";
import { DEFAULT_ADD_CLASSNAME } from "./defaults";

export function ComposerAddAttachment({
  /**
   * Class applied to the add button.
   */
  className,
  /**
   * Custom icon to render inside the button.
   */
  children,
}: {
  className?: string;
  children?: React.ReactNode;
} = {}) {
  return (
    <ComposerPrimitive.AddAttachment
      className={className ?? DEFAULT_ADD_CLASSNAME}
    >
      {children ?? <PlusIcon className="size-4" />}
    </ComposerPrimitive.AddAttachment>
  );
}
