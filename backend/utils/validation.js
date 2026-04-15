import { z } from "zod";

export const registerSchema = z.object({
    fullname: z.string().min(2, "Fullname must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phoneNumber: z.string().min(10, "Phone number must be at least 10 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.enum(["student", "recruiter"], {
        errorMap: () => ({ message: "Role must be either student or recruiter" }),
    }),
});

export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
    role: z.enum(["student", "recruiter"], {
        errorMap: () => ({ message: "Role must be either student or recruiter" }),
    }),
});
