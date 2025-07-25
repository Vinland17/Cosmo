// You'll need to get your NASA API key from https://api.nasa.gov/
const NASA_API_KEY = "uuOdlOn9jiINUdlc8rTehM0lnlFJ6b1cpKBmrh9U"; // Replace with your actual API key later

const BASE_URL = "https://api.nasa.gov";

export const nasaAPI = {
  // Astronomy Picture of the Day
  getAPOD: async (date = "") => {
    try {
      const url = `${BASE_URL}/planetary/apod?api_key=${NASA_API_KEY}${date ? `&date=${date}` : ""}`;
      const response = await fetch(url);
      return response.json();
    } catch (error) {
      console.error("Error fetching APOD:", error);
      return null;
    }
  },

  // Mars Rover Photos
  getMarsRoverPhotos: async (rover = "curiosity", sol = 1000) => {
    try {
      const url = `${BASE_URL}/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&api_key=${NASA_API_KEY}`;
      const response = await fetch(url);
      return response.json();
    } catch (error) {
      console.error("Error fetching Mars photos:", error);
      return null;
    }
  },

  // Near Earth Objects
  getNearEarthObjects: async (startDate, endDate) => {
    try {
      const url = `${BASE_URL}/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${NASA_API_KEY}`;
      const response = await fetch(url);
      return response.json();
    } catch (error) {
      console.error("Error fetching NEO data:", error);
      return null;
    }
  },
};
