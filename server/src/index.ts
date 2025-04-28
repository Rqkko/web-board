import express from "express";
import cors from "cors";
import { config } from "./config";
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';
import replyRoutes from "./routes/replyRoutes";
import roomRoutes from "./routes/roomRoutes";
import { setupSwagger } from "./swagger";
import path from "path";
import cookieParser from 'cookie-parser';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();
if (config.nodeEnv === "development") {
    app.use(cors({
        origin: "http://localhost:3000",
        credentials: true
    }));
}
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use("/api/reply", replyRoutes);
app.use("/api/room", roomRoutes);

// Setup Swagger
if (config.nodeEnv === "development") {
    console.log("Setting up Swagger...");
    setupSwagger(app);
}

// Set up Swagger UI
const swaggerSpec = swaggerJsdoc({
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Orca Board API',
        version: '1.0.0',
      },
    },
    apis: ['./routes/*.ts'], // Ensure this points to your route files
  });
  
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  

// Serve React frontend for non-API routes (if not in development)
if (config.nodeEnv !== "development") {
    const clientBuildPath = path.join(__dirname, '../../client/build');
    app.use(express.static(clientBuildPath)); // Serve static files from React build directory
    
    app.get('/*', (req, res) => {
        res.sendFile(path.join(clientBuildPath, 'index.html')); // Serve React's index.html for all other routes
    });
}

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
    if (config.nodeEnv === "development") {
        console.log(`For Dev: http://localhost:${config.port}/api/docs`);
    }
});


// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(500).json({ error: 'Something went wrong!' });
  });
  
  export default app;
