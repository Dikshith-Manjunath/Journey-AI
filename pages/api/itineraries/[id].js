// File: pages/api/itineraries/[id].js
import { MongoClient, ObjectId } from 'mongodb';

// Use your actual connection string
const uri = process.env.MONGODB_URI;
const dbName = "Generate-Itinerary";

export default async function handler(req, res) {
  const { id } = req.query;
  
  if (req.method === 'GET') {
    let client;

    try {
      // Validate ObjectId format
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid itinerary ID format' });
      }

      client = await MongoClient.connect(uri);
      const db = client.db(dbName);
      
      const itinerary = await db.collection('itineraries').findOne({
        _id: new ObjectId(id)
      });

      if (!itinerary) {
        return res.status(404).json({ error: 'Itinerary not found' });
      }

      res.status(200).json(itinerary);
    } catch (error) {
      console.error('Error fetching itinerary:', error);
      res.status(500).json({ error: 'Failed to fetch itinerary from database' });
    } finally {
      if (client) {
        await client.close();
      }
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}