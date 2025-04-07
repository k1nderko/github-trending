import axios from 'axios';

const getTrendingRepositories = async () => {
  const url = 'https://api.github.com/search/repositories';
  const params = {
    q: 'stars:>=10000', // Пример фильтрации по количеству звезд
    sort: 'stars',
    order: 'desc',
    per_page: 5, // Количество репозиториев для загрузки
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
    console.error('Error fetching trending repositories:', error);
    throw error;
  }
};

export { getTrendingRepositories };
