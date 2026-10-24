import { z } from "zod";

export const reviewStatusSchema = z.enum(["APPROVED", "REJECTED"]);
export type ReviewStatus = z.infer<typeof reviewStatusSchema>;

export const reviewFormSchema = z
  .object({
    status: reviewStatusSchema,

    rejectionReason: z.string().trim().max(1000, "At most 1000 characters"),
  })
  .refine((d) => d.status !== "REJECTED" || d.rejectionReason.length >= 5, {
    message: "Rejection reason must be at least 5 characters",
    path: ["rejectionReason"],
  });

export type ReviewFormInput = z.infer<typeof reviewFormSchema>;
