import axios from 'axios';

const getTrendingRepositories = async () => {
  const url = 'https://api.github.com/search/repositories';
  const params = {
    q: 'stars:>=10000',
    sort: 'stars',
    order: 'desc',
    per_page: 10,
  };
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
      params,
    });
    return response.data.items;
  } catch (error) {
    console.error('Error fetching trending repositories:', error.response?.data || error.message);
    throw error;
  }
};

export { getTrendingRepositories };
