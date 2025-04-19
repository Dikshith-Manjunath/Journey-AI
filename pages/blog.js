// File: pages/blog.js
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';

export default function TravelBlog() {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        const response = await axios.get('/api/itineraries');
        setItineraries(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch itineraries');
        setLoading(false);
        console.error('Error fetching itineraries:', err);
      }
    };

    fetchItineraries();
  }, []);

  if (loading) return <div className="text-center py-20 text-xl">Loading travel itineraries...</div>;
  if (error) return <div className="text-center py-20 text-xl text-red-600">{error}</div>;

  return (
    <div>
      <Head>
        <title>Travel Itinerary Blog</title>
        <meta name="description" content="Explore our curated travel itineraries from around the world" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-10">Travel Itineraries</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {itineraries.map((itinerary) => (
            <Link href={`/itinerary/${itinerary._id.$oid || itinerary._id}`} key={itinerary._id.$oid || itinerary._id}>
              <a className="block h-full">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300 h-full">
                  <div className="relative h-56">
                    <img 
                      src={itinerary.thumbnailUrl} 
                      alt={itinerary.thumbnailDescription || itinerary.destination} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-3">
                      <h2 className="text-2xl font-bold">{itinerary.destination}</h2>
                      <p className="text-sm">Photo by {itinerary.thumbnailAuthor}</p>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <div className="flex justify-between mb-3">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {itinerary.duration} Days
                      </span>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        ${itinerary.budget}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-3">
                      {itinerary.travelerType === "solo" ? "Solo Traveler" : itinerary.travelerType}
                    </p>
                    
                    {itinerary.itinerary && itinerary.itinerary[0] && (
                      <p className="text-sm mb-3 line-clamp-3">
                        {itinerary.itinerary[0].title} and more...
                      </p>
                    )}
                    
                    <div className="text-blue-600 font-medium hover:underline mt-3">
                      View Full Itinerary →
                    </div>
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}