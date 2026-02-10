import { describe, it, expect, vi, beforeEach } from 'vitest';
import { routes } from '@/lib/constants/page-routes';
import { submitLoginOrSignupFormData } from '@/lib/utils/auth/form-handlers';
import { toastErrorHandler } from '@/lib/utils/error-handler';
import { toastFunc } from '@/lib/utils/toasts';
import { authService } from '@/lib/services/auth';
import { fireEvent, render, screen } from '@testing-library/react';
import { LoginSignup } from '../login-signup';
import { useAuthForm } from '../hooks/login-signup';
import {
  EMAIL_IS_REQUIRED,
  INVALID_EMAIL,
  INVALID_INPUT,
  NAME_IS_REQUIRED,
  PASSWORD_DOES_NOT_MATCH,
  PASSWORD_IS_REQUIRED,
  USER_AUTHENTICATED_SUCCESSFULLY,
} from '@/lib/constants/messages';

describe('submitLoginOrSignupFormData()', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  vi.mock('@/lib/services/auth', () => ({
    authService: {
      loginOrSignup: vi.fn((email, name, password, authParam) => {
        return new Promise((resolve, reject) => {
          if (!email || !name || !password || !authParam) {
            return reject(INVALID_INPUT);
          }
          return resolve({
            data: {
              message: USER_AUTHENTICATED_SUCCESSFULLY,
              user: { email, name },
            },
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

  describe('Signup flow', () => {
    it('should handle successful signup', async () => {
      const formData = {
        email: 'test@example.com',
        name: 'Test User',
        password: '12345678',
        confirmPassword: '12345678',
      };
      const authParam = routes.account.query.login;
      const result = await submitLoginOrSignupFormData(authParam, formData);

      expect(result).toEqual({ email: formData.email, name: 'Test User' });
      expect(toastFunc).toHaveBeenCalledWith(USER_AUTHENTICATED_SUCCESSFULLY, true);
    });

    it('should throw error if signup data is empty', async () => {
      const formData = {
        email: 'test@example.com',
        name: '',
        password: '12345678',
        confirmPassword: '12345678',
      };
      const authParam = routes.account.query.signup;
      const result = await submitLoginOrSignupFormData(authParam, formData);

      expect(result).toBeUndefined();
      expect(toastErrorHandler).toHaveBeenCalledWith(INVALID_INPUT);
    });
  });
  describe('Login flow', () => {
    beforeEach(() => {
      vi.clearAllMocks();

      vi.mocked(authService.loginOrSignup).mockImplementation(
        (email: string, name: string, password: string, authParam: string) => {
          return new Promise((resolve, reject) => {
            if (!email || !password || !authParam) {
              return reject(INVALID_INPUT);
            }
            return resolve({
              data: {
                message: USER_AUTHENTICATED_SUCCESSFULLY,
                user: { email, name },
              },
            } as unknown as Awaited<ReturnType<typeof authService.loginOrSignup>>);
          });
        }
      );
    });

    it('should handle successful login', async () => {
      const formData = {
        email: 'test@example.com',
        name: '',
        password: '12345678',
        confirmPassword: '',
      };
      const authParam = routes.account.query.login;
      const result = await submitLoginOrSignupFormData(authParam, formData);

      expect(result).toEqual({ email: formData.email, name: '' });
      expect(toastFunc).toHaveBeenCalledWith(USER_AUTHENTICATED_SUCCESSFULLY, true);
    });

    it('should throw error if login data is empty', async () => {
      const formData = {
        email: '',
        name: '',
        password: '12345678',
        confirmPassword: '',
      };
      const authParam = routes.account.query.login;
      const result = await submitLoginOrSignupFormData(authParam, formData);

      expect(result).toBeUndefined();
      expect(toastErrorHandler).toHaveBeenCalledWith(INVALID_INPUT);
    });
  });
});

vi.mock('../hooks/login-signup', () => ({
  useAuthForm: vi.fn(),
}));

const mockRouterPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockRouterPush,
    replace: vi.fn(),
  }),
}));

describe('LoginSignup Component', () => {
  const defaultMockReturn = {
    formData: {
      email: '',
      name: '',
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
    vi.mocked(useAuthForm).mockReturnValue(defaultMockReturn);
  });
  describe('Login Mode Rendering', () => {
    it('should render all inputs', () => {
      render(<LoginSignup authParam={routes.account.query.login} />);

      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      expect(screen.getByText(/forgot your password/i)).toBeInTheDocument();
      expect(screen.queryByLabelText(/name/i)).not.toBeInTheDocument();
      expect(screen.queryByLabelText(/confirm password/i)).not.toBeInTheDocument();
      expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });
  });
  describe('Signup Mode Rendering', () => {
    it('should render name field', () => {
      render(<LoginSignup authParam={routes.account.query.signup} />);
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
      expect(screen.queryByText(/forgot your password/i)).not.toBeInTheDocument();
      expect(screen.getByRole('button', { name: /signup/i })).toBeInTheDocument();
    });
  });

  describe('Error Display', () => {
    beforeEach(() => {
      vi.clearAllMocks();
      vi.mocked(useAuthForm).mockReturnValue(defaultMockReturn);
    });

    it('should display email error', () => {
      vi.mocked(useAuthForm).mockReturnValue({
        ...defaultMockReturn,
        errors: { email: 'Email is required' },
      });
      render(<LoginSignup authParam={routes.account.query.login} />);
      expect(screen.getByText(EMAIL_IS_REQUIRED)).toBeInTheDocument();
    });

    it('should display password error', () => {
      vi.mocked(useAuthForm).mockReturnValue({
        ...defaultMockReturn,
        errors: { password: PASSWORD_IS_REQUIRED },
      });
      render(<LoginSignup authParam={routes.account.query.login} />);
      expect(screen.getByText(PASSWORD_IS_REQUIRED)).toBeInTheDocument();
    });

    it('should display name error in signup mode', () => {
      vi.mocked(useAuthForm).mockReturnValue({
        ...defaultMockReturn,
        errors: { name: NAME_IS_REQUIRED },
      });
      render(<LoginSignup authParam={routes.account.query.signup} />);
      expect(screen.getByText(NAME_IS_REQUIRED)).toBeInTheDocument();
    });

    it('should display confirm password error in signup mode', () => {
      vi.mocked(useAuthForm).mockReturnValue({
        ...defaultMockReturn,
        errors: { confirmPassword: PASSWORD_DOES_NOT_MATCH },
      });
      render(<LoginSignup authParam={routes.account.query.signup} />);
      expect(screen.getByText(PASSWORD_DOES_NOT_MATCH)).toBeInTheDocument();
    });

    it('should apply error styling to email input', () => {
      vi.mocked(useAuthForm).mockReturnValue({
        ...defaultMockReturn,
        errors: { email: INVALID_EMAIL },
      });
      render(<LoginSignup authParam={routes.account.query.login} />);
      const emailInput = screen.getByLabelText(/email/i);
      expect(emailInput).toHaveClass('border-red-500');
    });
  });

  describe('Navigation', () => {
    beforeEach(() => {
      vi.clearAllMocks();
      vi.mocked(useAuthForm).mockReturnValue(defaultMockReturn);
    });

    it('should navigate to forget password on click', () => {
      render(<LoginSignup authParam={routes.account.query.login} />);
      const forgotLink = screen.getByText(/forgot your password/i);
      fireEvent.click(forgotLink);
      expect(mockRouterPush).toHaveBeenCalledWith(
        `?${routes.account.keys.auth}=${routes.account.query.forgetPassword}`
      );
    });

    it('should show signup link in login mode', () => {
      render(<LoginSignup authParam={routes.account.query.login} />);
      expect(screen.getByText(/signup/i)).toBeInTheDocument();
    });

    it('should show login link in signup mode', () => {
      render(<LoginSignup authParam={routes.account.query.signup} />);
      expect(screen.getByText(/login/i)).toBeInTheDocument();
    });

    it('should navigate to signup when clicking signup link in login mode', () => {
      render(<LoginSignup authParam={routes.account.query.login} />);
      const signupLink = screen.getByText(/signup/i);
      fireEvent.click(signupLink);
      expect(mockRouterPush).toHaveBeenCalledWith(
        `?${routes.account.keys.auth}=${routes.account.query.signup}`
      );
    });

    it('should navigate to login when clicking login link in signup mode', () => {
      render(<LoginSignup authParam={routes.account.query.signup} />);
      const loginLink = screen.getByText(/login/i);
      fireEvent.click(loginLink);
      expect(mockRouterPush).toHaveBeenCalledWith(
        `?${routes.account.keys.auth}=${routes.account.query.login}`
      );
    });
  });
});

describe('Loading State', () => {
  const defaultMockReturn = {
    formData: {
      email: '',
      name: '',
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
    vi.mocked(useAuthForm).mockReturnValue(defaultMockReturn);
  });
  it('should disable submit button when loading', () => {
    vi.mocked(useAuthForm).mockReturnValue({
      ...defaultMockReturn,
      isLoading: true,
    });
    render(<LoginSignup authParam={routes.account.query.login} />);
    const submitButton = screen.getByRole('button', { name: /login/i });
    expect(submitButton).toBeDisabled();
  });

  it('should show loading spinner when loading', () => {
    vi.mocked(useAuthForm).mockReturnValue({
      ...defaultMockReturn,
      isLoading: true,
    });
    render(<LoginSignup authParam={routes.account.query.login} />);
    const spinner = screen.getByRole('button', { name: /login/i }).querySelector('svg');
    expect(spinner).toBeInTheDocument();
  });
});

describe('Form Submission', () => {
  const mockHandleSubmit = vi.fn();
  const defaultMockReturn = {
    formData: {
      email: '',
      name: '',
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
    vi.mocked(useAuthForm).mockReturnValue(defaultMockReturn);
  });

  it('should call handleSubmit on form submit', () => {
    render(<LoginSignup authParam={routes.account.query.login} />);
    const form = screen.getByRole('button', { name: /login/i }).closest('form');
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
      name: '',
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
        email: '',
        name: '',
        password: '',
        confirmPassword: '',
      },
      errors: {},
      isLoading: false,
      handleInputChange: mockHandleInputChange,
      handleSubmit: mockHandleSubmit,
    };
    vi.clearAllMocks();
    vi.mocked(useAuthForm).mockReturnValue(defaultMockReturn);
  });

  it('should call handleInputChange on email change', () => {
    render(<LoginSignup authParam={routes.account.query.login} />);
    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(mockHandleInputChange).toHaveBeenCalledTimes(1);
  });

  it('should display form data values', () => {
    vi.mocked(useAuthForm).mockReturnValue({
      ...defaultMockReturn,
      formData: {
        email: 'test@example.com',
        name: '',
        password: 'password123',
        confirmPassword: '',
      },
    });
    render(<LoginSignup authParam={routes.account.query.login} />);
    expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('password123')).toBeInTheDocument();
  });
});
