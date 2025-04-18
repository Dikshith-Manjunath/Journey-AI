/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TravelBlog = () => {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItinerary, setSelectedItinerary] = useState(null);

  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        // Replace with your actual API endpoint
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

  const formatBudget = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  if (loading) return <div className="text-center py-10">Loading itineraries...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Travel Itineraries</h1>
      
      {selectedItinerary ? (
        <ItineraryDetail 
          itinerary={selectedItinerary} 
          onBack={() => setSelectedItinerary(null)}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {itineraries.map((itinerary) => (
            <ItineraryCard 
              key={itinerary._id.$oid} 
              itinerary={itinerary}
              onClick={() => setSelectedItinerary(itinerary)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const ItineraryCard = ({ itinerary, onClick }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
      onClick={onClick}
    >
      <div className="relative h-48">
        <img 
          src={itinerary.thumbnailUrl} 
          alt={itinerary.thumbnailDescription || itinerary.destination} 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
          <p className="text-xs">Photo by {itinerary.thumbnailAuthor}</p>
        </div>
      </div>
      
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{itinerary.destination}</h2>
        <div className="flex justify-between text-sm mb-2">
          <span>{itinerary.duration} Days</span>
          <span className="font-semibold">${itinerary.budget}</span>
        </div>
        <div className="text-sm text-gray-600">
          <p>Traveler: {itinerary.travelerType}</p>
          <p className="mt-2 text-[#0aa8a7] hover:underline">
            View Full Itinerary →
          </p>
        </div>
      </div>
    </div>
  );
};

const ItineraryDetail = ({ itinerary, onBack }) => {
  const [activeDay, setActiveDay] = useState(1);
  
  // Calculate budget percentage
  const budgetPercentage = itinerary.totalCost 
    ? Math.round((itinerary.totalCost / itinerary.budget) * 100) 
    : 0;
  
  const handleDayClick = (day) => {
    setActiveDay(day);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <button 
        onClick={onBack}
        className="px-4 py-2 bg-[#0aa8a7] text-white rounded m-4 hover:bg-[#33bdbc]"
      >
        ← Back to All Itineraries
      </button>
      
      <div className="max-w-6xl mx-auto p-6 bg-gray-50">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="relative h-64">
            <div style={{ position: 'relative', width: '100%', height: '400px' }}>
              <img 
                src={itinerary.thumbnailUrl || "/api/placeholder/1000/400"} 
                alt={itinerary.thumbnailDescription || "Destination Image"} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
              <div className="p-6 text-white">
                <h1 className="text-3xl font-bold">{itinerary.destination}</h1>
                <div className="flex items-center mt-2">
                  <span className="mr-4">{itinerary.duration} Days</span>
                  <span className="mr-4">|</span>
                  <span className="capitalize">{itinerary.travelerType} Traveler</span>
                </div>
                {itinerary.thumbnailAuthor && (
                  <p className="text-sm mt-2">Photo by: {itinerary.thumbnailAuthor}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Budget Overview */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Budget Overview</h2>
          <div className="flex justify-between items-center mb-2">
            <span>Total Budget: ${itinerary.budget}</span>
            <span>Estimated Cost: ${itinerary.totalCost || 0}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full ${budgetPercentage > 90 ? 'bg-red-500' : 'bg-green-500'}`}
              style={{ width: `${Math.min(budgetPercentage, 100)}%` }}
            ></div>
          </div>
          <p className="text-sm mt-1 text-right">{budgetPercentage}% of budget</p>

          {/* Budget Breakdown */}
          {itinerary.budgetBreakdown && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {itinerary.budgetBreakdown.map((item, index) => (
                <div key={index} className="flex justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">{item.category}</p>
                    <p className="text-sm text-gray-600">{item.details}</p>
                  </div>
                  <p className="font-semibold">${item.amount}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Itinerary Navigation */}
        {itinerary.itinerary && (
          <div className="flex overflow-x-auto space-x-2 mb-4">
            {itinerary.itinerary.map((day) => (
              <button
                key={day.day}
                onClick={() => handleDayClick(day.day)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap`}
                style={{
                  backgroundColor: activeDay === day.day ? '#0aa8a7' : 'rgb(229,231,235)',
                  color: 'rgb(75,85,99)'
                }}
              >
                Day {day.day}: {day.title}
              </button>
            ))}
          </div>
        )}

        {/* Active Day Itinerary */}
        {itinerary.itinerary && itinerary.itinerary.filter(day => day.day === activeDay).map((day) => (
          <div key={day.day} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-[#0aa8a7] text-white p-4">
              <h2 className="text-xl font-bold">Day {day.day}: {day.title}</h2>
            </div>
            <div className="p-6">
              {day.activities.map((activity, index) => (
                <div key={index} className="mb-6 last:mb-0">
                  <div className="flex items-start">
                    <div className="min-w-24 mr-4">
                      <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                        {activity.time}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-lg">{activity.activity}</h3>
                      {activity.notes && <p className="text-gray-600 mt-1">{activity.notes}</p>}
                      {activity.cost > 0 && (
                        <p className="text-gray-700 font-medium mt-1">Cost: ${activity.cost}</p>
                      )}
                    </div>
                  </div>
                  {index < day.activities.length - 1 && (
                    <div className="border-l-2 border-blue-200 h-6 ml-12 my-2"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TravelBlog;