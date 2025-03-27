import dotenv from "dotenv";
import os from 'os';

dotenv.config();

export const config = {
    supabaseUrl: process.env.SUPABASE_URL || "",
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY || "",
    port: process.env.PORT || "",
    nodeEnv: process.env.NODE_ENV || "",
    // hostName: process.env.HOST_NAME || os.hostname(),
    hostName: process.env.RAILWAY_PUBLIC_DOMAIN || process.env.HOSTNAME || 'localhost',
    // hostName: process.env.NODE_ENV === 'development' ? 'localhost' : os.hostname(),
    protocol: process.env.NODE_ENV === 'development' ? 'http' : 'https',
    
};
