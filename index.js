import express from 'express';
import { setupSwagger } from './swagger/swagger.js';
import cors from 'cors';
import dotenv from 'dotenv';
import repositoryRoutes from './routes/repositories.js';
import sequelize from './config/database.js';
import { startSync } from './services/syncService.js';

dotenv.config();

const app = express();
app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true
}));
app.use(express.json());
setupSwagger(app);

app.use('/api', repositoryRoutes);

sequelize.sync({ force: false })
  .then(() => {
    console.log('Database connected');
    app.listen(3000, () => {
      console.log('Server running on port 3000');
    });
  })
  .catch((err) => {
    console.error('Error connecting to database:', err);
  });

  startSync();