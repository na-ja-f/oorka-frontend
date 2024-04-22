import { adminUrl } from '../endPoints'
import { adminApiCalls } from './apiCalls'

// ! Admin login
// ? POST
export const adminLogin = (adminData) => {
  return new Promise((resolve, reject) => {
    try {
      adminApiCalls("post", adminUrl.login, adminData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      reject(error);
    }
  });
};

// ! users list
// ? GET
export const adminUsersList = (page, limit) => {
  return new Promise((resolve, reject) => {
    try {
      const queryParams = `?page=${page}&limit=${limit}`
      adminApiCalls("get", adminUrl.userList + queryParams, null)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      reject(error);
    }
  });
};

// ! user blocking
// ? POST
export const userBlock = (userId) => {
  return new Promise((resolve, reject) => {
    try {
      adminApiCalls("post", adminUrl.userBlock, userId)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      reject(error);
    }
  });
};