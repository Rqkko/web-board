import dotenv from "dotenv";

dotenv.config();

export const config = {
    supabaseUrl: process.env.SUPABASE_URL || "",
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY || "",
    port: process.env.PORT || "3001",
    nodeEnv: process.env.NODE_ENV || "",
    hostName: process.env.RAILWAY_PUBLIC_DOMAIN || process.env.HOSTNAME || 'localhost',
    protocol: process.env.NODE_ENV === 'development' ? 'http' : 'https',
};
