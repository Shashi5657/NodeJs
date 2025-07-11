import e from "express";
import {
  getAnalytics,
  redirectToUrl,
  UrlShortener,
} from "../controllers/urlController.js";

const router = e.Router();

router.post("/", UrlShortener);

router.get("/:shortId", redirectToUrl);

router.get("/analytics/:shortId", getAnalytics);

export default router;
