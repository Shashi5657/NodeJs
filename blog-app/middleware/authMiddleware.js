import { validateToken } from "../services/authService.js";

export const checkForCookieToken = (cookieToken) => {
  return async (req, res, next) => {
    const cookieValue = req.cookies[cookieToken];
    if (!cookieValue) {
      return next();
    }

    try {
      const userPayload = await validateToken(cookieValue);
      req.user = userPayload;
      res.locals.user = userPayload;
    } catch (error) {
      res.clearCookie(cookieToken);
    }
    return next();
  };
};
