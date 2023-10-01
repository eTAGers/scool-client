export function getUserDetails() {
  return JSON.parse(localStorage.getItem('userDetails'));
}
