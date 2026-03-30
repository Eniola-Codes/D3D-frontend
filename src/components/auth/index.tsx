import { LoginSignup } from './login-signup';
import { ForgetPassword } from './forget-password';
import { VerifyOTP } from './verify-otp';
import { ResetPassword } from './reset-password';
import { routes } from '@/lib/constants/page-routes';
import { UrlQueryParams } from '../../../interfaces/auth';
import {
  RESET_PASSWORD,
  FORGET_PASSWORD,
  GET_STARTED,
  WELCOME_BACK,
  VERIFY_ACCOUNT,
  BEGIN_YOUR_JOURNEY,
  ENTER_ASSOCIATED_EMAIL,
  ONE_TIME_PASSWORD,
  CREATE_NEW_PASSWORD,
  ENTER_LOGIN_DETAILS,
  CONNECTSTORE,
  SELECTSTOREOPTION,
} from '@/lib/constants/messages';
import { ConnectPlatform } from './connect-platform';

export const AuthForms: React.FC<{ params: UrlQueryParams }> = ({ params }) => {
  const { auth, mail, otp, error } = params;

  return (
    <>
      <div className="flex flex-col items-center gap-3 md:items-start">
        <p className="text-3xl sm:text-4xl">
          {auth === routes.account.query.login && WELCOME_BACK}
          {auth === routes.account.query.signup && GET_STARTED}
          {auth === routes.account.query.forgetPassword && FORGET_PASSWORD}
          {auth === routes.account.query.inputOTP && VERIFY_ACCOUNT}
          {auth === routes.account.query.resetPassword && RESET_PASSWORD}
          {auth === routes.account.query.connectStore && CONNECTSTORE}
        </p>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {auth === routes.account.query.login && ENTER_LOGIN_DETAILS}
          {auth === routes.account.query.signup && BEGIN_YOUR_JOURNEY}
          {auth === routes.account.query.forgetPassword && ENTER_ASSOCIATED_EMAIL}
          {auth === routes.account.query.inputOTP && ONE_TIME_PASSWORD + ' ' + `${mail}`}
          {auth === routes.account.query.resetPassword && CREATE_NEW_PASSWORD + ' ' + `${mail}`}
          {auth === routes.account.query.connectStore && SELECTSTOREOPTION}
        </p>
      </div>
      {(auth === routes.account.query.login || auth === routes.account.query.signup) && (
        <LoginSignup authParam={auth} errorParam={error} />
      )}
      {auth === routes.account.query.connectStore && <ConnectPlatform />}
      {auth === routes.account.query.forgetPassword && <ForgetPassword />}
      {auth === routes.account.query.inputOTP && <VerifyOTP email={mail as string} />}
      {auth === routes.account.query.resetPassword && (
        <ResetPassword email={mail as string} token={otp as string} />
      )}
    </>
  );
};
