import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import { config } from "./config";

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'OrcaBoard API',
      version: '1.0.0',
      description: 'API documentation for OrcaBoard',
    },
    servers: [{ url: `http://localhost:${config.port}` }],
  },
  apis: ['./src/routes/*.ts'], // Read all route files
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
