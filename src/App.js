import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// NASA API configuration with your key
const NASA_API_KEY = "uuOdlOn9jiINUdlc8rTehM0lnlFJ6b1cpKBmrh9U";
const BASE_URL = "https://api.nasa.gov";

export default function App() {
  return (
    <Router>
      <div style={{
        background: 'linear-gradient(135deg, #0B1426 0%, #1A0B33 100%)',
        color: '#F8FAFC',
        minHeight: '100vh'
      }}>
        {/* Floating stars and planets background */}
        <StarField />

        <Header />
        <HeroSection />
        <ServiceSection />
        <Footer />
      </div>
    </Router>
  );
}

// Background floating elements
function StarField() {
  return (
    <>
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '4px',
        height: '4px',
        borderRadius: '50%',
        backgroundColor: '#F8FAFC',
        opacity: 0.8,
        animation: 'float 6s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '33%',
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: '#F8FAFC',
        opacity: 0.6,
        animation: 'float 8s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '20%',
        width: '4px',
        height: '4px',
        borderRadius: '50%',
        backgroundColor: '#F8FAFC',
        opacity: 0.7,
        animation: 'float 7s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        top: '25%',
        left: '-80px',
        width: '160px',
        height: '160px',
        borderRadius: '50%',
        backgroundColor: '#2DD4BF',
        opacity: 0.3,
        animation: 'spin 20s linear infinite'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '0',
        right: '-128px',
        width: '288px',
        height: '288px',
        borderRadius: '50%',
        backgroundColor: '#2DD4BF',
        opacity: 0.2,
        animation: 'spin 25s linear infinite'
      }} />
    </>
  );
}

// Header Component
function Header() {
  return (
    <header style={{
      position: 'fixed',
      top: '16px',
      left: '16px',
      right: '16px',
      zIndex: 50,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 24px',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '12px'
    }}>
      <a href="/" style={{
        fontSize: '1.25rem',
        fontWeight: 'bold',
        letterSpacing: '0.05em',
        textDecoration: 'none',
        color: '#F8FAFC'
      }}>
        Vinland
      </a>

      <nav style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
        <button style={{
          background: 'none',
          border: 'none',
          color: '#F8FAFC',
          cursor: 'pointer',
          fontSize: '1rem'
        }}>
          Services ▾
        </button>
        
        <a href="/about" style={{
          textDecoration: 'none',
          color: '#F8FAFC',
          fontSize: '1rem'
        }}>
          About
        </a>
      </nav>
    </header>
  );
}

// Hero Section with Animation
function HeroSection() {
  return (
    <section style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: '0 16px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '896px',
        aspectRatio: '16/9',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '12px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: '800',
          margin: 0,
          background: 'linear-gradient(45deg, #F8FAFC, #2DD4BF)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Welcome to Cosmo-Discover
        </h1>
      </div>
      
      <p style={{
        marginTop: '24px',
        fontSize: '1.125rem',
        fontStyle: 'italic',
        color: '#F8FAFC'
      }}>
        Find the world beyond sky's
      </p>
      
      <a href="#service-0" style={{
        marginTop: '32px',
        padding: '12px 24px',
        borderRadius: '8px',
        background: '#2DD4BF',
        color: '#0B1426',
        fontWeight: '600',
        textDecoration: 'none'
      }}>
        It's free
      </a>
    </section>
  );
}

