import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useResetPasswordForm } from '../hooks/reset-password';
import { ResetPassword } from '../reset-password';
import { toastFunc } from '@/lib/utils/toasts';
import { submitResetPasswordFormData } from '@/lib/utils/auth/form-handlers';
import { toastErrorHandler } from '@/lib/utils/error-handler';
import {
  PASSWORD_CHANGED_SUCCESSFULLY,
  PASSWORD_DOES_NOT_MATCH,
  PASSWORD_IS_REQUIRED,
  PASSWORD_RESET_FAILED,
} from '@/lib/constants/messages';

describe('submitResetPasswordFormData()', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  vi.mock('@/lib/services/auth', () => ({
    authService: {
      resetPassword: vi.fn((email, token, password) => {
        return new Promise((resolve, reject) => {
          if (!password || !token || !email) {
            return reject(PASSWORD_RESET_FAILED);
          }
          return resolve({
            message: PASSWORD_CHANGED_SUCCESSFULLY,
          });
        });
      }),
    },
  }));

  vi.mock('@/lib/utils/error-handler', () => ({
    toastErrorHandler: vi.fn(),
  }));

  vi.mock('@/lib/utils/toasts', () => ({
    toastFunc: vi.fn(),
  }));

  describe('Reset Password flow', () => {
    it('should handle successful reset password', async () => {
      const formData = {
        email: 'test@example.com',
        token: '1234567890',
        password: 'test@example.com',
      };

      const result = await submitResetPasswordFormData(
        formData.email,
        formData.token,
        formData.password
      );

      expect(result).toBe(true);
      expect(toastFunc).toHaveBeenCalledWith(PASSWORD_CHANGED_SUCCESSFULLY, true);
    });

    it('should throw error if data is incomplete', async () => {
      const formData = {
        email: '',
        token: '1234567890',
        password: '',
      };

      const result = await submitResetPasswordFormData(
        formData.email,
        formData.token,
        formData.password
      );

      expect(result).toBeUndefined();
      expect(toastErrorHandler).toHaveBeenCalledWith(PASSWORD_RESET_FAILED);
    });
  });
});

vi.mock('../hooks/reset-password', () => ({
  useResetPasswordForm: vi.fn(),
}));

const mockRouterPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockRouterPush,
    replace: vi.fn(),
  }),
}));

