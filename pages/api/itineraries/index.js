// File: pages/api/itineraries/index.js
import { MongoClient } from 'mongodb';

// Use your actual connection string
const uri = process.env.MONGODB_URI;
const dbName = "Generate-Itinerary";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    let client;

    try {
      client = await MongoClient.connect(uri);
      const db = client.db(dbName);
      const itineraries = await db.collection('itineraries').find({}).toArray();

      res.status(200).json(itineraries);
    } catch (error) {
      console.error('Error fetching itineraries:', error);
      res.status(500).json({ error: 'Failed to fetch itineraries from database' });
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