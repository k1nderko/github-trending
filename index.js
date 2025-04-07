import express from 'express';
import dotenv from 'dotenv';
import repositoryRoutes from './routes/repositories.js';
import sequelize from './config/database.js';

dotenv.config();
const app = express();
app.use(express.json());

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
