import { createClient } from '@supabase/supabase-js';
import { config } from './config';

export const createSupabaseClient = (accessToken?: string) => {
  return createClient(config.supabaseUrl, config.supabaseAnonKey, {
    global: {
      headers: accessToken
        ? { Authorization: `Bearer ${accessToken}` }
        : {},
    },
  });
};

const supabase = createClient(config.supabaseUrl, config.supabaseAnonKey);

export default supabase;