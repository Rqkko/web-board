import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";
import { config } from "./config";
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';
import { setupSwagger } from "./swagger";

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(config.supabaseUrl, config.supabaseAnonKey);

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
