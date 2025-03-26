import dotenv from "dotenv";

dotenv.config();

export const config = {
    supabaseUrl: process.env.SUPABASE_URL || "",
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY || "",
    port: process.env.PORT || 3001,
    nodeEnv: process.env.NODE_ENV || "",
};
