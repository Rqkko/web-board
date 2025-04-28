import dotenv from "dotenv";

dotenv.config();

export const config = {
    supabaseUrl: process.env.SUPABASE_URL || "",
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY || "",
    port: process.env.PORT || "3001",
    nodeEnv: process.env.NODE_ENV || "",
    sessionKey: process.env.SESSION_KEY || "default_session_key",
};

export default {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
  };