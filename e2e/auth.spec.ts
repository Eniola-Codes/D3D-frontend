import {
  PASSWORD_DOES_NOT_MATCH,
  OTP_IS_REQUIRED,
  DONT_HAVE_AN_ACCOUNT,
  VALID_EMAIL_ADDRESS,
  VALID_NAME_LENGTH,
  VALID_OTP_FORMAT,
  VALID_OTP_LENGTH,
  VALID_PASSWORD_LENGTH,
  WELCOME_BACK,
  USER_AUTHENTICATED_SUCCESSFULLY,
  OTP_VERIFIED_SUCCESSFULLY,
  EMAIL_SENT_SUCCESSFULLY,
  FORGET_PASSWORD,
  ENTER_ASSOCIATED_EMAIL,
  VERIFY_ACCOUNT,
  RESET_PASSWORD,
  ALREADY_HAVE_AN_ACCOUNT,
  GET_STARTED,
} from '@/lib/constants/messages';
import { routes } from '@/lib/constants/page-routes';
import { Page, test, expect } from '@playwright/test';

const email = process.env.TEST_EMAIL as string;

test('should signup successfully', async ({ page }: { page: Page }) => {
  const name = 'Eniola odunmbaku';
  const email = `${Math.floor(Math.random() * 1000000)}@gmail.com`;
  const password = '12345678';

  await page.goto(process.env.BASE_URL as string);
  await page.getByRole('button', { name: 'Get Started' }).click();
  await page.getByRole('button', { name: 'Signup' }).click();
  await page.getByRole('textbox', { name: 'Name' }).waitFor({ state: 'visible' });
  await page.getByRole('textbox', { name: 'Name' }).fill(name);
  await page.getByRole('textbox', { name: 'Email' }).fill(email);
  await page.getByRole('textbox', { name: 'Password', exact: true }).fill(password);
  await page.getByRole('textbox', { name: 'Confirm password' }).fill(password);
  await page.getByRole('button', { name: 'signup' }).click();

  await page.locator('span[data-slot="breadcrumb-page"]').waitFor();
  await page.getByTestId('dropdown-menu-trigger').waitFor();

  await expect(page.locator('span[data-slot="breadcrumb-page"]')).toHaveText('Dashboard');
  await expect(
    page.locator('[data-sonner-toast]').filter({
      hasText: 'User created successfully!',
    })
  ).toBeVisible();
  await page.getByTestId('dropdown-menu-trigger').click();
  await expect(
    page.locator('div[data-slot="dropdown-menu-label"] div div span').first()
  ).toHaveText(name);
  await expect(page.locator('div[data-slot="dropdown-menu-label"] div div span').last()).toHaveText(
    email
  );
});

test('should reject wrong signup credentials', async ({ page }: { page: Page }) => {
  const name = 'e';
  const email = 'eniola';
  const password = '12345';
  const confirmPassword = '';

  await page.goto(process.env.BASE_URL as string);
  await page.getByRole('button', { name: 'Get Started' }).click();
  await page.getByRole('button', { name: 'signup' }).click();
  await page.getByRole('textbox', { name: 'Name' }).click();
  await page.getByRole('textbox', { name: 'Name' }).fill(name);
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill(email);
  await page.getByRole('textbox', { name: 'Password', exact: true }).click();
  await page.getByRole('textbox', { name: 'Password', exact: true }).fill(password);
  await page.getByRole('textbox', { name: 'Confirm password' }).click();
  await page.getByRole('textbox', { name: 'Confirm password' }).fill(confirmPassword);
  await page.getByRole('button', { name: 'signup' }).click();

  const nameInput = page.locator('div.grid.gap-6').locator('div').nth(1);
  const emailInput = page.locator('div.grid.gap-6').locator('div').nth(2);
  const passwordInput = page.locator('div.grid.gap-6').locator('div').nth(3);
  const confirmPasswordInput = page.locator('div.grid.gap-6').locator('div').nth(5);

  await expect(nameInput.locator('input')).toContainClass('border-red-500');
  await expect(emailInput.locator('input')).toContainClass('border-red-500');
  await expect(passwordInput.locator('input')).toContainClass('border-red-500');
  await expect(confirmPasswordInput.locator('input')).toContainClass('border-red-500');

  await expect(nameInput.locator('p')).toHaveText(VALID_NAME_LENGTH);
  await expect(emailInput.locator('p')).toHaveText(VALID_EMAIL_ADDRESS);
  await expect(passwordInput.locator('p')).toHaveText(VALID_PASSWORD_LENGTH);
  await expect(confirmPasswordInput.locator('p')).toHaveText(PASSWORD_DOES_NOT_MATCH);
});

