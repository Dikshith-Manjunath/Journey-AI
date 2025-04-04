// File: pages/api/itineraries.js
import mongoose from 'mongoose';
import Itinerary from '../../models/Itinerary';

// MongoDB connection function (same as in generate.js)
const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    return; // If already connected, return
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('MongoDB connection failed');
  }
};

export default async function handler(req, res) {
  await connectDB();

  // GET - fetch itineraries
  if (req.method === 'GET') {
    try {
      const { id, destination, limit = 10, skip = 0 } = req.query;
      
      // If ID is provided, fetch a specific itinerary
      if (id) {
        const itinerary = await Itinerary.findById(id);
        if (!itinerary) {
          return res.status(404).json({
            success: false,
            error: 'Itinerary not found',
          });
        }
        return res.status(200).json({
          success: true,
          data: itinerary,
        });
      }
      
      // Build query for destination search if provided
      const query = destination 
        ? { $text: { $search: destination } } 
        : {};
      
      // Get total count for pagination
      const total = await Itinerary.countDocuments(query);
      
      // Fetch itineraries with pagination
      const itineraries = await Itinerary.find(query)
        .sort({ createdAt: -1 })
        .skip(parseInt(skip))
        .limit(parseInt(limit));
      
      return res.status(200).json({
        success: true,
        count: itineraries.length,
        total,
        data: itineraries,
      });
    } catch (error) {
      console.error('Error fetching itineraries:', error);
      return res.status(500).json({
        success: false,
        error: 'Server error',
      });
    }
  }
  
  // DELETE - remove an itinerary
  else if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'Please provide an itinerary ID',
        });
      }
      
      const deletedItinerary = await Itinerary.findByIdAndDelete(id);
      
      if (!deletedItinerary) {
        return res.status(404).json({
          success: false,
          error: 'Itinerary not found',
        });
      }
      
      return res.status(200).json({
        success: true,
        data: {},
      });
    } catch (error) {
      console.error('Error deleting itinerary:', error);
      return res.status(500).json({
        success: false,
        error: 'Server error',
      });
    }
  }
  
  // Method not allowed
  else {
    res.setHeader('Allow', ['GET', 'DELETE']);
    return res.status(405).json({
      success: false,
      error: `Method ${req.method} not allowed`,
    });
  }
}