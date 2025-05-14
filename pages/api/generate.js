// File: pages/api/generate-itinerary.js
import OpenAI from "openai";
import mongoose from "mongoose";
import Itinerary from "../../models/Itinerary";

// Initialize the OpenAI client with NVIDIA API endpoint
const openai = new OpenAI({
  apiKey: process.env.NVIDIA_API_KEY,
  baseURL: "https://integrate.api.nvidia.com/v1",
});

// MongoDB connection function
const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    return; // If already connected, return
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {});
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("MongoDB connection failed");
  }
};

// Function to fetch image from Unsplash
async function getUnsplashImage(query) {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1`,
      {
        headers: {
          Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
        },
      },
    );

    const data = await response.json();
    const landscapeImage = data.results.find((img) => img.width > img.height);

    if (data.results && data.results.length > 0) {
      const image = landscapeImage || data.results[0];
      return {
        url: image.urls.regular,
        author: image.user.name,
        description: image.description || image.alt_description || "",
      };
    }

    return null;
  } catch (error) {
    console.error("Error fetching Unsplash image:", error);
    return null;
  }
}

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, error: "Method not allowed" });
  }

  try {
    // Connect to MongoDB
    await connectDB();

    // Log the entire request body to debug what's being received
    console.log("Request body:", JSON.stringify(req.body));

    const {
      destination,
      duration,
      budget,
      travelerType,
      interests,
      language,
      currency,
    } = req.body;

    // Validate required parameters
    if (!destination || !duration || !budget || !travelerType) {
      return res.status(400).json({
        success: false,
        error:
          "Missing required parameters: destination, duration, budget, and travelerType are required",
      });
    }

    // Log the extracted parameters
    console.log("Extracted parameters:", {
      destination,
      duration,
      budget,
      travelerType,
      interests: Array.isArray(interests) ? interests : [],
      language: language || "en",
      currency: currency || "USD",
    });

    console.time("itinerary-generation");
    console.log("Starting itinerary generation for", destination);

    // Prepare the prompt
    const prompt = createItineraryPrompt({
      destination,
      duration,
      budget,
      travelerType,
      interests: Array.isArray(interests) ? interests : [],
      language: language || "en",
      currency: currency || "USD",
    });

    // Call NVIDIA API
    const itineraryData = await generateItineraryWithNvidia(
      prompt,
      language || "en",
    );

    // Ensure the currency and language are correctly set in the response
    itineraryData.currency = currency || "USD";
    itineraryData.language = language || "en";

    // Get image from Unsplash
    const imageQuery = `travel ${destination} landmark`;
    const imageData = await getUnsplashImage(imageQuery);

    // Create a new itinerary document
    const itineraryDoc = new Itinerary({
      ...itineraryData,
      travelerType,
      interests: Array.isArray(interests) ? interests : [],
      language: language || "en",
      currency: currency || "USD",
      thumbnailUrl: imageData?.url || "",
      thumbnailAuthor: imageData?.author || "",
      thumbnailDescription: imageData?.description || "",
    });

    // Save to database
    await itineraryDoc.save();

    console.timeEnd("itinerary-generation");
    console.log("Itinerary generation complete and saved to database");

    // Return the generated itinerary with database ID
    res.status(200).json({
      success: true,
      data: {
        ...itineraryData,
        _id: itineraryDoc._id,
        language: language || "en",
        currency: currency || "USD",
        thumbnailUrl: imageData?.url || "",
        thumbnailAuthor: imageData?.author || "",
        thumbnailDescription: imageData?.description || "",
      },
    });
  } catch (error) {
    console.error("Itinerary generation error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to generate itinerary. Please try again later.",
      details: error.message,
    });
  }
}

// Function to create the prompt with language and currency support
function createItineraryPrompt(params) {
  const {
    destination,
    duration,
    budget,
    travelerType,
    interests,
    language,
    currency,
  } = params;

  // Log the parameters to ensure they are received correctly
  console.log("Prompt parameters:", {
    destination,
    duration,
    budget,
    travelerType,
    interests,
    language,
    currency,
  });

  let interestsText = "";
  if (interests && interests.length > 0) {
    interestsText = `The traveler is particularly interested in: ${interests.join(", ")}.`;
  }

  // Currency symbol mapping (for common currencies)
  const currencySymbols = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
    AUD: "A$",
    CAD: "C$",
    CHF: "CHF",
    CNY: "¥",
    INR: "₹",
    MXN: "MX$",
    SGD: "S$",
    NZD: "NZ$",
    THB: "฿",
    AED: "د.إ",
  };

  const currencySymbol = currencySymbols[currency] || currency;

  // Language instructions - make this more prominent and explicit
  let languageInstructions = "Generate the response in English.";
  if (language && language !== "en") {
    languageInstructions = `IMPORTANT: Please generate the ENTIRE response in ${getLanguageName(language)}.
      All text including day titles, activity descriptions, and notes in the JSON response MUST be in ${getLanguageName(language)}.`;
  }

  return `
${languageInstructions}

Generate a detailed ${duration}-day travel itinerary for a ${travelerType} traveler visiting ${destination} with a budget of ${currencySymbol}${budget}.
${interestsText}

Please format the response as a detailed itinerary with:
1. A day-by-day breakdown of activities
2. Estimated costs for each activity where applicable (using the ${currency} currency)
3. Recommended accommodations that fit the budget
4. Transportation suggestions between locations
5. A budget breakdown by category (accommodation, food, transportation, activities)
6. The total estimated cost of the trip

Make sure the itinerary is realistic, takes into account local travel times, and fits within the specified budget.
Return the response in JSON format with the following structure:
{
  "destination": string,
  "duration": number,
  "budget": number,
  "currency": "${currency}",
  "language": "${language}",
  "itinerary": [
    {
      "day": number,
      "title": string,
      "activities": [
        {
          "time": string (optional),
          "activity": string,
          "cost": number (optional),
          "notes": string (optional)
        }
      ]
    }
  ],
  "budgetBreakdown": [
    {
      "category": string,
      "amount": number,
      "details": string
    }
  ],
  "totalCost": number
}`;
}

// Helper function to get language name from code
function getLanguageName(code) {
  const languages = {
    en: "English",
    es: "Spanish",
    fr: "French",
    de: "German",
    it: "Italian",
    pt: "Portuguese",
    ja: "Japanese",
    zh: "Chinese",
    ru: "Russian",
    ar: "Arabic",
    hi: "Hindi",
    ko: "Korean",
    nl: "Dutch",
    sv: "Swedish",
  };

  return languages[code] || "English";
}

// Function to use NVIDIA API
async function generateItineraryWithNvidia(prompt, language) {
  try {
    console.log(
      `Calling NVIDIA API with Nemotron-Ultra model (language: ${language})...`,
    );

    let completeResponse = "";

    const completion = await openai.chat.completions.create({
      model: "nvidia/llama-3.1-nemotron-70b-instruct",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.5,
      top_p: 1,
      max_tokens: 2048,
      stream: true,
    });

    // Handle streaming response
    for await (const chunk of completion) {
      const content = chunk.choices[0]?.delta?.content || "";
      completeResponse += content;
    }

    console.log("NVIDIA API response complete");

    try {
      // Extract JSON from the response using regex
      const jsonMatch = completeResponse.match(
        /```(?:json)?\s*(\{[\s\S]*?\})\s*```/,
      );

      let jsonString;
      if (jsonMatch && jsonMatch[1]) {
        // If JSON was found in code block, use that
        jsonString = jsonMatch[1];
      } else {
        // Try to find JSON object directly (without code fences)
        const directJsonMatch = completeResponse.match(/(\{[\s\S]*\})/);
        if (directJsonMatch && directJsonMatch[1]) {
          jsonString = directJsonMatch[1];
        } else {
          throw new Error("No JSON data found in response");
        }
      }

      // Parse the extracted JSON
      const itineraryData = JSON.parse(jsonString);

      // Explicitly add/ensure language and currency are in the response
      itineraryData.language = language;
      itineraryData.currency = itineraryData.currency || "USD";

      return itineraryData;
    } catch (parseError) {
      console.error("Error parsing JSON response:", parseError);
      console.log("Raw response:", completeResponse);
      throw new Error(
        "Failed to parse itinerary data. The response was not valid JSON.",
      );
    }
  } catch (error) {
    console.error("Error calling NVIDIA API:", error);
    throw new Error("Failed to generate itinerary with language model");
  }
}