test('should reject duplicate email on signup', async ({ page }: { page: Page }) => {
  const name = 'Eniola odunmbaku';
  const password = '12345678';

  await page.goto(process.env.BASE_URL as string);
  await page.getByRole('button', { name: 'Get Started' }).click();
  await page.getByRole('button', { name: 'signup' }).click();
  await page.getByRole('textbox', { name: 'Name' }).click();
  await page.getByRole('textbox', { name: 'Name' }).fill(name);
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill(email);
  await page.getByRole('textbox', { name: 'Password', exact: true }).click();
  await page.getByRole('textbox', { name: 'Password', exact: true }).fill(password);
  await page.getByRole('textbox', { name: 'Confirm password' }).click();
  await page.getByRole('textbox', { name: 'Confirm password' }).fill(password);
  await page.getByRole('button', { name: 'signup' }).click();

  await expect(
    page.locator('[data-sonner-toast]').filter({
      hasText: 'The email has already been used, please use another email.',
    })
  ).toBeVisible();

  await expect(page.locator('body')).toContainText(GET_STARTED);
  await expect(page.locator('body')).toContainText(ALREADY_HAVE_AN_ACCOUNT);
  await expect(page.getByRole('button', { name: 'Signup' })).toBeVisible();
});

test('should login successfully', async ({ page }: { page: Page }) => {
  const password = '12345678';

  await page.goto(process.env.BASE_URL as string);
  await page.getByRole('button', { name: 'Get Started' }).click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill(email);
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
  await page.getByRole('button', { name: 'login' }).click();

  await page.locator('span[data-slot="breadcrumb-page"]').waitFor();
  await page.getByTestId('dropdown-menu-trigger').waitFor();

  await expect(page.locator('span[data-slot="breadcrumb-page"]')).toHaveText('Dashboard');
  await expect(
    page.locator('[data-sonner-toast]').filter({
      hasText: 'User authenticated successfully!',
    })
  ).toBeVisible();
  await expect(page.getByRole('link', { name: 'd3d Enterprise' })).toBeVisible();
  await page.getByTestId('dropdown-menu-trigger').click();
  await expect(page.locator('div[data-slot="dropdown-menu-label"] div div span').last()).toHaveText(
    email
  );
});

