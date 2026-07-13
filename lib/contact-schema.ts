import { z } from "zod";

export const SERVICES = [
  "Haircut",
  "Hair Spa",
  "Facial",
  "Bridal Makeup",
  "Keratin Treatment",
  "Hair Coloring",
  "Other",
] as const;

export const contactFormSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name must be under 80 characters")
    .regex(/^[a-zA-Z\s.'-]+$/, "Name may only contain letters and spaces"),

  mobile: z
    .string()
    .regex(
      /^[6-9]\d{9}$/,
      "Enter a valid 10-digit Indian mobile number"
    ),

  service: z.enum(SERVICES, {
    message: "Please select a service",
    }),

  preferredDate: z
    .string()
    .min(1, "Please select a preferred date")
    .refine((val) => {
      const date = new Date(val);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date >= today;
    }, "Date cannot be in the past"),

  preferredTime: z
    .string()
    .min(1, "Please select a preferred time"),

  message: z
    .string()
    .max(500, "Message must be under 500 characters")
    .optional(),

  // Hidden branch fields
  branchId: z.string().min(1, "Please select a branch"),
  branchSlug: z.string().min(1, "Branch slug is required"),
  branchName: z.string().min(1, "Branch name is required"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Server-side schema (same but used in API route)
export const contactApiSchema = contactFormSchema;
export type ContactApiPayload = ContactFormData;