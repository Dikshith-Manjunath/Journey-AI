// File: models/Itinerary.js
import mongoose from 'mongoose';

// Define schema for activities within each day
const ActivitySchema = new mongoose.Schema({
  time: { type: String }, // Optional time for the activity
  activity: { type: String, required: true },
  cost: { type: Number }, // Optional cost
  notes: { type: String } // Optional additional notes
});

// Define schema for each day in the itinerary
const DaySchema = new mongoose.Schema({
  day: { type: Number, required: true },
  title: { type: String, required: true },
  activities: [ActivitySchema]
});

// Define schema for budget breakdown
const BudgetBreakdownSchema = new mongoose.Schema({
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  details: { type: String }
});

// Main itinerary schema
const ItinerarySchema = new mongoose.Schema({
  destination: { type: String, required: true },
  duration: { type: Number, required: true },
  budget: { type: Number, required: true },
  travelerType: { type: String, required: true },
  interests: [{ type: String }],
  thumbnailUrl: { type: String }, // URL from Unsplash API
  thumbnailAuthor: { type: String }, // Attribution for Unsplash photographer
  thumbnailDescription: { type: String }, // Description of the image
  itinerary: [DaySchema],
  budgetBreakdown: [BudgetBreakdownSchema],
  totalCost: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Create text indexes for searching
ItinerarySchema.index({ destination: 'text' });

// Auto-update the updatedAt field
ItinerarySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.models.Itinerary || mongoose.model('Itinerary', ItinerarySchema);