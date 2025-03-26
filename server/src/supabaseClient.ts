import { createClient } from '@supabase/supabase-js';
import { config } from './config';

const supabase = createClient(config.supabaseUrl, config.supabaseAnonKey);

export default supabase;