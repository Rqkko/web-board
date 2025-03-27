import dotenv from "dotenv";
import os from 'os';

dotenv.config();

export const config = {
    supabaseUrl: process.env.SUPABASE_URL || "",
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY || "",
    port: process.env.PORT || 3001,
    nodeEnv: process.env.NODE_ENV || "",
    hostName: process.env.HOST_NAME || os.hostname(),
};
