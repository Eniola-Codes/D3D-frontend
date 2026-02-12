import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useForgetPasswordForm } from '../hooks/forget-password';
import { ForgetPassword } from '../forget-password';
import { toastFunc } from '@/lib/utils/toasts';
import { routes } from '@/lib/constants/page-routes';
import { submitForgetPasswordFormData } from '@/lib/utils/auth/form-handlers';
import { toastErrorHandler } from '@/lib/utils/error-handler';
import {
  EMAIL_IS_REQUIRED,
  EMAIL_SENT_SUCCESSFULLY,
  INVALID_EMAIL,
  INVALID_EMAIL_FORMAT,
} from '@/lib/constants/messages';

describe('submitForgetPasswordFormData()', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  vi.mock('@/lib/services/auth', () => ({
    authService: {
      forgotPassword: vi.fn(email => {
        return new Promise((resolve, reject) => {
          if (!email) {
            return reject(INVALID_EMAIL);
          }
          return resolve({
            message: EMAIL_SENT_SUCCESSFULLY,
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

  describe('Forget Password flow', () => {
    it('should handle successful forget password', async () => {
      const formData = {
        email: 'test@example.com',
      };

      const result = await submitForgetPasswordFormData(formData.email);

      expect(result).toBe(formData.email);
      expect(toastFunc).toHaveBeenCalledWith(EMAIL_SENT_SUCCESSFULLY, true);
    });

    it('should throw error if email data is empty', async () => {
      const formData = {
        email: '',
      };

      const result = await submitForgetPasswordFormData(formData.email);

      expect(result).toBeUndefined();
      expect(toastErrorHandler).toHaveBeenCalledWith(INVALID_EMAIL);
    });
  });
});

vi.mock('../hooks/forget-password', () => ({
  useForgetPasswordForm: vi.fn(),
}));

const mockRouterPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockRouterPush,
    replace: vi.fn(),
  }),
}));

describe('ForgetPassword Component', () => {
  const defaultMockReturn = {
    formData: {
      email: '',
    },
    errors: {},
    isLoading: false,
    handleInputChange: vi.fn(),
    handleSubmit: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useForgetPasswordForm).mockReturnValue(defaultMockReturn);
  });

  describe('Rendering', () => {
    it('should render forget password form', () => {
      render(<ForgetPassword />);
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /submit email/i })).toBeInTheDocument();
      expect(screen.getByText(/remember your password now/i)).toBeInTheDocument();
      expect(screen.getByText(/log in/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/nathansmt@example.com/i)).toBeInTheDocument();
      const emailInput = screen.getByLabelText(/email/i);
      expect(emailInput).not.toHaveClass('border-red-500');
    });
  });

  describe('Error Display', () => {
    beforeEach(() => {
      vi.clearAllMocks();
      vi.mocked(useForgetPasswordForm).mockReturnValue(defaultMockReturn);
    });

    it('should display email error', () => {
      vi.mocked(useForgetPasswordForm).mockReturnValue({
        ...defaultMockReturn,
        errors: { email: EMAIL_IS_REQUIRED },
      });
      render(<ForgetPassword />);
      expect(screen.getByText(EMAIL_IS_REQUIRED)).toBeInTheDocument();
      const emailInput = screen.getByLabelText(/email/i)
      expect(emailInput).toHaveClass('border-red-500');
    });

    it('should display invalid email format error', () => {
      vi.mocked(useForgetPasswordForm).mockReturnValue({
        ...defaultMockReturn,
        errors: { email: INVALID_EMAIL_FORMAT },
      });
      render(<ForgetPassword />);
      expect(screen.getByText(INVALID_EMAIL_FORMAT)).toBeInTheDocument();
      const emailInput = screen.getByLabelText(/email/i)
      expect(emailInput).toHaveClass('border-red-500');
    });
  });

  describe('Loading State', () => {
    beforeEach(() => {
      vi.clearAllMocks();
      vi.mocked(useForgetPasswordForm).mockReturnValue(defaultMockReturn);
    });

    it('should disable submit button when loading', () => {
      vi.mocked(useForgetPasswordForm).mockReturnValue({
        ...defaultMockReturn,
        isLoading: true,
      });
      render(<ForgetPassword />);
      const submitButton = screen.getByRole('button', { name: /submit email/i });
      const spinner = submitButton.querySelector('svg');
      expect(submitButton).toBeDisabled();
      expect(spinner).toBeInTheDocument();
    });

    it('should enable submit button when not loading', () => {
      render(<ForgetPassword />);
      const submitButton = screen.getByRole('button', { name: /submit email/i });
      const spinner = submitButton.querySelector('svg');
      expect(submitButton).not.toBeDisabled();
      expect(spinner).not.toBeInTheDocument();
    });
  });

  describe('Form Submission', () => {
    const mockHandleSubmit = vi.fn();
    const defaultMockReturn = {
      formData: {
        email: '',
      },
      errors: {},
      isLoading: false,
      handleInputChange: vi.fn(),
      handleSubmit: mockHandleSubmit,
    };

    beforeEach(() => {
      vi.clearAllMocks();
      vi.mocked(useForgetPasswordForm).mockReturnValue(defaultMockReturn);
    });

    it('should call handleSubmit on form submit', () => {
      render(<ForgetPassword />);
      const form = screen.getByRole('button', { name: /submit email/i }).closest('form');
      fireEvent.submit(form!);
      expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
    });
  });

  describe('Input Interactions', () => {
    let mockHandleInputChange = vi.fn();
    let mockHandleSubmit = vi.fn();
    let defaultMockReturn = {
      formData: {
        email: '',
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
          email: '',
        },
        errors: {},
        isLoading: false,
        handleInputChange: mockHandleInputChange,
        handleSubmit: mockHandleSubmit,
      };
      vi.clearAllMocks();
      vi.mocked(useForgetPasswordForm).mockReturnValue(defaultMockReturn);
    });

    it('should call handleInputChange on email change', () => {
      render(<ForgetPassword />);
      const emailInput = screen.getByLabelText(/email/i);
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      expect(mockHandleInputChange).toHaveBeenCalledTimes(1);
    });

    it('should display form data values', () => {
      vi.mocked(useForgetPasswordForm).mockReturnValue({
        ...defaultMockReturn,
        formData: {
          email: 'test@example.com',
        },
      });
      render(<ForgetPassword />);
      expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument();
    });
  });

  describe('Navigation', () => {
    beforeEach(() => {
      vi.clearAllMocks();
      vi.mocked(useForgetPasswordForm).mockReturnValue(defaultMockReturn);
    });

    it('should navigate to login when clicking login link', () => {
      render(<ForgetPassword />);
      const loginLink = screen.getByText(/log in/i);
      fireEvent.click(loginLink);
      expect(mockRouterPush).toHaveBeenCalledWith(
        `?${routes.account.keys.auth}=${routes.account.query.login}`
      );
    });
  });
});
