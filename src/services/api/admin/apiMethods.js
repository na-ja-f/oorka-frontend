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

// ! report list
// ? GET
export const adminReportList = (page, limit) => {
  return new Promise((resolve, reject) => {
    try {
      const queryParams = `?page=${page}&limit=${limit}`;
      adminApiCalls("get", adminUrl.getReports + queryParams, null)
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
export const adminPostBlock = (postId) => {
  return new Promise((resolve, reject) => {
    try {
      adminApiCalls("put", adminUrl.postBlock, postId)
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


// ! post list
// ? GET
export const adminPostList = (page, limit) => {
  return new Promise((resolve, reject) => {
    try {
      const queryParams = `?page=${page}&limit=${limit}`;
      adminApiCalls("get", adminUrl.postList + queryParams, null)
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


// ! transaction list
// ? GET
export const adminTransactionList = (page, limit) => {
  return new Promise((resolve, reject) => {
    try {
      const queryParams = `?page=${page}&limit=${limit}`;
      adminApiCalls("get", adminUrl.getTransactions + queryParams, null)
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

// ! add hashtag
// ? POST
export const addHashtag = (hashtag) => {
  return new Promise((resolve, reject) => {
    try {
      adminApiCalls("post", adminUrl.addHashtag, hashtag)
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

// ! get hashtag list
// ? GET
export const getHashtags = (page, limit) => {
  return new Promise((resolve, reject) => {
    try {
      const queryParams = `?page=${page}&limit=${limit}`;
      adminApiCalls("get", adminUrl.hashtagList + queryParams, null)
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

// ! add hashtag
// ? put
export const BlockHashtag = (hashtagId) => {
  return new Promise((resolve, reject) => {
    try {
      adminApiCalls("put", adminUrl.blockHashtag, hashtagId)
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

// ! edit hashtag
// ? PATCH
export const editHashtag = (hashtagData) => {
  return new Promise((resolve, reject) => {
    try {
      adminApiCalls("patch", adminUrl.editHashtag, hashtagData)
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

// ! edit hashtag
// ? PATCH
export const chartData = () => {
  return new Promise((resolve, reject) => {
    try {
      adminApiCalls("get", adminUrl.chartData, null)
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

// ! edit hashtag
// ? PATCH
export const getDashboardStats = () => {
  return new Promise((resolve, reject) => {
    try {
      adminApiCalls("get", adminUrl.dashboardStats, null)
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