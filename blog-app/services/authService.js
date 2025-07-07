import jwt from "jsonwebtoken";

export const createtoken = (user) => {
  const payload = {
    fullName: user.fullName,
    email: user.email,
    id: user._id,
    profileImageUrl: user.profileImageUrl,
  };
  const token = jwt.sign(payload, process.env.SECRET_KEY);

  return token;
};

export const validateToken = async (token) => {
  const user = jwt.verify(token, process.env.SECRET_KEY);
  return user;
};
