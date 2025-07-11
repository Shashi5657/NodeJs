import ShortUniqueId from "short-unique-id";
import Url from "../models/urlSchema.js";
const uid = new ShortUniqueId({ length: 8 });

export const UrlShortener = async (req, res) => {
  const shortId = uid.randomUUID(); // Generates a unique ID
  console.log(shortId, "shortId"); // This will now print the actual short ID
  const body = req.body;
  const redirectURL = body.url;

  if (!redirectURL) return res.status(400).json({ message: "No URL found" });

  const result = await Url.create({
    shortId: shortId,
    redirectURL,
    visithistory: [],
  });

  return res.json(201).json({ shortID: result.shortId });
};

export const redirectToUrl = async (req, res) => {
  const shortID = req.params.shortId;
  const entry = await Url.findOneAndUpdate(
    {
      shortId: shortID,
    },
    {
      $push: {
        visithistory: { timestamp: Date.now() },
      },
    }
  );

  res.redirect(entry.redirectURL);
};

export const getAnalytics = async (req, res) => {
  const shortId = req.params.shortId;
  const result = await Url.findOne({ shortId });

  if (!result) return res.status(400).json({ message: "url not found" });
  return res.status(200).json({
    totalClicks: result.visithistory.length,
    history: result.visithistory,
  });
};
