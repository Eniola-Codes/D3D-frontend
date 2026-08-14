export const routes = {
  home: '/',
  error: '/error',
  dashboard: {
    path: {
      base: '/dashboard',
      myProducts: '/products',
    },
    keys: {
      token: 'token',
    },
  },
  account: {
    path: {
      base: '/account',
    },
    keys: {
      auth: 'auth',
      mail: 'email',
      token: 'token',
      error: 'error',
    },
    query: {
      login: 'login',
      signup: 'signup',
      forgetPassword: 'forget-password',
      inputOTP: 'input-otp',
      resetPassword: 'reset-password',
      connectStore: 'connect-store',
    },
  },
};
