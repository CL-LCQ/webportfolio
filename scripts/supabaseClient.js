// Function to dynamically load the Supabase client script from the CDN
export function loadSupabaseClient() {
 return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js";
    script.onload = () => {
      resolve(window.supabase); // Resolve with the Supabase object
    };
    script.onerror = reject;  // Reject the Promise if loading fails
    document.head.appendChild(script);
  });
}

// Function to initialize Supabase and fetch data
export async function initializeSupabase(supabase, callback) {
const supabaseUrl = 'https://gbsbrwhpkrxteolebfrc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdic2Jyd2hwa3J4dGVvbGViZnJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU2MTgyODMsImV4cCI6MjA0MTE5NDI4M30.qwbSBVVkqBDqlGt759YFdLbrHz_9UrHxmqXM5XfYU0U';

  // Initialize Supabase client
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);
  try {
    const { data, error } = await supabaseClient.from('work').select('*');
    if (error) {
      console.error("Error fetching data:", error);
    } else {
      callback(data); // Pass data to the callback function
    }
  } catch (err) {
    console.error("Unexpected error fetching data:", err);
  }
}