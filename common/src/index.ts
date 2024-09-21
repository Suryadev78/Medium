// This file is used to define the input types for the API that will be used by both the frontend and backend

import z from "zod";

export const signupInput = z.object({
  name: z.string().min(4),
  email: z.string().email(),
  password: z.string().min(4),
});

export const signInInput = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

export const blogCreationInput = z.object({
  title: z.string().min(4),
  content: z.string().min(15),
});

export const blogUpdateInput = z.object({
  title: z.string().min(4),
  content: z.string().min(15),
});

export const blogDeleteInput = z.object({
  id: z.number(),
});

export type SignUpInputType = z.infer<typeof signupInput>;
export type SignInInputType = z.infer<typeof signInInput>;
export type BlogCreationInputType = z.infer<typeof blogCreationInput>;
export type BlogUpdateInputType = z.infer<typeof blogUpdateInput>;
export type BlogDeleteInputType = z.infer<typeof blogDeleteInput>;
