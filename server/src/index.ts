import express from "express";
import cors from "cors";
import { config } from "./config";
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';
import { setupSwagger } from "./swagger";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

// Setup Swagger
setupSwagger(app);

// Serve React frontend for non-API routes
const clientBuildPath = path.join(__dirname, '../../client/build');
app.use(express.static(clientBuildPath)); // Serve static files from React build directory

app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html')); // Serve React's index.html for all other routes
});

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
    if (config.nodeEnv === "development") {
        console.log(`For Dev: http://localhost:${config.port}/api-docs`);
    }
});
