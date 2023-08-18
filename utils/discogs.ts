import axios from 'axios';

const search = async (query: string) => {
  const { data } = await axios.post(
    'http://localhost:3000/api/discogs/search',
    { query },
  );

  return data.results;
};

const getRelease = async (releaseId: string) => {
  const { data } = await axios.get(
    `http://localhost:3000/api/discogs/releases/${releaseId}`,
  );

  return data;
};

const generateTitleWithFeatures = (
  title: string,
  artists: { name: string; role: string }[] = [],
) => {
  const featuring = artists
    ? artists
        ?.filter((artist: { role: string }) => artist.role === 'Featuring')
        ?.map((artist: { name: string }) => artist.name)
    : null;

  if (featuring && featuring.length) {
    if (featuring.length === 1) {
      title += ` (feat. ${featuring[0]})`;
    } else {
      const last = featuring.pop();
      title += ` (feat. ${featuring.join(', ')} & ${last})`;
    }
  }

  return title;
};

const discogs = {
  search,
  getRelease,
  generateTitleWithFeatures,
};

export default discogs;