describe('ResetPassword Component', () => {
  const email = 'test@example.com';
  const token = '123456';
  const defaultMockReturn = {
    formData: {
      password: '',
      confirmPassword: '',
    },
    errors: {},
    isLoading: false,
    handleInputChange: vi.fn(),
    handleSubmit: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useResetPasswordForm).mockReturnValue(defaultMockReturn);
  });

  describe('Rendering', () => {
    it('should render password and confirm password inputs', () => {
      render(<ResetPassword email={email} token={token} />);
      expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /reset password/i })).toBeInTheDocument();
      const passwordInput = screen.getByLabelText(/^password$/i);
      const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
      expect(passwordInput).not.toHaveClass('border-red-500');
      expect(confirmPasswordInput).not.toHaveClass('border-red-500');
    });
  });

  describe('Error Display', () => {
    beforeEach(() => {
      vi.clearAllMocks();
      vi.mocked(useResetPasswordForm).mockReturnValue(defaultMockReturn);
    });

    it('should display password error', () => {
      vi.mocked(useResetPasswordForm).mockReturnValue({
        ...defaultMockReturn,
        errors: { password: PASSWORD_IS_REQUIRED },
      });
      render(<ResetPassword email={email} token={token} />);
      expect(screen.getByText(PASSWORD_IS_REQUIRED)).toBeInTheDocument();
      const passwordInput = screen.getByLabelText(/^password$/i);
      expect(passwordInput).toHaveClass('border-red-500');
    });

    it('should display confirm password error', () => {
      vi.mocked(useResetPasswordForm).mockReturnValue({
        ...defaultMockReturn,
        errors: { confirmPassword: PASSWORD_DOES_NOT_MATCH },
      });
      render(<ResetPassword email={email} token={token} />);
      expect(screen.getByText(PASSWORD_DOES_NOT_MATCH)).toBeInTheDocument();
      const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
      expect(confirmPasswordInput).toHaveClass('border-red-500');
    });
  });

  describe('Loading State', () => {
    beforeEach(() => {
      vi.clearAllMocks();
      vi.mocked(useResetPasswordForm).mockReturnValue(defaultMockReturn);
    });

    it('should disable submit button when loading', () => {
      vi.mocked(useResetPasswordForm).mockReturnValue({
        ...defaultMockReturn,
        isLoading: true,
      });
      render(<ResetPassword email={email} token={token} />);
      const submitButton = screen.getByRole('button', { name: /reset password/i });
      const spinner = submitButton.querySelector('svg');
      expect(submitButton).toBeDisabled();
      expect(spinner).toBeInTheDocument();
    });

    it('should enable submit button when not loading', () => {
      render(<ResetPassword email={email} token={token} />);
      const submitButton = screen.getByRole('button', { name: /reset password/i });
      const spinner = submitButton.querySelector('svg');
      expect(submitButton).not.toBeDisabled();
      expect(spinner).not.toBeInTheDocument();
    });
  });

  describe('Form Submission', () => {
    const mockHandleSubmit = vi.fn();
    const defaultMockReturn = {
      formData: {
        password: '',
        confirmPassword: '',
      },
      errors: {},
      isLoading: false,
      handleInputChange: vi.fn(),
      handleSubmit: mockHandleSubmit,
    };

    beforeEach(() => {
      vi.clearAllMocks();
      vi.mocked(useResetPasswordForm).mockReturnValue(defaultMockReturn);
    });

    it('should call handleSubmit on form submit', () => {
      render(<ResetPassword email={email} token={token} />);
      const form = screen.getByRole('button', { name: /reset password/i }).closest('form');
      fireEvent.submit(form!);
      expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
    });
  });

  describe('Input Interactions', () => {
    let mockHandleInputChange = vi.fn();
    let mockHandleSubmit = vi.fn();
    let defaultMockReturn = {
      formData: {
        password: '',
        confirmPassword: '',
      },
      errors: {},
      isLoading: false,
      handleInputChange: mockHandleInputChange,
      handleSubmit: mockHandleSubmit,
    };

    beforeEach(() => {
      mockHandleInputChange = vi.fn();
      mockHandleSubmit = vi.fn();
      defaultMockReturn = {
        formData: {
          password: '',
          confirmPassword: '',
        },
        errors: {},
        isLoading: false,
        handleInputChange: mockHandleInputChange,
        handleSubmit: mockHandleSubmit,
      };
      vi.clearAllMocks();
      vi.mocked(useResetPasswordForm).mockReturnValue(defaultMockReturn);
    });

    it('should call handleInputChange on password change', () => {
      render(<ResetPassword email={email} token={token} />);
      const passwordInput = screen.getByLabelText(/^password$/i);
      fireEvent.change(passwordInput, { target: { value: 'newpassword123' } });
      expect(mockHandleInputChange).toHaveBeenCalledTimes(1);
    });

    it('should call handleInputChange on confirm password change', () => {
      render(<ResetPassword email={email} token={token} />);
      const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
      fireEvent.change(confirmPasswordInput, { target: { value: 'newpassword123' } });
      expect(mockHandleInputChange).toHaveBeenCalledTimes(1);
    });

    it('should display form data values', () => {
      vi.mocked(useResetPasswordForm).mockReturnValue({
        ...defaultMockReturn,
        formData: {
          password: 'newpassword123',
          confirmPassword: 'newpassword123',
        },
      });
      render(<ResetPassword email={email} token={token} />);
      const passwordInputs = screen.getAllByDisplayValue('newpassword123');
      expect(passwordInputs).toHaveLength(2);
    });

    it('should toggle password visibility when eye icon is clicked', () => {
      render(<ResetPassword email={email} token={token} />);
      const passwordInput = document.getElementById('password') as HTMLInputElement;
      const toggleButtons = screen.getAllByRole('button', { name: /show password/i });
      expect(passwordInput.type).toBe('password');
      fireEvent.click(toggleButtons[0]);
      expect(passwordInput.type).toBe('text');
      fireEvent.click(toggleButtons[0]);
      expect(passwordInput.type).toBe('password');
    });

    it('should toggle confirm password visibility when eye icon is clicked', () => {
      render(<ResetPassword email={email} token={token} />);
      const confirmPasswordInput = document.getElementById('confirmPassword') as HTMLInputElement;
      const toggleButtons = screen.getAllByRole('button', { name: /show password/i });
      expect(confirmPasswordInput.type).toBe('password');
      fireEvent.click(toggleButtons[1]);
      expect(confirmPasswordInput.type).toBe('text');
      fireEvent.click(toggleButtons[1]);
      expect(confirmPasswordInput.type).toBe('password');
    });
  });
});
