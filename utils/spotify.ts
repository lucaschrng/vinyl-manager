import axios, { AxiosResponse } from 'axios';
import dayjs from 'dayjs';
import SearchResponse = SpotifyApi.SearchResponse;
import AlbumObjectFull = SpotifyApi.AlbumObjectFull;

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

const getToken = async () => {
  try {
    const token = localStorage.getItem('token');
    const tokenExpiryDate = localStorage.getItem('tokenExpiryDate');

    if (token && tokenExpiryDate) {
      const isExpired = dayjs().isAfter(dayjs(tokenExpiryDate));

      if (!isExpired) {
        return token;
      }
    }

    const { data }: AxiosResponse<TokenResponse> = await axios.post(
      'http://localhost:3000/api/token',
    );

    localStorage.setItem('token', data.access_token);
    localStorage.setItem(
      'tokenExpiryDate',
      dayjs().add(data.expires_in, 'second').toString(),
    );

    return data.access_token;
  } catch (error) {
    console.error(error);
  }
};

const search = async (query: string) => {
  try {
    const token = await getToken();
    const { data }: AxiosResponse<SearchResponse> = await axios.get(
      `https://api.spotify.com/v1/search?q=${query}&type=album`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return data.albums?.items;
  } catch (error) {
    console.error(error);
  }
};

const getAlbum = async (id: string) => {
  try {
    const token = await getToken();
    const { data }: AxiosResponse<AlbumObjectFull> = await axios.get(
      `https://api.spotify.com/v1/albums/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return data;
  } catch (error) {
    console.error(error);
  }
};

const spotify = {
  search,
  getAlbum,
};

export default spotify;
