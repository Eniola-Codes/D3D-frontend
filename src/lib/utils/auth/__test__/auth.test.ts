import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createFormHandler, createValidationHandler } from '../form-handlers';
import {
  forgotPasswordSchema,
  resetPasswordSchema,
  otpSchema,
  loginSchema,
  signupSchema,
} from '../validations';
import { EMAIL_IS_REQUIRED, OTP_IS_REQUIRED } from '@/lib/constants/messages';

vi.mock('@/lib/services/auth', () => ({
  authService: {
    forgotPassword: vi.fn(),
    resetPassword: vi.fn(),
    verifyOtp: vi.fn(),
    loginOrSignup: vi.fn(),
  },
}));

vi.mock('../../toasts', () => ({
  toastFunc: vi.fn(),
}));

vi.mock('../../error-handler', () => ({
  toastErrorHandler: vi.fn(),
}));

describe('createFormHandler', () => {
  let setFormData: ReturnType<typeof vi.fn>;
  let setErrors: ReturnType<typeof vi.fn>;

  const previousFormData = {
    email: 'test@example.com',
    name: 'Old Name',
    password: '12345678',
    confirmPassword: '12345678',
  };

  beforeEach(() => {
    setFormData = vi.fn();
    setErrors = vi.fn();
  });

  it('should update form data when input changes', () => {
    const handleInputChange = createFormHandler(setFormData, setErrors);
    const mockEvent = {
      target: {
        id: 'email',
        value: 'new@example.com',
      },
    } as React.ChangeEvent<HTMLInputElement>;

    handleInputChange(mockEvent);

    const formDataUpdater = setFormData.mock.calls[0][0];
    const updatedFormData = formDataUpdater(previousFormData);

    expect(setFormData).toHaveBeenCalledTimes(1);
    expect(updatedFormData).toEqual({
      ...previousFormData,
      email: 'new@example.com',
    });
  });

  it('should clear error when field is changed', () => {
    const handleInputChange = createFormHandler(setFormData, setErrors);
    const mockEvent = {
      target: {
        id: 'email',
        value: 'newemail123',
      },
    } as React.ChangeEvent<HTMLInputElement>;

    handleInputChange(mockEvent);

    expect(setErrors).toHaveBeenCalledTimes(1);
    const errorsUpdater = setErrors.mock.calls[0][0];
    const previousErrors = { email: EMAIL_IS_REQUIRED };
    const updatedErrors = errorsUpdater(previousErrors);

    expect(updatedErrors.email).toBe('');
  });
});

