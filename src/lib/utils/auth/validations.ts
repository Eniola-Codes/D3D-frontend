import { z } from 'zod';
import {
  CONFIRM_PASSWORD_FIELD,
  OTP_IS_REQUIRED,
  PASSWORD_DOES_NOT_MATCH,
  VALID_EMAIL_ADDRESS,
  VALID_NAME_LENGTH,
  VALID_OTP_FORMAT,
  VALID_OTP_LENGTH,
  VALID_PASSWORD_LENGTH,
} from '../../constants/messages';

const baseAuthSchema = {
  email: z.string().email(VALID_EMAIL_ADDRESS),
  password: z.string().min(8, VALID_PASSWORD_LENGTH),
};

const passwordMatchRefine = (data: { password: string; confirmPassword: string }) =>
  data.password === data.confirmPassword;

export const loginSchema = z.object({
  ...baseAuthSchema,
});

export const signupSchema = z
  .object({
    ...baseAuthSchema,
    name: z.string().trim().min(2, VALID_NAME_LENGTH),
    confirmPassword: z.string(),
  })
  .refine(passwordMatchRefine, {
    message: PASSWORD_DOES_NOT_MATCH,
    path: [CONFIRM_PASSWORD_FIELD],
  });

export const forgotPasswordSchema = z.object({
  email: baseAuthSchema.email,
});

export const resetPasswordSchema = z
  .object({
    password: baseAuthSchema.password,
    confirmPassword: z.string(),
  })
  .refine(passwordMatchRefine, {
    message: PASSWORD_DOES_NOT_MATCH,
    path: [CONFIRM_PASSWORD_FIELD],
  });

export const otpSchema = z.object({
  otp: z
    .string()
    .pipe(z.string().min(1, OTP_IS_REQUIRED))
    .pipe(z.string().length(6, VALID_OTP_LENGTH))
    .pipe(z.string().regex(/^\d+$/, VALID_OTP_FORMAT)),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type OtpFormData = z.infer<typeof otpSchema>;
export type FormErrors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  otp?: string;
};
