import { getEnvVariables } from 'env';

type ResultArr = [{ long_name: string; short_name: string; types: [string] }];

type GeoResult = {
  results: [
    {
      address_components: Array<ResultArr>;
      formatted_address: string;
      geometry: {
        location: { lat: number; lng: number };
        location_type: string;
        viewport: {
          northeast: {
            lat: number;
            lng: number;
          };
          southwest: {
            lat: number;
            lng: number;
          };
        };
        place_id: string;
        plus_code: {
          compound_code: string;
          global_code: string;
        };
      };
      types: [string];
    }
  ];
  status: string;
};

type GeoLocation = { lat: number; lng: number };

export const getLatLng = (
  address: string,
  country: string = 'CA'
): Promise<GeoLocation> => {
  const apiKey: string = getEnvVariables().firebaseConfig.apiKey;
  const transformedAddress: string = address.split(' ').join('+');
  const url = `https://maps.googleapis.com/maps/api/geocode/json?key=${apiKey}&address=${transformedAddress}&components=country:${country}`;
  return new Promise(async (resolve, reject) => {
    try {
      const data: Response = await fetch(url);
      const result: GeoResult = await data.json();
      if (result.status !== 'OK') throw new Error('Returned empty result');
      resolve(result.results[0].geometry.location);
    } catch (error) {
      reject(error);
    }
  });
};
