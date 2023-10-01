import axios from 'axios';

export default axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-type': 'application/json',
    Authorization: 'userDetails' in localStorage ? JSON.parse(localStorage.getItem('userDetails')).token : '',
    tenantid: 'userDetails' in localStorage ? JSON.parse(localStorage.getItem('userDetails')).userid : '',
  },
});
