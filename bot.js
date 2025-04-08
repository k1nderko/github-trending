import inquirer from 'inquirer';
import axios from 'axios';

const syncRepositories = async () => {
  try {
    const response = await axios.post('http://localhost:3000/api/sync');
    console.log(response.data.message);
  } catch (error) {
    console.error('Error syncing repositories:', error.message);
  }
};

const viewRepositories = async (page = 1) => {
  try {
    const response = await axios.get('http://localhost:3000/api/repositories', {
      params: { page, limit: 5 },
    });
    const { repositories, totalPages } = response.data;

    console.log(`Page ${page} of ${totalPages}`);
    console.log('Repositories:');
    repositories.forEach((repo) => {
      console.log({
        githubId: repo.githubId,
        name: repo.name,
        stars: repo.stars,
        url: repo.url,
        description: repo.description,
        createdAt: repo.createdAt,
        updatedAt: repo.updatedAt,
      });
    });

    if (page < totalPages) {
      const { nextPage } = await inquirer.prompt({
        type: 'confirm',
        name: 'nextPage',
        message: 'Do you want to see the next page?',
        default: false,
      });

      if (nextPage) {
        await viewRepositories(page + 1);
      }
    } else {
      console.log('No more pages.');
    }
  } catch (error) {
    console.error('Error fetching repositories:', error.message);
  }
};


const searchRepository = async () => {
  const { searchBy } = await inquirer.prompt({
    type: 'list',
    name: 'searchBy',
    message: 'Search by',
    choices: ['Name', 'GitHub ID'],
  });

  let query;
  if (searchBy === 'Name') {
    const { name } = await inquirer.prompt({
      type: 'input',
      name: 'name',
      message: 'Enter repository name:',
    });
    query = `name=${name}`;
  } else if (searchBy === 'GitHub ID') {
    const { githubId } = await inquirer.prompt({
      type: 'input',
      name: 'githubId',
      message: 'Enter GitHub ID:',
    });
    query = `githubId=${githubId}`;
  }

  try {
    const response = await axios.get(`http://localhost:3000/api/repository?${query}`);
    console.log('Repository found:', response.data);
  } catch (error) {
    console.error('Error searching repository:', error.message);
  }
};

const setSyncInterval = async () => {
  const { intervalInMinutes } = await inquirer.prompt({
    type: 'input',
    name: 'intervalInMinutes',
    message: 'Enter the sync interval in minutes:',
    validate: (value) => {
      const isValid = !isNaN(value) && value > 0;
      return isValid || 'Please enter a valid positive number';
    },
  });

  const intervalInMilliseconds = Number(intervalInMinutes) * 60 * 1000;

  try {
    const response = await axios.post('http://localhost:3000/api/setSyncInterval', {
      interval: intervalInMilliseconds,
    });
    console.log(response.data.message);
  } catch (error) {
    console.error('Error setting sync interval:', error.message);
  }
};

const startBot = async () => {
  const { action } = await inquirer.prompt({
    type: 'list',
    name: 'action',
    message: 'What do you want to do?',
    choices: ['Sync Repositories', 'View Repositories', 'Search Repository', 'Set Sync Interval', 'Exit'],
  });

  if (action === 'Sync Repositories') {
    await syncRepositories();
  } else if (action === 'View Repositories') {
    await viewRepositories();
  } else if (action === 'Search Repository') {
    await searchRepository();
  } else if (action === 'Set Sync Interval') {
    await setSyncInterval();  
  } else {
    console.log('Exiting...');
    process.exit();
  }

  startBot();
};

startBot();
