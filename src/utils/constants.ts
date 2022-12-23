import { Status } from "@prisma/client";

export const projStatus = new Map<string, string>([
  [Status.NotStarted, "Not Started"],
  [Status.InProgress, "In Progress"],
  [Status.Completed, "Completed"],
]);
