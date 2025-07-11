import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    visithistory: {
      type: [{ timestamp: { type: Number } }],
    },
  },
  { timestamps: true }
);

const Url = mongoose.model("Url", urlSchema);

export default Url;
