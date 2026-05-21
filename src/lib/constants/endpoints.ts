export const endpoints = {
  base: '/api',
  auth: {
    base: '/v1/auth',
    login: '/login',
    signup: '/signup',
    forgetPassword: '/forget-password',
    verifyOTP: '/verify-otp',
    resetPassword: '/reset-password',
    logout: '/logout',
  },
  user: {
    base: '/v1/user',
    getUser: '/',
  },
  products: {
    base: '/v1/products',
    getProducts: '/',
  },
  shopify: {
    base: '/shopify',
    init: '/init',
  },
};