// Service Section with ALL 5 NASA APIs Integration (Enhanced Visual Design)
function ServiceSection() {
  const [apodData, setApodData] = useState(null);
  const [marsPhotos, setMarsPhotos] = useState([]);
  const [earthImages, setEarthImages] = useState([]);
  const [asteroidData, setAsteroidData] = useState([]);
  const [spaceWeatherData, setSpaceWeatherData] = useState([]);
  const [loadingAPOD, setLoadingAPOD] = useState(true);
  const [loadingMars, setLoadingMars] = useState(true);
  const [loadingEarth, setLoadingEarth] = useState(true);
  const [loadingAsteroids, setLoadingAsteroids] = useState(true);
  const [loadingSpaceWeather, setLoadingSpaceWeather] = useState(true);
  const [apodError, setApodError] = useState(null);
  const [marsError, setMarsError] = useState(null);
  const [earthError, setEarthError] = useState(null);
  const [asteroidError, setAsteroidError] = useState(null);
  const [spaceWeatherError, setSpaceWeatherError] = useState(null);
  const [selectedRover, setSelectedRover] = useState('curiosity');
  const [selectedLocation, setSelectedLocation] = useState('new-york');

  // Helper function to get threat level styling for asteroids
  const getAsteroidThreatLevel = (asteroid) => {
    const distance = asteroid.close_approach_data[0]?.miss_distance?.kilometers || 0;
    const isHazardous = asteroid.is_potentially_hazardous_asteroid;
    const size = asteroid.estimated_diameter?.meters?.estimated_diameter_max || 0;
    
    if (isHazardous || distance < 1000000) {
      return {
        level: 'critical',
        color: '#ff4757',
        glow: '0 0 20px rgba(255, 71, 87, 0.4)',
        bgGradient: 'linear-gradient(135deg, rgba(255, 71, 87, 0.2) 0%, rgba(255, 71, 87, 0.05) 100%)',
        borderColor: 'rgba(255, 71, 87, 0.5)',
        animation: 'pulse 2s infinite'
      };
    } else if (distance < 5000000) {
      return {
        level: 'warning',
        color: '#ffa726',
        glow: '0 0 15px rgba(255, 167, 38, 0.3)',
        bgGradient: 'linear-gradient(135deg, rgba(255, 167, 38, 0.2) 0%, rgba(255, 167, 38, 0.05) 100%)',
        borderColor: 'rgba(255, 167, 38, 0.5)'
      };
    } else if (distance < 10000000) {
      return {
        level: 'caution',
        color: '#ffeb3b',
        glow: '0 0 10px rgba(255, 235, 59, 0.2)',
        bgGradient: 'linear-gradient(135deg, rgba(255, 235, 59, 0.15) 0%, rgba(255, 235, 59, 0.03) 100%)',
        borderColor: 'rgba(255, 235, 59, 0.4)'
      };
    } else {
      return {
        level: 'safe',
        color: '#66bb6a',
        glow: '0 0 8px rgba(102, 187, 106, 0.2)',
        bgGradient: 'linear-gradient(135deg, rgba(102, 187, 106, 0.15) 0%, rgba(102, 187, 106, 0.03) 100%)',
        borderColor: 'rgba(102, 187, 106, 0.4)'
      };
    }
  };

  // Helper function to get solar flare intensity styling
  const getFlareIntensity = (flare) => {
    const classType = flare.classType || 'Unknown';
    const flareClass = classType.charAt(0);
    
    switch(flareClass) {
      case 'X':
        return {
          intensity: 'extreme',
          color: '#e53e3e',
          glow: '0 0 25px rgba(229, 62, 62, 0.6)',
          bgGradient: 'linear-gradient(135deg, rgba(229, 62, 62, 0.3) 0%, rgba(229, 62, 62, 0.1) 100%)',
          borderColor: 'rgba(229, 62, 62, 0.6)',
          animation: 'solarFlare 3s ease-in-out infinite'
        };
      case 'M':
        return {
          intensity: 'strong',
          color: '#ff8c00',
          glow: '0 0 20px rgba(255, 140, 0, 0.5)',
          bgGradient: 'linear-gradient(135deg, rgba(255, 140, 0, 0.25) 0%, rgba(255, 140, 0, 0.08) 100%)',
          borderColor: 'rgba(255, 140, 0, 0.5)'
        };
      case 'C':
        return {
          intensity: 'moderate',
          color: '#ffd700',
          glow: '0 0 15px rgba(255, 215, 0, 0.4)',
          bgGradient: 'linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(255, 215, 0, 0.06) 100%)',
          borderColor: 'rgba(255, 215, 0, 0.4)'
        };
      case 'B':
        return {
          intensity: 'minor',
          color: '#32cd32',
          glow: '0 0 10px rgba(50, 205, 50, 0.3)',
          bgGradient: 'linear-gradient(135deg, rgba(50, 205, 50, 0.15) 0%, rgba(50, 205, 50, 0.04) 100%)',
          borderColor: 'rgba(50, 205, 50, 0.3)'
        };
      case 'A':
        return {
          intensity: 'minimal',
          color: '#87ceeb',
          glow: '0 0 8px rgba(135, 206, 235, 0.2)',
          bgGradient: 'linear-gradient(135deg, rgba(135, 206, 235, 0.12) 0%, rgba(135, 206, 235, 0.03) 100%)',
          borderColor: 'rgba(135, 206, 235, 0.3)'
        };
      default:
        return {
          intensity: 'unknown',
          color: '#9CA3AF',
          glow: '0 0 5px rgba(156, 163, 175, 0.2)',
          bgGradient: 'linear-gradient(135deg, rgba(156, 163, 175, 0.1) 0%, rgba(156, 163, 175, 0.02) 100%)',
          borderColor: 'rgba(156, 163, 175, 0.3)'
        };
    }
  };

  // Load APOD data when component mounts
  useEffect(() => {
    const loadAPOD = async () => {
      try {
        const response = await fetch(`${BASE_URL}/planetary/apod?api_key=${NASA_API_KEY}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setApodData(data);
        setLoadingAPOD(false);
      } catch (error) {
        console.error("Error loading APOD:", error);
        setApodError(error.message);
        setLoadingAPOD(false);
      }
    };

    loadAPOD();
  }, []);

  // Load Mars Rover photos - WITH OPPORTUNITY HISTORICAL INFORMATION
  useEffect(() => {
    const loadMarsPhotos = async () => {
      setLoadingMars(true);
      try {
        // For Opportunity, show static historical info instead of API call
        if (selectedRover === 'opportunity') {
          // Static historical photos for Opportunity rover
          const opportunityHistoricalPhotos = [
            {
              id: 'opp_1',
              img_src: 'https://photojournal.jpl.nasa.gov/jpeg/PIA05547.jpg',
              camera: { full_name: 'Panoramic Camera' },
              sol: 88,
              earth_date: '2004-04-03',
              rover: { name: 'Opportunity' }
            },
            {
              id: 'opp_2',
              img_src: 'https://photojournal.jpl.nasa.gov/jpeg/PIA07269.jpg',
              camera: { full_name: 'Navigation Camera' },
              sol: 456,
              earth_date: '2005-05-04',
              rover: { name: 'Opportunity' }
            },
            {
              id: 'opp_3',
              img_src: 'https://photojournal.jpl.nasa.gov/jpeg/PIA16703.jpg',
              camera: { full_name: 'Panoramic Camera' },
              sol: 3153,
              earth_date: '2012-12-19',
              rover: { name: 'Opportunity' }
            },
            {
              id: 'opp_4',
              img_src: 'https://photojournal.jpl.nasa.gov/jpeg/PIA21723.jpg',
              camera: { full_name: 'Panoramic Camera' },
              sol: 4750,
              earth_date: '2017-06-16',
              rover: { name: 'Opportunity' }
            }
          ];

          setMarsPhotos(opportunityHistoricalPhotos);
          setLoadingMars(false);
          return;
        }

        // For active rovers (Curiosity and Perseverance), use API
        const solDates = {
          curiosity: 1200,      // Recent photos from active rover
          perseverance: 800,    // Recent photos from newest rover
        };

        const sol = solDates[selectedRover] || 1000;

        // Get photos from the appropriate Sol date for active rovers
        const response = await fetch(
          `${BASE_URL}/mars-photos/api/v1/rovers/${selectedRover}/photos?sol=${sol}&api_key=${NASA_API_KEY}&page=1`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        // Get first 8 photos for the gallery
        setMarsPhotos(data.photos.slice(0, 8) || []);
        setLoadingMars(false);
      } catch (error) {
        console.error("Error loading Mars photos:", error);
        setMarsError(error.message);
        setLoadingMars(false);
      }
    };

    loadMarsPhotos();
  }, [selectedRover]);
  // Load Earth Images
  useEffect(() => {
    setLoadingEarth(true);
    setEarthError(null);

    // Using your working NASA URLs with second images added
    const workingEarthImages = {
      'new-york': [
        {
          id: 'earth_ny_1',
          url: 'https://images-assets.nasa.gov/image/STS059-50-003/STS059-50-003~medium.jpg',
          date: '2023-06-15',
          location: 'New York City from Space',
          coordinates: '40.7128, -74.0060'
        },
        {
          id: 'earth_ny_2',
          url: 'https://images-assets.nasa.gov/image/s42-75-061/s42-75-061~medium.jpg',
          date: '2023-08-20',
          location: 'New York City from Space',
          coordinates: '40.7128, -74.0060'
        }
      ],
      'amazon': [
        {
          id: 'earth_amazon_1',
          url: 'https://images-assets.nasa.gov/image/s43-151-141/s43-151-141~medium.jpg',
          date: '2023-06-15',
          location: 'Amazon Rainforest from Space',
          coordinates: '-3.4653, -62.2159'
        },
        {
          id: 'earth_amazon_2',
          url: 'https://images-assets.nasa.gov/image/s43-152-000b/s43-152-000b~medium.jpg',
          date: '2023-08-20',
          location: 'Amazon Rainforest from Space',
          coordinates: '-3.4653, -62.2159'
        }
      ],
      'sahara': [
        {
          id: 'earth_sahara_1',
          url: 'https://images-assets.nasa.gov/image/iss040e008893/iss040e008893~medium.jpg',
          date: '2023-06-15',
          location: 'Sahara Desert from Space',
          coordinates: '23.8859, 0.2446'
        },
        {
          id: 'earth_sahara_2',
          url: 'https://images-assets.nasa.gov/image/sts068-228-081/sts068-228-081~medium.jpg',
          date: '2023-08-20',
          location: 'Sahara Desert from Space',
          coordinates: '23.8859, 0.2446'
        }
      ],
      'himalayas': [
        {
          id: 'earth_himalayas_1',
          url: 'https://images-assets.nasa.gov/image/iss072e397138/iss072e397138~medium.jpg',
          date: '2023-06-15',
          location: 'Himalayas from Space',
          coordinates: '27.9881, 86.9250'
        },
        {
          id: 'earth_himalayas_2',
          url: 'https://images-assets.nasa.gov/image/iss066e141209/iss066e141209~medium.jpg',
          date: '2023-08-20',
          location: 'Himalayas from Space',
          coordinates: '27.9881, 86.9250'
        }
      ],
      'great-wall': [
        {
          id: 'earth_wall_1',
          url: 'https://images-assets.nasa.gov/image/iss010e18338/iss010e18338~medium.jpg',
          date: '2023-06-15',
          location: 'Great Wall of China from Space',
          coordinates: '40.4319, 116.5704'
        },
        {
          id: 'earth_wall_2',
          url: 'https://images-assets.nasa.gov/image/PIA01838/PIA01838~medium.jpg',
          date: '2023-08-20',
          location: 'Great Wall of China from Space',
          coordinates: '40.4319, 116.5704'
        }
      ],
      'antarctica': [
        {
          id: 'earth_antarctica_1',
          url: 'https://images-assets.nasa.gov/image/ED04-0056-131/ED04-0056-131~medium.jpg',
          date: '2023-06-15',
          location: 'Antarctica from Space',
          coordinates: '-77.8419, 166.6863'
        },
        {
          id: 'earth_antarctica_2',
          url: 'https://images-assets.nasa.gov/image/ED04-0056-132/ED04-0056-132~medium.jpg',
          date: '2023-08-20',
          location: 'Antarctica from Space',
          coordinates: '-77.8419, 166.6863'
        }
      ]
    };

    // Get images for selected location
    const locationImages = workingEarthImages[selectedLocation] || workingEarthImages['new-york'];
    setEarthImages(locationImages);
    setLoadingEarth(false);
  }, [selectedLocation]);

  // Load Asteroid Data
  useEffect(() => {
    const loadAsteroids = async () => {
      setLoadingAsteroids(true);
      try {
        const today = new Date().toISOString().split('T')[0];
        const response = await fetch(`${BASE_URL}/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${NASA_API_KEY}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        const asteroids = Object.values(data.near_earth_objects).flat().slice(0, 6);
        setAsteroidData(asteroids);
        setLoadingAsteroids(false);
      } catch (error) {
        console.error("Error loading asteroids:", error);
        setAsteroidError(error.message);
        setLoadingAsteroids(false);
      }
    };
    loadAsteroids();
  }, []);

  // Load Space Weather Data
  useEffect(() => {
    const loadSpaceWeather = async () => {
      setLoadingSpaceWeather(true);
      try {
        const endDate = new Date().toISOString().split('T')[0];
        const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        const response = await fetch(`${BASE_URL}/DONKI/FLR?startDate=${startDate}&endDate=${endDate}&api_key=${NASA_API_KEY}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setSpaceWeatherData(data.slice(0, 5));
        setLoadingSpaceWeather(false);
      } catch (error) {
        console.error("Error loading space weather:", error);
        setSpaceWeatherError(error.message);
        setLoadingSpaceWeather(false);
      }
    };
    loadSpaceWeather();
  }, []);

  return (
    <>
      {/* CSS Animations for Enhanced Visual Effects */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.02); }
        }
        @keyframes solarFlare {
          0%, 100% { filter: brightness(1) saturate(1); }
          50% { filter: brightness(1.2) saturate(1.3); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .asteroid-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
        }
        .asteroid-card:hover {
          transform: translateY(-8px) rotateX(5deg);
          filter: brightness(1.1);
        }
        .flare-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
        }
        .flare-card:hover {
          transform: translateY(-6px) rotateY(2deg);
          filter: brightness(1.1);
        }
        .data-bar {
          height: 6px;
          border-radius: 3px;
          background: linear-gradient(90deg, #2DD4BF 0%, #64FFDA 100%);
          transition: width 0.8s ease-out;
        }
      `}</style>

      {/* APOD Section - Real NASA Data */}
      <section
        id="service-0"
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#0B1426',
          padding: '80px 20px 40px 20px'
        }}
      >
        {loadingAPOD ? (
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ 
              fontSize: '2.5rem', 
              color: '#F8FAFC', 
              marginBottom: '30px',
              fontWeight: 'bold'
            }}>
              Astronomy Picture of the Day
            </h2>
            <p style={{ 
              fontSize: '1.2rem', 
              color: '#2DD4BF', 
              marginBottom: '30px' 
            }}>
              Loading today's incredible space image...
            </p>
            <div style={{
              width: '50px',
              height: '50px',
              border: '4px solid rgba(45, 212, 191, 0.3)',
              borderTop: '4px solid #2DD4BF',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto'
            }}></div>
          </div>
        ) : apodError ? (
          <div style={{ textAlign: 'center', maxWidth: '600px' }}>
            <h2 style={{ 
              fontSize: '2.5rem', 
              color: '#F8FAFC', 
              marginBottom: '20px',
              fontWeight: 'bold'
            }}>
              Astronomy Picture of the Day
            </h2>
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '40px',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <p style={{ color: '#F8FAFC', fontSize: '1.2rem', marginBottom: '10px' }}>
                Unable to load today's space image
              </p>
              <p style={{ color: '#9CA3AF', fontSize: '1rem' }}>
                Error: {apodError}
              </p>
              <button
                onClick={() => window.location.reload()}
                style={{
                  marginTop: '20px',
                  padding: '12px 24px',
                  background: '#2DD4BF',
                  color: '#0B1426',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Try Again
              </button>
            </div>
          </div>
        ) : apodData ? (
          <div style={{ maxWidth: '1200px', width: '100%', textAlign: 'center' }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: '#F8FAFC',
              marginBottom: '20px'
            }}>
              Astronomy Picture of the Day
            </h2>
            
            <h3 style={{
              fontSize: '1.8rem',
              color: '#2DD4BF',
              marginBottom: '30px',
              fontWeight: '600'
            }}>
              {apodData.title}
            </h3>

            {apodData.media_type === 'image' ? (
              <div style={{ marginBottom: '30px' }}>
                <img
                  src={apodData.url}
                  alt={apodData.title}
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    borderRadius: '12px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                    border: '2px solid rgba(45, 212, 191, 0.3)'
                  }}
                />
                {apodData.hdurl && (
                  <a
                    href={apodData.hdurl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-block',
                      marginTop: '15px',
                      padding: '8px 16px',
                      background: 'rgba(45, 212, 191, 0.2)',
                      color: '#2DD4BF',
                      textDecoration: 'none',
                      borderRadius: '6px',
                      border: '1px solid rgba(45, 212, 191, 0.5)',
                      fontSize: '0.9rem'
                    }}
                  >
                    View HD Version
                  </a>
                )}
              </div>
            ) : (
              <div style={{
                background: 'rgba(255,255,255,0.1)',
                padding: '40px',
                borderRadius: '12px',
                marginBottom: '30px',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <p style={{ color: '#F8FAFC', fontSize: '1.2rem', marginBottom: '15px' }}>
                  Today's APOD is a video!
                </p>
                <a
                  href={apodData.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block',
                    padding: '12px 24px',
                    background: '#2DD4BF',
                    color: '#0B1426',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    fontWeight: '600'
                  }}
                >
                  Watch Video on NASA
                </a>
              </div>
            )}

            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '30px',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              textAlign: 'left'
            }}>
              <p style={{
                fontSize: '1.1rem',
                color: '#F8FAFC',
                lineHeight: '1.7',
                margin: '0'
              }}>
                {apodData.explanation}
              </p>
            </div>

            <div style={{ 
              marginTop: '25px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '15px'
            }}>
              <p style={{
                color: '#9CA3AF',
                fontSize: '0.95rem',
                margin: 0
              }}>
                📅 {apodData.date} | 🚀 © NASA
              </p>
              {apodData.copyright && (
                <p style={{
                  color: '#2DD4BF',
                  fontSize: '0.9rem',
                  margin: 0
                }}>
                  Photo Credit: {apodData.copyright}
                </p>
              )}
            </div>
          </div>
        ) : null}
      </section>

      {/* Mars Rover Photos Section - WITH OPPORTUNITY HISTORICAL INFORMATION */}
      <section
        id="service-1"
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#1A0B33',
          padding: '80px 20px 40px 20px'
        }}
      >
        <div style={{ maxWidth: '1200px', width: '100%', textAlign: 'center' }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#F8FAFC',
            marginBottom: '20px'
          }}>
            Mars Rover Pictures
          </h2>
          
          <p style={{
            fontSize: '1.2rem',
            color: '#2DD4BF',
            marginBottom: '30px'
          }}>
            Real images from NASA's rovers exploring the Red Planet
          </p>

          {/* Rover Selection Buttons with Status Indicators */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '15px',
            marginBottom: '40px',
            flexWrap: 'wrap'
          }}>
            {['curiosity', 'perseverance', 'opportunity'].map((rover) => (
              <button
                key={rover}
                onClick={() => setSelectedRover(rover)}
                style={{
                  padding: '10px 20px',
                  background: selectedRover === rover ? '#2DD4BF' : 'rgba(255, 255, 255, 0.1)',
                  color: selectedRover === rover ? '#0B1426' : '#F8FAFC',
                  border: '1px solid rgba(45, 212, 191, 0.5)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  textTransform: 'capitalize',
                  transition: 'all 0.3s ease'
                }}
              >
                {rover} {rover === 'opportunity' ? '(Historical)' : '(Active)'}
              </button>
            ))}
          </div>

          {loadingMars ? (
            <div style={{ textAlign: 'center' }}>
              <p style={{ 
                fontSize: '1.2rem', 
                color: '#2DD4BF', 
                marginBottom: '30px' 
              }}>
                Loading {selectedRover} rover photos...
              </p>
              <div style={{
                width: '50px',
                height: '50px',
                border: '4px solid rgba(45, 212, 191, 0.3)',
                borderTop: '4px solid #2DD4BF',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto'
              }}></div>
            </div>
          ) : marsError ? (
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '40px',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <p style={{ color: '#F8FAFC', fontSize: '1.2rem', marginBottom: '10px' }}>
                Unable to load Mars rover photos
              </p>
              <p style={{ color: '#9CA3AF', fontSize: '1rem' }}>
                Error: {marsError}
              </p>
            </div>
          ) : marsPhotos.length > 0 ? (
            <>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px',
                marginBottom: '30px'
              }}>
                {marsPhotos.map((photo, index) => (
                  <div
                    key={photo.id}
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      transition: 'transform 0.3s ease'
                    }}
                  >
                    <img
                      src={photo.img_src}
                      alt={`Mars surface taken by ${photo.rover.name} rover`}
                      style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'cover'
                      }}
                    />
                    <div style={{ padding: '15px' }}>
                      <p style={{
                        color: '#2DD4BF',
                        fontSize: '0.9rem',
                        margin: '0 0 5px 0',
                        fontWeight: '600'
                      }}>
                        {photo.camera.full_name}
                      </p>
                      <p style={{
                        color: '#9CA3AF',
                        fontSize: '0.8rem',
                        margin: 0
                      }}>
                        Sol {photo.sol} | {photo.earth_date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '20px',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                {selectedRover === 'opportunity' ? (
                  <div>
                    <p style={{
                      color: '#F8FAFC',
                      fontSize: '1.1rem',
                      margin: '0 0 15px 0',
                      lineHeight: '1.6',
                      fontWeight: '600'
                    }}>
                      🔴 NASA's Opportunity Rover Mission (2004-2018)
                    </p>
                    <p style={{
                      color: '#F8FAFC',
                      fontSize: '1rem',
                      margin: '0 0 15px 0',
                      lineHeight: '1.6'
                    }}>
                      The Opportunity rover completed its remarkable 15-year mission on Mars in June 2018, after losing contact during a planet-wide dust storm. Originally designed for a 90-day mission, Opportunity exceeded all expectations by operating for over 5,000 Martian days (sols).
                    </p>
                    <div style={{
                      background: 'rgba(45, 212, 191, 0.1)',
                      padding: '15px',
                      borderRadius: '8px',
                      border: '1px solid rgba(45, 212, 191, 0.3)',
                      marginTop: '15px'
                    }}>
                      <p style={{
                        color: '#2DD4BF',
                        fontSize: '0.95rem',
                        margin: 0,
                        lineHeight: '1.5',
                        fontWeight: '600'
                      }}>
                        📊 Mission achievements: 45.16 km traveled • 217,594+ images transmitted • 15 years of operation • Groundbreaking discoveries of ancient water evidence
                      </p>
                    </div>
                    <p style={{
                      color: '#9CA3AF',
                      fontSize: '0.9rem',
                      margin: '15px 0 0 0',
                      fontStyle: 'italic'
                    }}>
                      The images above are from Opportunity's historical archive, showing the Red Planet through its cameras during different phases of the mission.
                    </p>
                  </div>
                ) : (
                  <p style={{
                    color: '#F8FAFC',
                    fontSize: '1rem',
                    margin: 0,
                    lineHeight: '1.6'
                  }}>
                    🔴 These are real photographs taken by NASA's <strong style={{ color: '#2DD4BF', textTransform: 'capitalize' }}>{selectedRover}</strong> rover 
                    on the surface of Mars. Each image shows the actual Martian landscape, rocks, and terrain as captured by the rover's scientific cameras.
                  </p>
                )}
              </div>
            </>
          ) : (
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '40px',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <p style={{ color: '#F8FAFC', fontSize: '1.2rem' }}>
                No photos available for {selectedRover} rover at the moment
              </p>
            </div>
          )}
        </div>
      </section>
      {/* Earth Images Section - Real NASA Satellite Data */}
      <section
        id="service-2"
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#0B1426',
          padding: '80px 20px 40px 20px'
        }}
      >
        <div style={{ maxWidth: '1200px', width: '100%', textAlign: 'center' }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#F8FAFC',
            marginBottom: '20px'
          }}>
            Earth Images from Space
          </h2>
          
          <p style={{
            fontSize: '1.2rem',
            color: '#2DD4BF',
            marginBottom: '30px'
          }}>
            Our home planet as seen from NASA satellites and the International Space Station
          </p>

          {/* Location Selection Buttons */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            marginBottom: '40px',
            flexWrap: 'wrap'
          }}>
            {[
              { key: 'new-york', label: 'New York' },
              { key: 'amazon', label: 'Amazon' },
              { key: 'sahara', label: 'Sahara' },
              { key: 'himalayas', label: 'Himalayas' },
              { key: 'great-wall', label: 'Great Wall' },
              { key: 'antarctica', label: 'Antarctica' }
            ].map((location) => (
              <button
                key={location.key}
                onClick={() => setSelectedLocation(location.key)}
                style={{
                  padding: '8px 16px',
                  background: selectedLocation === location.key ? '#2DD4BF' : 'rgba(255, 255, 255, 0.1)',
                  color: selectedLocation === location.key ? '#0B1426' : '#F8FAFC',
                  border: '1px solid rgba(45, 212, 191, 0.5)',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease'
                }}
              >
                {location.label}
              </button>
            ))}
          </div>

          {loadingEarth ? (
            <div style={{ textAlign: 'center' }}>
              <p style={{ 
                fontSize: '1.2rem', 
                color: '#2DD4BF', 
                marginBottom: '30px' 
              }}>
                Loading satellite images of {selectedLocation.replace('-', ' ')}...
              </p>
              <div style={{
                width: '50px',
                height: '50px',
                border: '4px solid rgba(45, 212, 191, 0.3)',
                borderTop: '4px solid #2DD4BF',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto'
              }}></div>
            </div>
          ) : earthError ? (
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '40px',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <p style={{ color: '#F8FAFC', fontSize: '1.2rem', marginBottom: '10px' }}>
                Unable to load Earth satellite images
              </p>
              <p style={{ color: '#9CA3AF', fontSize: '1rem' }}>
                Error: {earthError}
              </p>
            </div>
          ) : earthImages.length > 0 ? (
            <>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '20px',
                marginBottom: '30px'
              }}>
                {earthImages.map((image, index) => (
                  <div
                    key={image.id}
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      transition: 'transform 0.3s ease'
                    }}
                  >
                    <img
                      src={image.url}
                      alt={`Satellite view of ${image.location}`}
                      style={{
                        width: '100%',
                        height: '250px',
                        objectFit: 'cover'
                      }}
                    />
                    <div style={{ padding: '15px' }}>
                      <p style={{
                        color: '#2DD4BF',
                        fontSize: '1rem',
                        margin: '0 0 5px 0',
                        fontWeight: '600'
                      }}>
                        {image.location}
                      </p>
                      <p style={{
                        color: '#9CA3AF',
                        fontSize: '0.9rem',
                        margin: '0 0 5px 0'
                      }}>
                        📅 {image.date}
                      </p>
                      <p style={{
                        color: '#9CA3AF',
                        fontSize: '0.8rem',
                        margin: 0
                      }}>
                        📍 {image.coordinates}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '20px',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <p style={{
                  color: '#F8FAFC',
                  fontSize: '1rem',
                  margin: 0,
                  lineHeight: '1.6'
                }}>
                  🌍 These satellite images are captured by NASA's Earth observation satellites, showing our planet from space. 
                  Each image provides a unique perspective of Earth's geography, weather patterns, and natural features as seen from orbit.
                </p>
              </div>
            </>
          ) : (
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '40px',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <p style={{ color: '#F8FAFC', fontSize: '1.2rem' }}>
                No satellite images available for this location at the moment
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Asteroid Tracking Section - Real NASA Data with Visual Enhancements */}
      <section
        id="service-3"
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#1A0B33',
          padding: '80px 20px 40px 20px'
        }}
      >
        <div style={{ maxWidth: '1200px', width: '100%', textAlign: 'center' }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#F8FAFC',
            marginBottom: '20px'
          }}>
            🌌 Asteroid Tracking
          </h2>
          
          <p style={{
            fontSize: '1.2rem',
            color: '#2DD4BF',
            marginBottom: '30px'
          }}>
            Near Earth Objects monitored by NASA's planetary defense systems
          </p>

          {loadingAsteroids ? (
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '1.2rem', color: '#2DD4BF', marginBottom: '30px' }}>
                Scanning for approaching asteroids...
              </p>
              <div style={{
                width: '60px', height: '60px', 
                border: '4px solid rgba(45, 212, 191, 0.2)',
                borderTop: '4px solid #2DD4BF', 
                borderRadius: '50%',
                animation: 'spin 1s linear infinite', 
                margin: '0 auto',
                boxShadow: '0 0 20px rgba(45, 212, 191, 0.3)'
              }}></div>
            </div>
          ) : asteroidError ? (
            <div style={{
              background: 'linear-gradient(135deg, rgba(255, 71, 87, 0.1) 0%, rgba(255, 71, 87, 0.05) 100%)',
              padding: '40px', borderRadius: '16px', 
              border: '1px solid rgba(255, 71, 87, 0.3)',
              boxShadow: '0 0 20px rgba(255, 71, 87, 0.2)'
            }}>
              <p style={{ color: '#F8FAFC', fontSize: '1.2rem', marginBottom: '10px' }}>
                ⚠️ Unable to load asteroid tracking data
              </p>
              <p style={{ color: '#ff4757', fontSize: '1rem' }}>
                Error: {asteroidError}
              </p>
            </div>
          ) : asteroidData.length > 0 ? (
            <>
              <div style={{
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '25px', 
                marginBottom: '30px'
              }}>
                {asteroidData.map((asteroid, index) => {
                  const threatStyle = getAsteroidThreatLevel(asteroid);
                  const distance = asteroid.close_approach_data[0]?.miss_distance?.kilometers || 0;
                  const size = asteroid.estimated_diameter?.meters?.estimated_diameter_max || 0;
                  const speed = asteroid.close_approach_data[0]?.relative_velocity?.kilometers_per_hour || 0;
                  
                  return (
                    <div 
                      key={asteroid.id} 
                      className="asteroid-card"
                      style={{
                        background: threatStyle.bgGradient,
                        borderRadius: '16px',
                        padding: '24px', 
                        border: `2px solid ${threatStyle.borderColor}`,
                        boxShadow: `${threatStyle.glow}, 0 8px 32px rgba(0, 0, 0, 0.3)`,
                        animation: threatStyle.animation || 'none',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                    >
                      {/* Threat Level Indicator */}
                      <div style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        padding: '4px 12px',
                        background: threatStyle.color,
                        color: '#fff',
                        borderRadius: '12px',
                        fontSize: '0.7rem',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        {threatStyle.level}
                      </div>

                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '16px'
                      }}>
                        <div style={{
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          background: threatStyle.color,
                          marginRight: '12px',
                          boxShadow: `0 0 10px ${threatStyle.color}`
                        }}></div>
                        <h3 style={{ 
                          color: '#F8FAFC', 
                          fontSize: '1.1rem', 
                          margin: 0,
                          fontWeight: '700'
                        }}>
                          {asteroid.name.replace(/[()]/g, '')}
                        </h3>
                      </div>

                      {/* Distance Visualization */}
                      <div style={{ marginBottom: '16px' }}>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: '8px'
                        }}>
                          <span style={{ color: '#F8FAFC', fontSize: '0.9rem', fontWeight: '600' }}>
                            🌍 Distance from Earth
                          </span>
                          <span style={{ color: threatStyle.color, fontSize: '0.9rem', fontWeight: 'bold' }}>
                            {Math.round(distance).toLocaleString()} km
                          </span>
                        </div>
                        <div style={{
                          width: '100%',
                          height: '8px',
                          background: 'rgba(255, 255, 255, 0.1)',
                          borderRadius: '4px',
                          overflow: 'hidden'
                        }}>
                          <div 
                            className="data-bar"
                            style={{
                              width: `${Math.min((50000000 - distance) / 50000000 * 100, 100)}%`,
                              height: '100%',
                              background: `linear-gradient(90deg, ${threatStyle.color} 0%, rgba(255, 255, 255, 0.8) 100%)`,
                              borderRadius: '4px'
                            }}
                          ></div>
                        </div>
                      </div>

                      {/* Size and Speed Info */}
                      <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: '1fr 1fr', 
                        gap: '12px',
                        marginBottom: '16px'
                      }}>
                        <div style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          padding: '12px',
                          borderRadius: '8px',
                          textAlign: 'center'
                        }}>
                          <div style={{ color: '#2DD4BF', fontSize: '0.8rem', marginBottom: '4px' }}>
                            📏 SIZE
                          </div>
                          <div style={{ color: '#F8FAFC', fontSize: '1rem', fontWeight: 'bold' }}>
                            {Math.round(size)} m
                          </div>
                        </div>
                        <div style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          padding: '12px',
                          borderRadius: '8px',
                          textAlign: 'center'
                        }}>
                          <div style={{ color: '#2DD4BF', fontSize: '0.8rem', marginBottom: '4px' }}>
                            🚀 SPEED
                          </div>
                          <div style={{ color: '#F8FAFC', fontSize: '1rem', fontWeight: 'bold' }}>
                            {Math.round(speed).toLocaleString()} km/h
                          </div>
                        </div>
                      </div>

                      {/* Hazard Warning */}
                      {asteroid.is_potentially_hazardous_asteroid && (
                        <div style={{
                          background: 'rgba(255, 71, 87, 0.2)',
                          border: '1px solid rgba(255, 71, 87, 0.5)',
                          borderRadius: '8px',
                          padding: '12px',
                          textAlign: 'center'
                        }}>
                          <div style={{ 
                            color: '#ff4757', 
                            fontSize: '0.9rem', 
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px'
                          }}>
                            ⚠️ POTENTIALLY HAZARDOUS OBJECT
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div style={{
                background: 'linear-gradient(135deg, rgba(45, 212, 191, 0.1) 0%, rgba(45, 212, 191, 0.05) 100%)',
                padding: '24px',
                borderRadius: '16px', 
                border: '1px solid rgba(45, 212, 191, 0.3)',
                boxShadow: '0 0 20px rgba(45, 212, 191, 0.2)'
              }}>
                <p style={{ 
                  color: '#F8FAFC', 
                  fontSize: '1rem', 
                  margin: 0, 
                  lineHeight: '1.7',
                  textAlign: 'center'
                }}>
                  🛰️ <strong>Real-time asteroid tracking</strong> from NASA's Near Earth Object program. 
                  Each object is continuously monitored for size, trajectory, and potential Earth impact risk. 
                  Color coding indicates proximity and threat level assessment.
                </p>
              </div>
            </>
          ) : (
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '40px',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <p style={{ color: '#F8FAFC', fontSize: '1.2rem' }}>
                🌌 No asteroids detected in today's monitoring window
              </p>
              <p style={{ color: '#9CA3AF', fontSize: '1rem', marginTop: '10px' }}>
                Our planetary defense systems continue scanning for Near Earth Objects
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Space Weather Section - Real NASA Data with Visual Effects */}
      <section
        id="service-4"
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#0B1426',
          padding: '80px 20px 40px 20px'
        }}
      >
        <div style={{ maxWidth: '1200px', width: '100%', textAlign: 'center' }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#F8FAFC',
            marginBottom: '20px'
          }}>
            ☀️ Space Weather Monitor
          </h2>
          
          <p style={{
            fontSize: '1.2rem',
            color: '#2DD4BF',
            marginBottom: '30px'
          }}>
            Solar flare activity and space weather alerts from NASA's monitoring systems
          </p>

          {loadingSpaceWeather ? (
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '1.2rem', color: '#2DD4BF', marginBottom: '30px' }}>
                Monitoring solar activity...
              </p>
              <div style={{
                width: '60px', height: '60px', 
                border: '4px solid rgba(255, 140, 0, 0.2)',
                borderTop: '4px solid #ff8c00', 
                borderRadius: '50%',
                animation: 'spin 1s linear infinite', 
                margin: '0 auto',
                boxShadow: '0 0 25px rgba(255, 140, 0, 0.4)'
              }}></div>
            </div>
          ) : spaceWeatherError ? (
            <div style={{
              background: 'linear-gradient(135deg, rgba(255, 140, 0, 0.1) 0%, rgba(255, 140, 0, 0.05) 100%)',
              padding: '40px',
              borderRadius: '16px', 
              border: '1px solid rgba(255, 140, 0, 0.3)',
              boxShadow: '0 0 20px rgba(255, 140, 0, 0.2)'
            }}>
              <p style={{ color: '#F8FAFC', fontSize: '1.2rem', marginBottom: '10px' }}>
                ☀️ Unable to load space weather data
              </p>
              <p style={{ color: '#ff8c00', fontSize: '1rem' }}>
                Error: {spaceWeatherError}
              </p>
            </div>
          ) : spaceWeatherData.length > 0 ? (
            <>
              <div style={{
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '25px', 
                marginBottom: '30px'
              }}>
                {spaceWeatherData.map((flare, index) => {
                  const intensityStyle = getFlareIntensity(flare);
                  const flareDate = new Date(flare.beginTime);
                  const isRecent = (Date.now() - flareDate.getTime()) < 24 * 60 * 60 * 1000;
                  
                  return (
                    <div 
                      key={index} 
                      className="flare-card"
                      style={{
                        background: intensityStyle.bgGradient,
                        borderRadius: '16px',
                        padding: '24px', 
                        border: `2px solid ${intensityStyle.borderColor}`,
                        boxShadow: `${intensityStyle.glow}, 0 8px 32px rgba(0, 0, 0, 0.3)`,
                        animation: intensityStyle.animation || 'none',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                    >
                      {/* Intensity Indicator */}
                      <div style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        padding: '6px 12px',
                        background: intensityStyle.color,
                        color: '#fff',
                        borderRadius: '12px',
                        fontSize: '0.7rem',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        {flare.classType || 'Unknown'}
                      </div>

                      {/* Recent Activity Badge */}
                      {isRecent && (
                        <div style={{
                          position: 'absolute',
                          top: '16px',
                          left: '16px',
                          padding: '4px 8px',
                          background: '#2DD4BF',
                          color: '#0B1426',
                          borderRadius: '8px',
                          fontSize: '0.6rem',
                          fontWeight: 'bold',
                          textTransform: 'uppercase'
                        }}>
                          NEW
                        </div>
                      )}

                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '20px',
                        marginTop: isRecent ? '20px' : '0'
                      }}>
                        <div style={{
                          width: '16px',
                          height: '16px',
                          borderRadius: '50%',
                          background: `radial-gradient(circle, ${intensityStyle.color} 0%, rgba(255, 140, 0, 0.3) 100%)`,
                          marginRight: '12px',
                          boxShadow: `0 0 15px ${intensityStyle.color}`,
                          animation: intensityStyle.animation || 'none'
                        }}></div>
                        <h3 style={{ 
                          color: '#F8FAFC', 
                          fontSize: '1.2rem', 
                          margin: 0,
                          fontWeight: '700'
                        }}>
                          Solar Flare Event
                        </h3>
                      </div>

                      {/* Flare Details Grid */}
                      <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: '1fr 1fr', 
                        gap: '16px',
                        marginBottom: '20px'
                      }}>
                        <div style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          padding: '12px',
                          borderRadius: '10px',
                          textAlign: 'center'
                        }}>
                          <div style={{ color: '#2DD4BF', fontSize: '0.8rem', marginBottom: '6px' }}>
                            🌞 CLASS
                          </div>
                          <div style={{ 
                            color: intensityStyle.color, 
                            fontSize: '1.2rem', 
                            fontWeight: 'bold' 
                          }}>
                            {flare.classType || 'Unknown'}
                          </div>
                        </div>
                        <div style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          padding: '12px',
                          borderRadius: '10px',
                          textAlign: 'center'
                        }}>
                          <div style={{ color: '#2DD4BF', fontSize: '0.8rem', marginBottom: '6px' }}>
                            📍 SOURCE
                          </div>
                          <div style={{ color: '#F8FAFC', fontSize: '0.9rem', fontWeight: '600' }}>
                            {flare.sourceLocation || 'Solar Surface'}
                          </div>
                        </div>
                      </div>

                      {/* Time Information */}
                      <div style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        padding: '16px',
                        borderRadius: '10px',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                      }}>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: '8px'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '0.8rem' }}>
                            📅 EVENT DATE
                          </span>
                          <span style={{ color: '#F8FAFC', fontSize: '0.9rem', fontWeight: '600' }}>
                            {flareDate.toLocaleDateString()}
                          </span>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '0.8rem' }}>
                            ⏰ TIME (UTC)
                          </span>
                          <span style={{ color: '#F8FAFC', fontSize: '0.9rem', fontWeight: '600' }}>
                            {flareDate.toLocaleTimeString()}
                          </span>
                        </div>
                      </div>

                      {/* Impact Assessment */}
                      <div style={{
                        marginTop: '16px',
                        padding: '12px',
                        background: `linear-gradient(90deg, ${intensityStyle.color}20 0%, transparent 100%)`,
                        borderLeft: `3px solid ${intensityStyle.color}`,
                        borderRadius: '0 8px 8px 0'
                      }}>
                        <div style={{ color: '#F8FAFC', fontSize: '0.8rem', fontWeight: '600' }}>
                          Potential Effects: {
                            intensityStyle.intensity === 'extreme' ? 'Satellite disruption, radio blackouts' :
                            intensityStyle.intensity === 'strong' ? 'GPS accuracy reduced, aurora visible' :
                            intensityStyle.intensity === 'moderate' ? 'Minor communication effects' :
                            'Minimal impact expected'
                          }
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{
                background: 'linear-gradient(135deg, rgba(255, 140, 0, 0.1) 0%, rgba(255, 140, 0, 0.05) 100%)',
                padding: '24px',
                borderRadius: '16px', 
                border: '1px solid rgba(255, 140, 0, 0.3)',
                boxShadow: '0 0 20px rgba(255, 140, 0, 0.2)'
              }}>
                <p style={{ 
                  color: '#F8FAFC', 
                  fontSize: '1rem', 
                  margin: 0, 
                  lineHeight: '1.7',
                  textAlign: 'center'
                }}>
                  ☀️ <strong>Live space weather monitoring</strong> from NASA's Solar Dynamics Observatory. 
                  Solar flares are classified from A (weakest) to X (strongest). Major events can affect 
                  satellite communications, GPS accuracy, and create spectacular aurora displays.
                </p>
              </div>
            </>
          ) : (
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '40px',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <p style={{ color: '#F8FAFC', fontSize: '1.2rem' }}>
                ☀️ No significant solar activity detected in the past week
              </p>
              <p style={{ color: '#9CA3AF', fontSize: '1rem', marginTop: '10px' }}>
                Space weather conditions are currently calm
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

// Footer Component
function Footer() {
  return (
    <footer style={{
      padding: '48px 16px',
      textAlign: 'center',
      background: 'rgba(255, 255, 255, 0.05)',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto',
        flexWrap: 'wrap',
        gap: '24px'
      }}>
        <div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '0 0 16px 0' }}>
            Vinland Design
          </h3>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#2DD4BF', textDecoration: 'none' }}>Instagram</a>
            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#2DD4BF', textDecoration: 'none' }}>LinkedIn</a>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '32px' }}>
          <a href="/" style={{ color: '#F8FAFC', textDecoration: 'none' }}>Home</a>
          <a href="/about" style={{ color: '#F8FAFC', textDecoration: 'none' }}>About</a>
        </div>
      </div>
      
      <p style={{ marginTop: '32px', color: '#9CA3AF' }}>
        Built by Vineet M
      </p>
    </footer>
  );
}
