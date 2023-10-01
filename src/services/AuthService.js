import http from '../utils/http-common';

const signUp = (data) => http.post('/auth/signUp', data);
const login = (data) => http.post('/auth/login', data);
const createStore = (data) => http.post('/store/add', data);

const AuthService = {
  signUp,
  login,
  createStore,
};

export default AuthService;
