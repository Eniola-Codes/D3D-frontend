import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useOtpForm } from '../hooks/verify-otp';
import { VerifyOTP } from '../components/user-auth/verify-otp';
import { toastFunc } from '@/lib/utils/toasts';
import { submitVerifyOtpFormData } from '@/lib/utils/auth/form-handlers';
import { toastErrorHandler } from '@/lib/utils/error-handler';
import {
  INVALID_INPUT,
  INVALID_OTP_FORMAT,
  OTP_IS_REQUIRED,
  OTP_VERIFIED_SUCCESSFULLY,
} from '@/lib/constants/messages';

describe('submitVerifyOtpFormData()', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  vi.mock('@/lib/services/auth', () => ({
    authService: {
      verifyOtp: vi.fn((email, otp) => {
        return new Promise((resolve, reject) => {
          if (!email || !otp) {
            return reject(INVALID_INPUT);
          }
          return resolve({
            message: OTP_VERIFIED_SUCCESSFULLY,
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

  describe('Verify OTP flow', () => {
    it('should handle successful OTP verification', async () => {
      const email = 'test@example.com';
      const otp = '123456';

      const result = await submitVerifyOtpFormData(email, otp);

      expect(result).toBe(otp);
      expect(toastFunc).toHaveBeenCalledWith(OTP_VERIFIED_SUCCESSFULLY, true);
    });

    it('should throw error if OTP data is empty', async () => {
      const email = 'test@example.com';
      const otp = '';

      const result = await submitVerifyOtpFormData(email, otp);

      expect(result).toBeUndefined();
      expect(toastErrorHandler).toHaveBeenCalledWith(INVALID_INPUT);
    });

    it('should throw error if email data is empty', async () => {
      const email = '';
      const otp = '123456';

      const result = await submitVerifyOtpFormData(email, otp);

      expect(result).toBeUndefined();
      expect(toastErrorHandler).toHaveBeenCalledWith(INVALID_INPUT);
    });
  });
});

vi.mock('../hooks/verify-otp', () => ({
  useOtpForm: vi.fn(),
}));

const mockRouterPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockRouterPush,
    replace: vi.fn(),
  }),
}));

vi.mock('@/components/ui/input/input-otp', () => ({
  InputOTP: ({ children, value }: { children: React.ReactNode; value: string }) => (
    <div data-testid="input-otp" data-value={value}>
      {children}
    </div>
  ),
  InputOTPGroup: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="input-otp-group">{children}</div>
  ),
  InputOTPSlot: ({ index }: { index: number }) => (
    <input
      data-testid={`input-otp-slot-${index}`}
      type="text"
      maxLength={1}
      style={{ width: '2rem', height: '2rem', textAlign: 'center' }}
    />
  ),
}));

describe('VerifyOTP Component', () => {
  const email = 'test@example.com';
  const defaultMockReturn = {
    otp: '',
    errors: {},
    isLoading: false,
    handleChange: vi.fn(),
    handleSubmit: vi.fn(),
    resendOtp: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useOtpForm).mockReturnValue(defaultMockReturn);
  });

  describe('Rendering', () => {
    it('should render OTP input slots', () => {
      render(<VerifyOTP email={email} />);
      expect(screen.getByTestId('input-otp')).toBeInTheDocument();
      expect(screen.getByTestId('input-otp-group')).toBeInTheDocument();
      for (let i = 0; i < 6; i++) {
        expect(screen.getByTestId(`input-otp-slot-${i}`)).toBeInTheDocument();
      }
      const errorParagraph = document.querySelector('p.text-red-500');
      expect(errorParagraph).not.toBeInTheDocument();
    });

    it('should render button and resend code link', () => {
      render(<VerifyOTP email={email} />);
      expect(screen.getByText(/didn't get the otp/i)).toBeInTheDocument();
      expect(screen.getByText(/resend code/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /verify & continue/i })).toBeInTheDocument();
    });
  });

  describe('Error Display', () => {
    beforeEach(() => {
      vi.clearAllMocks();
      vi.mocked(useOtpForm).mockReturnValue(defaultMockReturn);
    });

    it('should display OTP error', () => {
      vi.mocked(useOtpForm).mockReturnValue({
        ...defaultMockReturn,
        errors: { otp: OTP_IS_REQUIRED },
      });
      render(<VerifyOTP email={email} />);
      expect(screen.getByText(OTP_IS_REQUIRED)).toBeInTheDocument();
    });

    it('should display invalid OTP format error', () => {
      vi.mocked(useOtpForm).mockReturnValue({
        ...defaultMockReturn,
        errors: { otp: INVALID_OTP_FORMAT },
      });
      render(<VerifyOTP email={email} />);
      expect(screen.getByText(INVALID_OTP_FORMAT)).toBeInTheDocument();
    });
  });

  describe('Loading State', () => {
    beforeEach(() => {
      vi.clearAllMocks();
      vi.mocked(useOtpForm).mockReturnValue(defaultMockReturn);
    });

    it('should disable submit button when loading', () => {
      vi.mocked(useOtpForm).mockReturnValue({
        ...defaultMockReturn,
        isLoading: true,
      });
      render(<VerifyOTP email={email} />);
      const submitButton = screen.getByRole('button', { name: /verify & continue/i });
      const spinner = submitButton.querySelector('svg');
      expect(submitButton).toBeDisabled();
      expect(spinner).toBeInTheDocument();
    });

    it('should enable submit button when not loading', () => {
      render(<VerifyOTP email={email} />);
      const submitButton = screen.getByRole('button', { name: /verify & continue/i });
      expect(submitButton).not.toBeDisabled();
      const spinner = submitButton.querySelector('svg');
      expect(spinner).not.toBeInTheDocument();
    });
  });

  describe('Form Submission', () => {
    const mockHandleSubmit = vi.fn();
    const defaultMockReturn = {
      otp: '',
      errors: {},
      isLoading: false,
      handleChange: vi.fn(),
      handleSubmit: mockHandleSubmit,
      resendOtp: vi.fn(),
    };

    beforeEach(() => {
      vi.clearAllMocks();
      vi.mocked(useOtpForm).mockReturnValue(defaultMockReturn);
    });

    it('should call handleSubmit on form submit', () => {
      render(<VerifyOTP email={email} />);
      const form = screen.getByRole('button', { name: /verify & continue/i }).closest('form');
      fireEvent.submit(form!);
      expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
    });
  });

  describe('OTP Input Interactions', () => {
    let mockHandleChange = vi.fn();
    let mockHandleSubmit = vi.fn();
    let mockResendOtp = vi.fn();
    let defaultMockReturn = {
      otp: '',
      errors: {},
      isLoading: false,
      handleChange: mockHandleChange,
      handleSubmit: mockHandleSubmit,
      resendOtp: mockResendOtp,
    };

    beforeEach(() => {
      mockHandleChange = vi.fn();
      mockHandleSubmit = vi.fn();
      mockResendOtp = vi.fn();
      defaultMockReturn = {
        otp: '',
        errors: {},
        isLoading: false,
        handleChange: mockHandleChange,
        handleSubmit: mockHandleSubmit,
        resendOtp: mockResendOtp,
      };
      vi.clearAllMocks();
      vi.mocked(useOtpForm).mockReturnValue(defaultMockReturn);
    });

    it('should call handleChange when OTP value changes', () => {
      render(<VerifyOTP email={email} />);
      expect(screen.getByTestId('input-otp')).toBeInTheDocument();
      expect(mockHandleChange).toBeDefined();
    });

    it('should display OTP value when set', () => {
      vi.mocked(useOtpForm).mockReturnValue({
        ...defaultMockReturn,
        otp: '123456',
      });
      render(<VerifyOTP email={email} />);
      const inputOtp = screen.getByTestId('input-otp');
      expect(inputOtp).toHaveAttribute('data-value', '123456');
    });
  });
});
