// app/api/itineraries/[id]/route.js
import { MongoClient, ObjectId } from 'mongodb';

export async function GET(request, { params }) {
  const { id } = params;
  
  if (!id) {
    return new Response(JSON.stringify({ error: 'Itinerary ID is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Connect to MongoDB
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    const database = client.db(process.env.MONGODB_DB);
    const collection = database.collection('itineraries');
    
    // Try to convert the id to ObjectId for MongoDB query
    let objectId;
    try {
      objectId = new ObjectId(id);
    } catch (e) {
      return new Response(JSON.stringify({ error: 'Invalid itinerary ID format' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Find the itinerary by ID
    const itinerary = await collection.findOne({ '_id': objectId });
    
    if (!itinerary) {
      return new Response(JSON.stringify({ error: 'Itinerary not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    return new Response(JSON.stringify(itinerary), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error retrieving itinerary:', error);
    return new Response(JSON.stringify({ error: 'Failed to retrieve itinerary' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  } finally {
    await client.close();
  }
}