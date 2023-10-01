import axios from 'axios';
import { getUserDetails } from './utility';

export default axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-type': 'application/json',
    Authorization: getUserDetails()?.token,
    tenantid: getUserDetails()?.userid,
  },
});