describe('createValidationHandler', () => {
  let setErrors: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    setErrors = vi.fn();
  });

  describe('forgotPasswordSchema', () => {
    it('should return true for valid email', () => {
      const formData = { email: 'test@example.com' };
      const validateForm = createValidationHandler(forgotPasswordSchema, formData, setErrors);
      const isValid = validateForm();

      expect(isValid).toBe(true);
      expect(setErrors).not.toHaveBeenCalled();
    });

    it('should return false and set errors for invalid email format', () => {
      const formData = { email: 'invalid-email' };
      const validateForm = createValidationHandler(forgotPasswordSchema, formData, setErrors);
      const isValid = validateForm();

      expect(isValid).toBe(false);
      expect(setErrors).toHaveBeenCalledTimes(1);
      expect(setErrors).toHaveBeenCalledWith(
        expect.objectContaining({
          email: expect.any(String),
        })
      );
    });
  });

  describe('resetPasswordSchema', () => {
    it('should return true for valid password and matching confirmPassword', () => {
      const formData = {
        password: '12345678',
        confirmPassword: '12345678',
      };
      const validateForm = createValidationHandler(resetPasswordSchema, formData, setErrors);
      const isValid = validateForm();

      expect(isValid).toBe(true);
      expect(setErrors).not.toHaveBeenCalled();
    });

    it('should return false for password too short', () => {
      const formData = {
        password: '123',
        confirmPassword: '12345678',
      };
      const validateForm = createValidationHandler(resetPasswordSchema, formData, setErrors);
      const isValid = validateForm();

      expect(isValid).toBe(false);
      expect(setErrors).toHaveBeenCalledTimes(1);
      expect(setErrors).toHaveBeenCalledWith(
        expect.objectContaining({
          password: expect.any(String),
        })
      );
    });

    it('should return false when passwords do not match', () => {
      const formData = {
        password: '1234567891',
        confirmPassword: '12345678',
      };
      const validateForm = createValidationHandler(resetPasswordSchema, formData, setErrors);
      const isValid = validateForm();

      expect(isValid).toBe(false);
      expect(setErrors).toHaveBeenCalledTimes(1);
      expect(setErrors).toHaveBeenCalledWith(
        expect.objectContaining({
          confirmPassword: expect.any(String),
        })
      );
    });
  });

  describe('otpSchema', () => {
    it('should return true for valid OTP', () => {
      const formData = { otp: '123456' };
      const validateForm = createValidationHandler(otpSchema, formData, setErrors);
      const isValid = validateForm();

      expect(isValid).toBe(true);
      expect(setErrors).not.toHaveBeenCalled();
    });

    it('should return false for empty OTP', () => {
      const formData = { otp: '' };
      const validateForm = createValidationHandler(otpSchema, formData, setErrors);
      const isValid = validateForm();

      expect(isValid).toBe(false);
      expect(setErrors).toHaveBeenCalledTimes(1);
      expect(setErrors).toHaveBeenCalledWith(
        expect.objectContaining({
          otp: OTP_IS_REQUIRED,
        })
      );
    });
  });

  describe('loginSchema', () => {
    it('should return true for valid login data', () => {
      const formData = {
        email: 'test@example.com',
        password: '12345678',
      };
      const validateForm = createValidationHandler(loginSchema, formData, setErrors);
      const isValid = validateForm();

      expect(isValid).toBe(true);
      expect(setErrors).not.toHaveBeenCalled();
    });

    it('should return false for invalid email format', () => {
      const formData = {
        email: 'invalid-email',
        password: '12345678',
      };
      const validateForm = createValidationHandler(loginSchema, formData, setErrors);
      const isValid = validateForm();

      expect(isValid).toBe(false);
      expect(setErrors).toHaveBeenCalledTimes(1);
      expect(setErrors).toHaveBeenCalledWith(
        expect.objectContaining({
          email: expect.any(String),
        })
      );
    });

    it('should return false for password too short', () => {
      const formData = {
        email: 'test@example.com',
        password: 'short',
      };
      const validateForm = createValidationHandler(loginSchema, formData, setErrors);
      const isValid = validateForm();

      expect(isValid).toBe(false);
      expect(setErrors).toHaveBeenCalledTimes(1);
      expect(setErrors).toHaveBeenCalledWith(
        expect.objectContaining({
          password: expect.any(String),
        })
      );
    });
  });

  describe('signupSchema', () => {
    it('should return true for valid signup data', () => {
      const formData = {
        name: 'Test User',
        email: 'test@example.com',
        password: '12345678',
        confirmPassword: '12345678',
      };
      const validateForm = createValidationHandler(signupSchema, formData, setErrors);
      const isValid = validateForm();

      expect(isValid).toBe(true);
      expect(setErrors).not.toHaveBeenCalled();
    });

    it('should return false for name too short', () => {
      const formData = {
        name: 'T',
        email: 'test@example.com',
        password: '12345678',
        confirmPassword: '12345678',
      };
      const validateForm = createValidationHandler(signupSchema, formData, setErrors);
      const isValid = validateForm();

      expect(isValid).toBe(false);
      expect(setErrors).toHaveBeenCalledTimes(1);
      expect(setErrors).toHaveBeenCalledWith(
        expect.objectContaining({
          name: expect.any(String),
        })
      );
    });

    it('should return false when passwords do not match', () => {
      const formData = {
        name: 'Test User',
        email: 'test@example.com',
        password: '12345678',
        confirmPassword: 'different',
      };
      const validateForm = createValidationHandler(signupSchema, formData, setErrors);
      const isValid = validateForm();

      expect(isValid).toBe(false);
      expect(setErrors).toHaveBeenCalledTimes(1);
      expect(setErrors).toHaveBeenCalledWith(
        expect.objectContaining({
          confirmPassword: expect.any(String),
        })
      );
    });
  });
});
