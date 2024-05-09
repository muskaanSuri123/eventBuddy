
import axios from 'axios';
import base64 from 'base-64';
import qs from 'qs';

const getSpotifyAccessToken = async () => {
    const tokenUrl = 'https://accounts.spotify.com/api/token';
    const clientId = '3f5863d081994289a057b38e4eced05c';
    const clientSecret = '8d9ffa45f61b40c78c5dad71d3eb5e68';

    const message = `${clientId}:${clientSecret}`;
    const messageBase64 = base64.encode(message);
    const data = {
      grant_type: 'client_credentials',
    };
    const tokenHeader = {
      Authorization: `Basic ${messageBase64}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    const response = await axios.post(tokenUrl, qs.stringify(data), { headers: tokenHeader });
    return response.data.access_token;
  };

  export default getSpotifyAccessToken