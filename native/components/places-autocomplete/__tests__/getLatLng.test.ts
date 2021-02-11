import { getLatLng } from '..';
import fetchMock from 'jest-fetch-mock';

describe('getGeocode', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  const results = [{ geometry: { location: { lat: 1, lng: 2 } } }];

  it('returns geolocation', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ results, status: 'OK' }));
    const geoLocation = await getLatLng('Main Street Winnipeg');
    expect(geoLocation).toEqual({ lat: 1, lng: 2 });
  });

  it('returns error message on wrong input', async () => {
    fetchMock.mockReject(new Error('Returned empty result'));
    await expect(getLatLng('', 'djdjdjjd')).rejects.toEqual(
      new Error('Returned empty result')
    );
  });
});
