export const endpoints = {
  base: '/api',
  auth: {
    base: '/auth',
    login: '/login',
    signup: '/signup',
    forgetPassword: '/forget-password',
    verifyOTP: '/verify-otp',
    resetPassword: '/reset-password',
    logout: '/logout',
  },
  user: {
    base: '/user',
    getUser: '/',
  },
  shopify: {
    base: '/shopify',
    init: '/init',
  },
};
