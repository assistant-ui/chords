"use client";

import { useEffect, useState } from "react";
import {
  AttachmentPrimitive,
  useAui,
  useAuiState,
} from "@assistant-ui/react";
import { Cross2Icon, FileTextIcon } from "@radix-ui/react-icons";
import {
  DEFAULT_ROOT_CLASSNAME,
  DEFAULT_IMAGE_CLASSNAME,
  DEFAULT_FILE_ICON_CLASSNAME,
  DEFAULT_REMOVE_CLASSNAME,
} from "./defaults";

function useFileSrc(file: File | undefined) {
  const [src, setSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!file) {
      setSrc(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setSrc(objectUrl);
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

  return src;
}

function useAttachmentSrc() {
  const file = useAuiState((s) =>
    s.attachment.type === "image" && s.attachment.file
      ? s.attachment.file
      : undefined,
  );

  const contentSrc = useAuiState((s) => {
    if (s.attachment.type !== "image") return undefined;
    const parts = s.attachment.content;
    if (!parts) return undefined;
    const imagePart = parts.find((c) => c.type === "image");
    if (!imagePart || imagePart.type !== "image") return undefined;
    return imagePart.image;
  });

  const fileSrc = useFileSrc(file);
  return fileSrc ?? contentSrc;
}

export function Attachment({
  /**
   * Class applied to the root container.
   */
  className,
  /**
   * Class applied to the image thumbnail.
   */
  imageClassName,
  /**
   * Class applied to the file icon fallback.
   */
  fileIconClassName,
  /**
   * Class applied to the remove button.
   */
  removeClassName,
}: {
  className?: string;
  imageClassName?: string;
  fileIconClassName?: string;
  removeClassName?: string;
} = {}) {
  const aui = useAui();
  const name = useAuiState((s) => s.attachment.name);
  const src = useAttachmentSrc();
  const isComposer = aui.attachment.source === "composer";

  return (
    <AttachmentPrimitive.Root
      className={className ?? DEFAULT_ROOT_CLASSNAME}
    >
      {src ? (
        <img
          src={src}
          alt={name}
          className={imageClassName ?? DEFAULT_IMAGE_CLASSNAME}
        />
      ) : (
        <span className={fileIconClassName ?? DEFAULT_FILE_ICON_CLASSNAME}>
          <FileTextIcon className="size-6" />
        </span>
      )}

      {isComposer && (
        <AttachmentPrimitive.Remove
          className={removeClassName ?? DEFAULT_REMOVE_CLASSNAME}
        >
          <Cross2Icon className="size-2.5" />
        </AttachmentPrimitive.Remove>
      )}
    </AttachmentPrimitive.Root>
  );
}
