"use client";
import { useState } from "react";
import Head from "next/head";
import ItineraryForm from "./ItineraryForm";
import ItineraryDisplay from "./ItineraryDisplay";
import Spinner from "./Spinner";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [itinerary, setItinerary] = useState(null);

  const handleItineraryGenerated = (newItinerary) => {
    setItinerary(newItinerary);
    setIsLoading(false); // Ensure loading state is turned off when itinerary is received
  };

  return (
    <>
      <Head>
        <title>Generate Travel Itinerary Using Llama-3</title>
        <meta name="description" content="Generate personalized travel itineraries for your next adventure" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto py-10 px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Travel Itinerary Generator</h1>
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Spinner />
            <p className="text-lg text-gray-600">Generating your personalized itinerary...</p>
          </div>
        ) : itinerary ? (
          <div>
            
            <ItineraryDisplay itinerary={itinerary} />
            <div className="flex justify-center items-center">
              <button 
                onClick={() => setItinerary(null)} 
                className="mb-6 px-4 py-2 text-white rounded transition-colors"
                style={{ backgroundColor: "#1b938c" }}
              >
                Create New Itinerary
              </button>
            </div>
          </div>
        ) : (
          <ItineraryForm 
            onItineraryGenerated={handleItineraryGenerated}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        )}
      </main>
    </>
  );
}