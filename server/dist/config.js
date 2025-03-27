"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    supabaseUrl: process.env.SUPABASE_URL || "",
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY || "",
    port: process.env.PORT || "3001",
    nodeEnv: process.env.NODE_ENV || "",
    hostName: process.env.RAILWAY_PUBLIC_DOMAIN || process.env.HOSTNAME || 'localhost',
    protocol: process.env.NODE_ENV === 'development' ? 'http' : 'https',
};
