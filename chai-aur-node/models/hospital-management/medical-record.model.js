import mongoose from "mongoose";

const medicalRecordSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    admittedIn: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },
    diognosis: {
      type: String,
      required: true,
    },
    symptoms: {
      type: [String],
    },
    visitDate: {
      type: Date,
      required: true,
    },
    treatments: [
      {
        description: { type: String, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date },
      },
    ],
    prescriptions: [
      {
        medicineName: { type: String, required: true },
        dosage: { type: String, required: true }, // "1 tablet twice a day"
        duration: { type: String, required: true }, // "7 days"
        notes: { type: String },
      },
    ],
    labTests: [
      {
        testName: { type: String, required: true },
        result: { type: String }, // Can be text or file link
        testDate: { type: Date, default: Date.now },
        attachmentUrl: { type: String }, // If you upload reports
      },
    ],
    allergiesNoted: {
      type: [String],
      default: [],
    },
    followUpRequired: {
      type: Boolean,
      default: false,
    },
    followUpDate: {
      type: Date,
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

export const MedicalRecord = mongoose.model(
  "MedicalRecord",
  medicalRecordSchema
);
