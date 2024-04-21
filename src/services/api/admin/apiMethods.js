import {adminUrl} from '../endPoints'
import {adminApiCalls} from './apiCalls'

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