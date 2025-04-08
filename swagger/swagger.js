import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

/**
 * @param {express.Application} app
 */
export const setupSwagger = (app) => {
  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'GitHub Repositories API',
        version: '1.0.0',
        description: 'GitHub Repositories API',
      },
    },
    apis: ['./routes/*.js', './swagger/*.js'],
  };

  const swaggerSpec = swaggerJsdoc(options);

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
