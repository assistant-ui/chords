export type MessageStatusState = "running" | "error" | "complete";

export function deriveMessageStatusState({
  statusType,
  statusReason,
}: {
  statusType: string;
  statusReason?: string;
}): MessageStatusState {
  if (statusType === "running") return "running";

  if (statusType === "incomplete" && statusReason === "error") return "error";

  return "complete";
}