test('should reject wrong login credentials', async ({ page }: { page: Page }) => {
  const password = 'wrongpassword123';

  await page.goto(process.env.BASE_URL as string);
  await page.getByRole('button', { name: 'Get Started' }).click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill(email);
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
  await page.getByRole('button', { name: 'login' }).click();

  await expect(
    page.locator('[data-sonner-toast]').filter({
      hasText: 'Invalid email or password, please try again',
    })
  ).toBeVisible();
  await expect(page.locator('body')).toContainText(WELCOME_BACK);
  await expect(page.locator('body')).toContainText(DONT_HAVE_AN_ACCOUNT);
  await expect(page.getByRole('button', { name: 'Forgot your password?' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
});

test('should reject wrong login credentials client-side', async ({ page }: { page: Page }) => {
  const wrongEmail = 'eniola';
  const wrongPassword = '12345';

  await page.goto(process.env.BASE_URL as string);
  await page.getByRole('button', { name: 'Get Started' }).click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill(wrongEmail);
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill(wrongPassword);
  await page.getByRole('button', { name: 'login' }).click();

  const emailInput = page.locator('div.grid.gap-6').locator('div').nth(1);
  const passwordInput = page.locator('div.grid.gap-6').locator('div').nth(2);

  await expect(emailInput.locator('input')).toContainClass('border-red-500');
  await expect(passwordInput.locator('input')).toContainClass('border-red-500');

  await expect(emailInput.locator('p')).toHaveText(VALID_EMAIL_ADDRESS);
  await expect(passwordInput.locator('p')).toHaveText(VALID_PASSWORD_LENGTH);
});

test('should forget password successfully', async ({ page }: { page: Page }) => {
  await page.goto(process.env.BASE_URL as string);
  await page.getByRole('button', { name: 'Get Started' }).click();
  await page.getByRole('button', { name: 'Forgot your password?' }).click();

  await expect(page.locator('body')).toContainText(FORGET_PASSWORD);
  await expect(page.locator('body')).toContainText(ENTER_ASSOCIATED_EMAIL);

  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill(email);
  await page.getByRole('button', { name: 'Submit email' }).click();

  await expect(
    page.locator('[data-sonner-toast]').filter({
      hasText: EMAIL_SENT_SUCCESSFULLY,
    })
  ).toBeVisible();
  await expect(page.locator('body')).toContainText(VERIFY_ACCOUNT);
  await expect(page.locator('body')).toContainText(`We have sent a one time password to ${email}`);
});

test('should reject wrong forget password email', async ({ page }: { page: Page }) => {
  const email = 'elfelqfeiqfnb3293932@gmail.com';

  await page.goto(process.env.BASE_URL as string);
  await page.getByRole('button', { name: 'Get Started' }).click();
  await page.getByRole('button', { name: 'Forgot your password?' }).click();

  await expect(page.locator('body')).toContainText(FORGET_PASSWORD);
  await expect(page.locator('body')).toContainText(ENTER_ASSOCIATED_EMAIL);

  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill(email);
  await page.getByRole('button', { name: 'Submit email' }).click();

  await expect(
    page.locator('[data-sonner-toast]').filter({
      hasText: 'This email is not associated with an account, please try again.',
    })
  ).toBeVisible();
  await expect(page.locator('body')).toContainText(FORGET_PASSWORD);
  await expect(page.locator('body')).toContainText(ENTER_ASSOCIATED_EMAIL);
});

test('should verify OTP successfully', async ({ page }: { page: Page }) => {
  await page.goto(process.env.BASE_URL as string);
  await page.getByRole('button', { name: 'Get Started' }).click();
  await page.getByRole('button', { name: 'Forgot your password?' }).click();

  await expect(page.locator('body')).toContainText(FORGET_PASSWORD);
  await expect(page.locator('body')).toContainText(ENTER_ASSOCIATED_EMAIL);

  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill(email);
  await page.getByRole('button', { name: 'Submit email' }).click();

  await expect(
    page.locator('[data-sonner-toast]').filter({
      hasText: EMAIL_SENT_SUCCESSFULLY,
    })
  ).toBeVisible();
  await expect(page.locator('body')).toContainText(VERIFY_ACCOUNT);
  await expect(page.locator('body')).toContainText(`We have sent a one time password to ${email}`);

  await page.locator("input[data-slot='input-otp']").click();
  await page.locator("input[data-slot='input-otp']").fill('123456');
  await page.getByRole('button', { name: 'Verify & Continue' }).click();

  await expect(
    page.locator('[data-sonner-toast]').filter({
      hasText: OTP_VERIFIED_SUCCESSFULLY,
    })
  ).toBeVisible();
  await expect(page.locator('body')).toContainText(RESET_PASSWORD);
  await expect(page.locator('body')).toContainText(
    `Create a new password for your account ${email}`
  );
});

test('should reject wrong otp credentials', async ({ page }: { page: Page }) => {
  await page.goto(process.env.BASE_URL as string);
  await page.getByRole('button', { name: 'Get Started' }).click();
  await page.getByRole('button', { name: 'Forgot your password?' }).click();

  await expect(page.locator('body')).toContainText(FORGET_PASSWORD);
  await expect(page.locator('body')).toContainText(ENTER_ASSOCIATED_EMAIL);

  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill(email);
  await page.getByRole('button', { name: 'Submit email' }).click();
  await expect(
    page.locator('[data-sonner-toast]').filter({
      hasText: EMAIL_SENT_SUCCESSFULLY,
    })
  ).toBeVisible();

  await expect(page.locator('body')).toContainText(VERIFY_ACCOUNT);
  await expect(page.locator('body')).toContainText(`We have sent a one time password to ${email}`);

  await page.locator("input[data-slot='input-otp']").click();
  await page.locator("input[data-slot='input-otp']").fill('654321');
  await page.getByRole('button', { name: 'Verify & Continue' }).click();

  await expect(
    page.locator('[data-sonner-toast]').filter({
      hasText: 'The Otp code is expired or invalid, please resend an OTP and try again',
    })
  ).toBeVisible();
});

test('should reject invalid OTP credentials client-side', async ({ page }: { page: Page }) => {
  await page.goto(
    `${process.env.BASE_URL}${routes.account.path.base}?${routes.account.keys.auth}=${routes.account.query.inputOTP}&${routes.account.keys.mail}=${encodeURIComponent(email)}`
  );

  await expect(page.locator('body')).toContainText(VERIFY_ACCOUNT);
  await expect(page.locator('body')).toContainText(`We have sent a one time password to ${email}`);

  await page.getByRole('button', { name: 'Verify & Continue' }).click();
  await expect(page.getByText(OTP_IS_REQUIRED)).toBeVisible();

  await page.locator("input[data-slot='input-otp']").fill('123');
  await page.getByRole('button', { name: 'Verify & Continue' }).click();
  await expect(page.getByText(VALID_OTP_LENGTH)).toBeVisible();

  await page.locator("input[data-slot='input-otp']").fill('abcdef');
  await page.getByRole('button', { name: 'Verify & Continue' }).click();
  await expect(page.getByText(VALID_OTP_FORMAT)).toBeVisible();

  await expect(page.locator('body')).toContainText(VERIFY_ACCOUNT);
  await expect(page.locator('body')).not.toContainText(RESET_PASSWORD);
});

test('should reset password successfully', async ({ page }: { page: Page }) => {
  const password = '87654321';
  const confirmPassword = '87654321';
  const newPassword = '12345678';
  const newConfirmPassword = '12345678';

  await page.goto(process.env.BASE_URL as string);
  await page.getByRole('button', { name: 'Get Started' }).click();
  await page.getByRole('button', { name: 'Forgot your password?' }).click();

  await expect(page.locator('body')).toContainText(FORGET_PASSWORD);
  await expect(page.locator('body')).toContainText(ENTER_ASSOCIATED_EMAIL);

  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill(email);
  await page.getByRole('button', { name: 'Submit email' }).click();

  await expect(
    page.locator('[data-sonner-toast]').filter({
      hasText: EMAIL_SENT_SUCCESSFULLY,
    })
  ).toBeVisible();
  await expect(page.locator('body')).toContainText(VERIFY_ACCOUNT);
  await expect(page.locator('body')).toContainText(`We have sent a one time password to ${email}`);

  await page.locator("input[data-slot='input-otp']").click();
  await page.locator("input[data-slot='input-otp']").fill('123456');
  await page.getByRole('button', { name: 'Verify & Continue' }).click();

  await expect(
    page.locator('[data-sonner-toast]').filter({
      hasText: OTP_VERIFIED_SUCCESSFULLY,
    })
  ).toBeVisible();
  await expect(page.locator('body')).toContainText(RESET_PASSWORD);
  await expect(page.locator('body')).toContainText(
    `Create a new password for your account ${email}`
  );

  await page.locator('#password').click();
  await page.locator('#password').fill(password);
  await page.locator('#confirmPassword').click();
  await page.locator('#confirmPassword').fill(confirmPassword);

  await page.getByRole('button', { name: RESET_PASSWORD }).click();

  await expect(page.locator('body')).toContainText(WELCOME_BACK);
  await page.getByRole('button', { name: 'Forgot your password?' }).click();

  await expect(page.locator('body')).toContainText(FORGET_PASSWORD);
  await expect(page.locator('body')).toContainText(ENTER_ASSOCIATED_EMAIL);

  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill(email);
  await page.getByRole('button', { name: 'Submit email' }).click();

  await expect(
    page.locator('[data-sonner-toast]').filter({
      hasText: EMAIL_SENT_SUCCESSFULLY,
    })
  ).toBeVisible();
  await expect(page.locator('body')).toContainText(VERIFY_ACCOUNT);
  await expect(page.locator('body')).toContainText(`We have sent a one time password to ${email}`);

  await page.locator("input[data-slot='input-otp']").click();
  await page.locator("input[data-slot='input-otp']").fill('123456');
  await page.getByRole('button', { name: 'Verify & Continue' }).click();

  await expect(
    page.locator('[data-sonner-toast]').filter({
      hasText: OTP_VERIFIED_SUCCESSFULLY,
    })
  ).toBeVisible();
  await expect(page.locator('body')).toContainText(RESET_PASSWORD);
  await expect(page.locator('body')).toContainText(
    `Create a new password for your account ${email}`
  );

  await page.locator('#password').click();
  await page.locator('#password').fill(newPassword);
  await page.locator('#confirmPassword').click();
  await page.locator('#confirmPassword').fill(newConfirmPassword);

  await page.getByRole('button', { name: RESET_PASSWORD }).click();

  await expect(page.locator('body')).toContainText(WELCOME_BACK);
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill(email);
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill(newPassword);
  await page.getByRole('button', { name: 'login' }).click();

  await page.locator('span[data-slot="breadcrumb-page"]').waitFor();
  await page.getByTestId('dropdown-menu-trigger').waitFor();

  await expect(page.locator('span[data-slot="breadcrumb-page"]')).toHaveText('Dashboard');
  await expect(
    page.locator('[data-sonner-toast]').filter({
      hasText: USER_AUTHENTICATED_SUCCESSFULLY,
    })
  ).toBeVisible();
  await expect(page.getByRole('link', { name: 'd3d Enterprise' })).toBeVisible();
  await page.getByTestId('dropdown-menu-trigger').click();
  await expect(page.locator('div[data-slot="dropdown-menu-label"] div div span').last()).toHaveText(
    email
  );
});

test('should reject reset password to same old password', async ({ page }: { page: Page }) => {
  const password = '12345678';
  const confirmPassword = '12345678';

  await page.goto(process.env.BASE_URL as string);
  await page.getByRole('button', { name: 'Get Started' }).click();
  await page.getByRole('button', { name: 'Forgot your password?' }).click();

  await expect(page.locator('body')).toContainText(FORGET_PASSWORD);
  await expect(page.locator('body')).toContainText(ENTER_ASSOCIATED_EMAIL);

  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill(email);
  await page.getByRole('button', { name: 'Submit email' }).click();

  await expect(
    page.locator('[data-sonner-toast]').filter({
      hasText: EMAIL_SENT_SUCCESSFULLY,
    })
  ).toBeVisible();
  await expect(page.locator('body')).toContainText(VERIFY_ACCOUNT);
  await expect(page.locator('body')).toContainText(`We have sent a one time password to ${email}`);

  await expect(page.locator('body')).toContainText(VERIFY_ACCOUNT);
  await expect(page.locator('body')).toContainText(`We have sent a one time password to ${email}`);

  await page.locator("input[data-slot='input-otp']").click();
  await page.locator("input[data-slot='input-otp']").fill('123456');
  await page.getByRole('button', { name: 'Verify & Continue' }).click();

  await expect(
    page.locator('[data-sonner-toast]').filter({
      hasText: OTP_VERIFIED_SUCCESSFULLY,
    })
  ).toBeVisible();
  await expect(page.locator('body')).toContainText(RESET_PASSWORD);
  await expect(page.locator('body')).toContainText(
    `Create a new password for your account ${email}`
  );

  await page.locator('#password').click();
  await page.locator('#password').fill(password);
  await page.locator('#confirmPassword').click();
  await page.locator('#confirmPassword').fill(confirmPassword);

  await page.getByRole('button', { name: RESET_PASSWORD }).click();
  await expect(
    page.locator('[data-sonner-toast]').filter({
      hasText: 'You cannot use your previous password, please use a new password',
    })
  ).toBeVisible();
});

test('should reject invalid reset password credentials client-side', async ({
  page,
}: {
  page: Page;
}) => {
  await page.goto(
    `${process.env.BASE_URL}${routes.account.path.base}?${routes.account.keys.auth}=${routes.account.query.resetPassword}&${routes.account.keys.mail}=${encodeURIComponent(email)}&otp=123456`
  );

  await expect(page.locator('body')).toContainText(RESET_PASSWORD);
  await expect(page.locator('body')).toContainText(
    `Create a new password for your account ${email}`
  );

  await page.locator('#password').fill('12345');
  await page.locator('#confirmPassword').fill('12345678');
  await page.getByRole('button', { name: RESET_PASSWORD }).click();

  const passwordField = page.locator('div.grid.gap-2').filter({ has: page.locator('#password') });
  const confirmPasswordField = page
    .locator('div.grid.gap-2')
    .filter({ has: page.locator('#confirmPassword') });

  await expect(passwordField.locator('input')).toContainClass('border-red-500');
  await expect(confirmPasswordField.locator('input')).toContainClass('border-red-500');

  await expect(passwordField.locator('p')).toHaveText(VALID_PASSWORD_LENGTH);
  await expect(confirmPasswordField.locator('p')).toHaveText(PASSWORD_DOES_NOT_MATCH);

  await expect(page.locator('body')).toContainText(RESET_PASSWORD);
  await expect(page.locator('body')).not.toContainText(WELCOME_BACK);
});

test('should logout successfully', async ({ page }: { page: Page }) => {
  const password = '12345678';

  await page.goto(process.env.BASE_URL as string);
  await page.getByRole('button', { name: 'Get Started' }).click();
  await page.getByRole('button', { name: 'login' }).click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill(email);
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
  await page.getByRole('button', { name: 'login' }).click();

  await page.locator('span[data-slot="breadcrumb-page"]').waitFor();
  await page.getByTestId('dropdown-menu-trigger').waitFor();

  await page.getByTestId('dropdown-menu-trigger').click();
  await page.getByRole('menuitem', { name: 'Log out' }).waitFor();
  await page.getByRole('menuitem', { name: 'Log out' }).click();
  await page.getByText(WELCOME_BACK).waitFor();
  await expect(page.locator('body')).toContainText(WELCOME_BACK);
  await page.goto(`${process.env.BASE_URL}${routes.dashboard.path.base}`);
  await page.getByText(WELCOME_BACK).waitFor();
  await expect(page.locator('body')).toContainText(WELCOME_BACK);
});

test('should redirect on protected routes', async ({ page }: { page: Page }) => {
  const password = '12345678';

  await page.goto((process.env.BASE_URL as string) + routes.dashboard.path.base);

  await expect(page.locator('body')).toContainText(WELCOME_BACK);
  await expect(page.locator('body')).toContainText(DONT_HAVE_AN_ACCOUNT);
  await expect(page.getByRole('button', { name: 'Forgot your password?' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill(email);
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
  await page.getByRole('button', { name: 'login' }).click();

  await page.locator('span[data-slot="breadcrumb-page"]').waitFor();
  await page.getByTestId('dropdown-menu-trigger').waitFor();

  await page.goto(
    process.env.BASE_URL + routes.account.path.base + '?auth=' + routes.account.query.login
  );

  await page.locator('span[data-slot="breadcrumb-page"]').waitFor();
  await page.getByTestId('dropdown-menu-trigger').waitFor();

  await expect(page.getByTestId('dropdown-menu-trigger')).toBeVisible();
  await expect(page.locator('span[data-slot="breadcrumb-page"]')).toHaveText('Dashboard');
  await expect(page.getByRole('link', { name: 'd3d Enterprise' })).toBeVisible();
  await page.getByTestId('dropdown-menu-trigger').click();
  await expect(page.locator('div[data-slot="dropdown-menu-label"] div div span').last()).toHaveText(
    email
  );
});
