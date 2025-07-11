const sessionIdtoUserMap = new Map();

export const setUserId = (id, user) => {
  sessionIdtoUserMap.set(id, user);
};

export const getUserId = (id) => {
  return sessionIdtoUserMap.get(id);
};
