import { loadSupabaseClient, initializeSupabase } from './supabaseClient.js';
import { displayProjectTitles, displayProject } from './projectDisplay.js';
import { addOverlayToggleListener } from './domEvents.js';

import { preloadImages } from './preloadImages.js';


document.addEventListener('DOMContentLoaded', () => {
  loadSupabaseClient()
    .then(supabase => {
      initializeSupabase(supabase, (data) => {
        loadSite(data)
      });
    })
    .catch(error => console.error("Error loading Supabase script:", error));

  addOverlayToggleListener();
});

async function loadSite(projects){
  document.getElementById('content').style.display = 'block';
  await preloadAllImages(projects);  // Preload all images first

  showRightColumnContent();

  displayProjectTitles(projects);
  displayProject(0);  // Display the first project

}

// Preload all project images
async function preloadAllImages(projects) {
  const imageUrls = [];

  projects.forEach(project => {
    if (project.imageURL) imageUrls.push(project.imageURL);
    if (project.url2) imageUrls.push(project.url2);
    if (project.url3) imageUrls.push(project.url3);
  });

  // Preload all images in parallel
  await preloadImages(imageUrls);
}

// Function to display the project content
function showRightColumnContent() {
  document.getElementById('right-column-loading').style.display = 'none';  // Hide the loading screen
  document.getElementById('right-column-content').style.display = 'block';  // Show the content
}