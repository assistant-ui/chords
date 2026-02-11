"use client";

import { MessagePrimitive } from "@assistant-ui/react";
import { Attachment } from "./Attachment";
import { DEFAULT_MESSAGE_ATTACHMENTS_CONTAINER_CLASSNAME } from "./defaults";

export function MessageAttachments({
  /**
   * Class applied to the container wrapping all attachments.
   */
  className,
}: {
  className?: string;
} = {}) {
  return (
    <div className={className ?? DEFAULT_MESSAGE_ATTACHMENTS_CONTAINER_CLASSNAME}>
      <MessagePrimitive.Attachments components={{ Attachment }} />
    </div>
  );
}
