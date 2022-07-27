import axios from 'axios';

async function registrationUser(username, email, password) {
  return axios({
    method: 'post',
    url: '/api/v1/users/registration',
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify({
      username: username,
      email: email,
      password: password,
      returnSecureToken: true,
    }),
  });
}
async function authorisationUser(email, password) {
  return axios({
    method: 'post',
    url: '/api/v1/users/authorisation',
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify({
      email,
      password,
      returnSecureToken: true,
    }),
  });
}
async function sendEmail(email) {
  return axios({
    method: 'post',
    url: '/api/v1/users/email',
    data: {
      email: email,
    },
  });
}
async function sendPass(oobCode, password) {
  return axios({
    method: 'post',
    url: '/api/v1/users/password',
    data: {
      oobCode,
      password,
    },
  });
}
async function updateUser(username, idToken, password) {
  return axios({
    method: 'post',
    url: '/api/v1/users/update',
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify({
      username,
      idToken,
      password,
      returnSecureToken: false,
    }),
  });
}

export { registrationUser, authorisationUser, sendEmail, sendPass, updateUser };
