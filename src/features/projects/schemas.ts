import { z } from "zod";

const httpUrl = z
  .string()
  .trim()
  .url("Must be a valid URL")
  .refine(
    (v) => /^https?:\/\//i.test(v),
    "Must start with http:// or https://",
  );

const repoUrl = httpUrl.refine(
  (v) =>
    /^https?:\/\/(www\.)?(github\.com|gitlab\.com|bitbucket\.org)\//i.test(v),
  "Must be a GitHub, GitLab or Bitbucket repository URL",
);

export const submitProjectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "At least 3 characters")
    .max(120, "At most 120 characters"),
  repoUrl,
  liveLink: z.union([httpUrl, z.literal("")]),
  description: z
    .string()
    .trim()
    .min(30, "At least 30 characters")
    .max(3000, "At most 3000 characters"),
});

export type SubmitProjectInput = z.infer<typeof submitProjectSchema>;
