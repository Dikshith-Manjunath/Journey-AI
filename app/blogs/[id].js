// File: pages/itinerary/[id].js
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MongoClient, ObjectId } from 'mongodb';
import TravelItineraryTemplate from '../../layouts/components/TravelItineraryTemplate';

export default function ItineraryDetail({ itinerary }) {
  const router = useRouter();

  // Show loading state while page is being server-side rendered
  if (router.isFallback) {
    return <div className="text-center py-20 text-xl">Loading itinerary...</div>;
  }

  // If no itinerary data was found
  if (!itinerary) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold mb-4">Itinerary not found</h1>
        <Link href="/blog">
          <a className="text-blue-600 hover:underline">Back to all itineraries</a>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>{itinerary.destination} - {itinerary.duration} Day Itinerary</title>
        <meta name="description" content={`${itinerary.duration}-day travel itinerary for ${itinerary.destination}`} />
      </Head>
      <div className="max-w-6xl mx-auto pt-6 px-4">
        <Link href="/blog">
          <a className="inline-flex items-center px-4 py-2 mb-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Itineraries
          </a>
        </Link>
      </div>
      <TravelItineraryTemplate initialData={itinerary} />
    </div>
  );
}

// This function gets called at build time
export async function getStaticPaths() {
  // Connect to MongoDB
  const uri = process.env.MONGODB_URI;
  const client = await MongoClient.connect(uri);
  const db = client.db("Generate-Itinerary");

  // Get all itinerary IDs
  const itineraries = await db.collection('itineraries').find({}, { projection: { _id: 1 } }).toArray();

  // Close connection
  await client.close();

  // Generate paths
  const paths = itineraries.map((itinerary) => ({
    params: { id: itinerary._id.toString() },
  }));

  return { paths, fallback: true };
}

// This function gets called at build time
export async function getStaticProps({ params }) {
  const { id } = params;

  // Check if id is valid
  if (!ObjectId.isValid(id)) {
    return { props: { itinerary: null } };
  }

  try {
    // Connect to MongoDB
    const uri = process.env.MONGODB_URI;
    const client = await MongoClient.connect(uri);
    const db = client.db("Generate-Itinerary");

    // Get itinerary data
    const itinerary = await db.collection('itineraries').findOne({ _id: new ObjectId(id) });

    // Close connection
    await client.close();

    // Convert ObjectId to string for serialization
    const serializedItinerary = JSON.parse(JSON.stringify(itinerary));

    return {
      props: {
        itinerary: serializedItinerary,
      },
      // Re-generate the page at most once every hour
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Error fetching itinerary:', error);
    return {
      props: {
        itinerary: null,
      },
      revalidate: 60,
    };
  }
}
