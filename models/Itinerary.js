// File: models/Itinerary.js
import mongoose from "mongoose";

const ItinerarySchema = new mongoose.Schema({
  destination: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
    default: "USD",
  },
  language: {
    type: String,
    required: true,
    default: "en",
  },
  travelerType: {
    type: String,
    required: true,
    enum: ["solo", "couple", "family", "friends", "business"],
  },
  interests: {
    type: [String],
    default: [],
  },
  itinerary: [
    {
      day: Number,
      title: String,
      activities: [
        {
          time: String,
          activity: String,
          cost: Number,
          notes: String,
        },
      ],
    },
  ],
  budgetBreakdown: [
    {
      category: String,
      amount: Number,
      details: String,
    },
  ],
  totalCost: {
    type: Number,
    required: true,
  },
  thumbnailUrl: {
    type: String,
    default: "",
  },
  thumbnailAuthor: {
    type: String,
    default: "",
  },
  thumbnailDescription: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Check if the model already exists before creating it
const Itinerary =
  mongoose.models.Itinerary || mongoose.model("Itinerary", ItinerarySchema);

export default Itinerary;
