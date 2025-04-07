import express from 'express';
import { getTrendingRepositories } from '../services/githubService.js';
import Repository from '../models/repository.js';

const router = express.Router();

// Получить все репозитории
router.get('/repositories', async (req, res) => {
  try {
    const repositories = await Repository.findAll();
    res.json(repositories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching repositories' });
  }
});

// Получить репозиторий по ID
router.get('/repositories/:id', async (req, res) => {
  try {
    const repository = await Repository.findByPk(req.params.id);
    if (repository) {
      res.json(repository);
    } else {
      res.status(404).json({ message: 'Repository not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching repository' });
  }
});

// Синхронизация с GitHub
router.post('/sync', async (req, res) => {
  try {
    const trendingRepos = await getTrendingRepositories();
    for (const repo of trendingRepos) {
      await Repository.upsert({
        id: repo.id,
        name: repo.name,
        stars: repo.stargazers_count,
        url: repo.html_url,
      });
    }
    res.status(200).json({ message: 'Sync completed' });
  } catch (error) {
    res.status(500).json({ message: 'Error syncing with GitHub' });
  }
});

export default router;
