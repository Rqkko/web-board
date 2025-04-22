import express from "express";
import cors from "cors";
import { config } from "./config";
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';
import replyRoutes from "../routes/replyRoutes";
import { setupSwagger } from "./swagger";
import path from "path";
import cookieParser from 'cookie-parser';

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
app.use("/api/replies", replyRoutes);

// Setup Swagger
if (config.nodeEnv === "development") {
    console.log("Setting up Swagger...");
    setupSwagger(app);
}

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
