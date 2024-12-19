// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gbsbrwhpkrxteolebfrc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdic2Jyd2hwa3J4dGVvbGViZnJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU2MTgyODMsImV4cCI6MjA0MTE5NDI4M30.qwbSBVVkqBDqlGt759YFdLbrHz_9UrHxmqXM5XfYU0U';


// Create the Supabase client only once
const supabaseClient = createClient(supabaseUrl, supabaseKey);

// Export the single instance to be used throughout the app
export { supabaseClient };


export const getImageUrl = async (path) => {
  const { data, error } = await supabaseClient
    .storage
    .from('Portfolio')  // Replace with your actual bucket name
    .getPublicUrl(path);

  if (error) {
    console.error('Error fetching image URL:', error);
    return '';
  }

  console.log('Image URL:', data.publicUrl); // Log the fetched URL
  return data.publicUrl;
};
