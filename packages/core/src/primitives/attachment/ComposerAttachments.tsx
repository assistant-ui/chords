"use client";

import { ComposerPrimitive } from "@assistant-ui/react";
import { Attachment } from "./Attachment";
import { DEFAULT_ATTACHMENTS_CONTAINER_CLASSNAME } from "./defaults";

export function ComposerAttachments({
  /**
   * Class applied to the container wrapping all attachments.
   */
  className,
}: {
  className?: string;
} = {}) {
  return (
    <div className={className ?? DEFAULT_ATTACHMENTS_CONTAINER_CLASSNAME}>
      <ComposerPrimitive.Attachments components={{ Attachment }} />
    </div>
  );
}
