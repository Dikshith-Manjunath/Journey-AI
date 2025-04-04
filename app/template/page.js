/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from 'react';

const TravelItineraryTemplate = () => {
  // Sample data from your JSON
  const [itineraryData, setItineraryData] = useState({
    "_id": {
      "$oid": "67ef6329a24d1b2febff3bb4"
    },
    "destination": "Tokyo, Japan",
    "duration": 5,
    "budget": 2000,
    "travelerType": "solo",
    "interests": [],
    "thumbnailUrl": "https://images.unsplash.com/photo-1528164344705-47542687000d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MzIwNTR8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBUb2t5byUyMCUyQyUyMEphcGFuJTIwbGFuZG1hcmt8ZW58MHx8fHwxNzQzNzQwNTMyfDA&ixlib=rb-4.0.3&q=80&w=1080",
    "thumbnailAuthor": "Manuel Cosentino",
    "thumbnailDescription": "Chureito Pagoda",
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival and Shinjuku Exploration",
        "activities": [
          {
            "time": "Morning",
            "activity": "Arrive at Narita/Haneda Airport and take train/bus to hotel",
            "cost": 30,
            "notes": "Use N'EX/Skyliner (Narita) or Limousine Bus (Haneda) to Shinjuku"
          },
          {
            "time": "Afternoon",
            "activity": "Check-in at Hotel Rose Garden Shinjuku (or similar, $80/night)",
            "cost": 80,
            "notes": "Budget-friendly hotel with good location"
          },
          {
            "time": "Evening",
            "activity": "Explore Shinjuku Gyoen National Garden (free) and have dinner at a local izakaya ( approx. $20)",
            "cost": 20,
            "notes": "Enjoy local food and drinks at a traditional Japanese gastropub"
          }
        ]
      },
      {
        "day": 2,
        "title": "Tokyo Landmarks",
        "activities": [
          {
            "time": "9:00 AM",
            "activity": "Visit Tokyo Skytree ( Observation Deck: $20)",
            "cost": 20,
            "notes": "Get a panoramic view of the city"
          },
          {
            "time": "12:00 PM",
            "activity": "Lunch at a sushi restaurant near Tsukiji Outer Market (approx. $30)",
            "cost": 30,
            "notes": "Try fresh sushi at a local eatery"
          },
          {
            "time": "2:00 PM",
            "activity": "Visit the famous Shibuya Crossing and take a walk around Harajuku",
            "cost": 0,
            "notes": "Experience Tokyo's vibrant youth culture"
          }
        ]
      },
      {
        "day": 3,
        "title": "Pop Culture and Entertainment",
        "activities": [
          {
            "time": "10:00 AM",
            "activity": "Visit Ghibli Museum ( tickets must be purchased in advance, $20)",
            "cost": 20,
            "notes": "Dedicated to Studio Ghibli's animated films"
          },
          {
            "time": "2:00 PM",
            "activity": "Explore Akihabara, Tokyo's electronics and anime hub",
            "cost": 0,
            "notes": "Browse shops and arcades at your leisure"
          },
          {
            "time": "7:00 PM",
            "activity": "Enjoy a traditional Japanese tea ceremony (approx. $25)",
            "cost": 25,
            "notes": "Learn about Japanese culture and customs"
          }
        ]
      },
      {
        "day": 4,
        "title": "Historical Tokyo",
        "activities": [
          {
            "time": "9:30 AM",
            "activity": "Visit the Meiji Shrine (free, but donations welcome)",
            "cost": 0,
            "notes": "Dedicated to the deified spirits of Emperor Meiji and his wife"
          },
          {
            "time": "12:30 PM",
            "activity": "Lunch at a local restaurant in Asakusa (approx. $25)",
            "cost": 25,
            "notes": "Try traditional Japanese cuisine"
          },
          {
            "time": "2:00 PM",
            "activity": "Explore the Tokyo National Museum (approx. $5)",
            "cost": 5,
            "notes": "Learn about Japanese history and art"
          }
        ]
      },
      {
        "day": 5,
        "title": "Last Day in Tokyo",
        "activities": [
          {
            "time": "Morning",
            "activity": "Last-minute shopping for souvenirs in Ginza (variable costs)",
            "cost": 50,
            "notes": "High-end shopping district with various luxury brands"
          },
          {
            "time": "Afternoon",
            "activity": "Return to Narita/Haneda Airport for departure (approx. $30)",
            "cost": 30,
            "notes": "Use N'EX/Skyliner (Narita) or Limousine Bus (Haneda)"
          }
        ]
      }
    ],
    "budgetBreakdown": [
      {
        "category": "Accommodation",
        "amount": 400,
        "details": "4 nights at Hotel Rose Garden Shinjuku (or similar, $80/night)"
      },
      {
        "category": "Food",
        "amount": 530,
        "details": "Approximate daily food budget ($106/day) for meals and snacks"
      },
      {
        "category": "Transportation",
        "amount": 120,
        "details": "Airport transfers, train fares, and local travel"
      },
      {
        "category": "Activities",
        "amount": 150,
        "details": "Entrance fees, guided tours, and experiences"
      }
    ],
    "totalCost": 1200
  });

  const [activeDay, setActiveDay] = useState(1);

  const handleDayClick = (day) => {
    setActiveDay(day);
  };

  // Calculate the percentage of budget spent
  const budgetPercentage = Math.round((itineraryData.totalCost / itineraryData.budget) * 100);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50">
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="relative h-64">
          <div style={{ position: 'relative', width: '100%', height: '400px' }}>
          <img 
            src={itineraryData.thumbnailUrl || "/api/placeholder/1000/400"} 
            alt={itineraryData.thumbnailDescription || "Destination Image"} 
            className="w-full h-full object-cover"
          />
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
            <div className="p-6 text-white">
              <h1 className="text-3xl font-bold">{itineraryData.destination}</h1>
              <div className="flex items-center mt-2">
                <span className="mr-4">{itineraryData.duration} Days</span>
                <span className="mr-4">|</span>
                <span className="capitalize">{itineraryData.travelerType} Traveler</span>
              </div>
              {itineraryData.thumbnailAuthor && (
                <p className="text-sm mt-2">Photo by: {itineraryData.thumbnailAuthor}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Budget Overview */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Budget Overview</h2>
        <div className="flex justify-between items-center mb-2">
          <span>Total Budget: ${itineraryData.budget}</span>
          <span>Estimated Cost: ${itineraryData.totalCost}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className={`h-2.5 rounded-full ${budgetPercentage > 90 ? 'bg-red-500' : 'bg-green-500'}`}
            style={{ width: `${Math.min(budgetPercentage, 100)}%` }}
          ></div>
        </div>
        <p className="text-sm mt-1 text-right">{budgetPercentage}% of budget</p>

        {/* Budget Breakdown */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {itineraryData.budgetBreakdown.map((item, index) => (
            <div key={index} className="flex justify-between border-b pb-2">
              <div>
                <p className="font-medium">{item.category}</p>
                <p className="text-sm text-gray-600">{item.details}</p>
              </div>
              <p className="font-semibold">${item.amount}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Itinerary Navigation */}
      <div className="flex overflow-x-auto space-x-2 mb-4">
        {itineraryData.itinerary.map((day) => (
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

      {/* Active Day Itinerary */}
      {itineraryData.itinerary.filter(day => day.day === activeDay).map((day) => (
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
  );
};

export default TravelItineraryTemplate;