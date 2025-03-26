import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";
import { config } from "./config";

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(config.supabaseUrl, config.supabaseAnonKey);

app.get("/", (req, res) => {
    res.send("Backend is running with TypeScript!");
});

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
    console.log(`For Dev: http://localhost:${config.port}`);
});
