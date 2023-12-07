import { setUser, clearUser } from './userReducer';

export const userMiddleware = (store) => (next) => (action) => {
  if (action.type === setUser.type) {
    // save username into sessionStorage
    sessionStorage.setItem('userInfo', JSON.stringify(action.payload));
  } else if (action.type === clearUser.type) {
    // delete username from sessionStorage
    sessionStorage.removeItem('userInfo');
  }

  return next(action);
};
