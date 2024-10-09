// utils/locationUtils.ts

export const getStaticMapImage = (latitude: number, longitude: number): string => {
  const baseUrl = 'https://maps.googleapis.com/maps/api/staticmap';
  const params = new URLSearchParams({
    center: `${latitude},${longitude}`,
    zoom: '14',
    size: '400x200',
    maptype: 'roadmap',
    markers: `color:red|${latitude},${longitude}`,
    key: `${process.env.GOOGLE_API_KEY}`
  });

  return `${baseUrl}?${params.toString()}`;
};

export const getLocationName = async (latitude: number, longitude: number): Promise<string> => {
  const baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json';
  const params = new URLSearchParams({
    latlng: `${latitude},${longitude}`,
    key: `${process.env.GOOGLE_API_KEY}`
  });

  try {
    const response = await fetch(`${baseUrl}?${params.toString()}`);
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return data.results[0].formatted_address;
    } else {
      return 'Location not found';
    }
  } catch (error) {
    console.error('Error fetching location name:', error);
    return 'Error fetching location';
  }
};