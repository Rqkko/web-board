import express from "express";
import cors from "cors";
import { config } from "./config";
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';
import { setupSwagger } from "./swagger";
const path = require('path');

const app = express();
app.use(cors());

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// Handle requests by serving index.html for all routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// Routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

// Setup Swagger
setupSwagger(app);

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
    if (config.nodeEnv === "development") {
        console.log(`For Dev: http://localhost:${config.port}/api-docs`);
    }
});
