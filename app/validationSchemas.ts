import { z } from "zod";

export const createTaskSchema = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  name: z.string().min(1, "Name is required.").max(255),
  description: z.string().min(1, "Description is required."),
  status: z.enum(["OPEN", "IN_PROGRESS", "DONE"]),
  dueDate: z.date().nullable(),
});
