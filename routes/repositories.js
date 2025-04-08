import express from 'express';
import { syncWithGitHub, stopSync, startSync } from '../services/syncService.js';
import Repository from '../models/repository.js';
import { Op } from 'sequelize';

const router = express.Router();

router.get('/repositories', async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const repositories = await Repository.findAll({
      limit: Number(limit),
      offset: Number(offset),
    });

    const totalRepositories = await Repository.count();
    const totalPages = Math.ceil(totalRepositories / limit);

    res.json({
      repositories,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching repositories' });
  }
});

router.get('/repository', async (req, res) => {
  const { name, githubId } = req.query;

  if (!name && !githubId) {
    return res.status(400).json({ message: 'Either "name" or "githubId" must be provided' });
  }

  try {
    let repository;

    if (name) {
      repository = await Repository.findOne({
        where: {
          name: {
            [Op.iLike]: name 
          }
        }
      });
    } else if (githubId) {
      repository = await Repository.findOne({ where: { githubId } });
    }

    if (repository) {
      res.json(repository);
    } else {
      res.status(404).json({ message: 'Repository not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching repository' });
  }
});

let syncInterval = 3600000;
let lastSyncTime = null;

router.post('/sync', async (req, res) => {
  try {
    await syncWithGitHub();  
    stopSync();              
    startSync();             

    lastSyncTime = new Date(); 
    res.status(200).json({
      message: 'Sync completed and timer reset',
      nextSyncTime: new Date(lastSyncTime.getTime() + syncInterval)
    });
  } catch (error) {
    res.status(500).json({ message: 'Error syncing with GitHub' });
  }
});

router.post('/setSyncInterval', (req, res) => {
  const { interval } = req.body;
  if (!interval || isNaN(interval)) {
    return res.status(400).json({ message: 'Invalid interval' });
  }

  syncInterval = interval;
  res.status(200).json({
    message: 'Sync interval updated successfully',
    nextSyncTime: new Date(lastSyncTime.getTime() + syncInterval)
  });
});

export default router;
