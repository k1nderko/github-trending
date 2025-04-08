import { getTrendingRepositories } from './githubService.js';
import Repository from '../models/repository.js';

let syncInterval;

const startSync = () => {
  syncInterval = setInterval(async () => {
    console.log('Running automatic sync with GitHub...');
    await syncWithGitHub();
  }, 600000);
};

const stopSync = () => {
  if (syncInterval) {
    clearInterval(syncInterval);
  }
};

const syncWithGitHub = async () => {
  try {
    const trendingRepos = await getTrendingRepositories();
    for (const repo of trendingRepos) {
      await Repository.upsert({
        githubId: repo.id,
        name: repo.name,
        stars: repo.stargazers_count,
        url: repo.html_url,
        description: repo.description,
      });
    }
    console.log('Sync completed');
  } catch (error) {
    console.error('Error syncing with GitHub:', error);
  }
};

export { startSync, stopSync, syncWithGitHub };
