
import { createClient } from '@supabase/supabase-js';

// Use the hardcoded Supabase URL and key from the integration
const SUPABASE_URL = "https://gbsbrwhpkrxteolebfrc.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdic2Jyd2hwa3J4dGVvbGViZnJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU2MTgyODMsImV4cCI6MjA0MTE5NDI4M30.qwbSBVVkqBDqlGt759YFdLbrHz_9UrHxmqXM5XfYU0U";

// Create and export the client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
