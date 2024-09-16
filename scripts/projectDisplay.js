import { updateImage, createDots } from './imageSlider.js';  // Import slider functions


let currentIndex = 0; // Track the current project index
let projects = []; // Store the fetched projects
let currentImageIndex = 0; // To track the current image in the transition
let imageInterval; // To store the interval ID for clearing later
let startX = 0; // To track the starting X position of the swipe
let isDragging = false; // To track if the user is actively dragging
let currentProjectImages = []; // Store images of the current project

let autoChangeInterval;  // Variable to store the interval

export async function displayProjectTitles(data) {
  const titlesList = document.getElementById('project-titles-list');
  titlesList.innerHTML = '';  // Clear any existing titles

  // Sort the projects array by project.order (ascending)
  projects = data
    .filter(project => project.enabled)  // Filter only enabled projects
    .sort((a, b) => a.order - b.order);

  projects.forEach((project, index) => {
    const li = document.createElement('li');
    
    // Structure: "Number: Project Title" with clickable title
    li.innerHTML = `
      <span>${index + 1}. </span>
      <a href="#" class="project-title-link" data-index="${index}">${project.selection_title}</a>
    `;
    
    // Add event listener to the project title link
    li.querySelector('a').addEventListener('click', (e) => {
      e.preventDefault();
      displayProject(index);  // Display the project on click
    });

    titlesList.appendChild(li);
  });
}


export async function displayProject(index) {
 const project = projects[index];

 if (!project.enabled) {
    return;
  }


  // Update the image
  // const projectImage = document.getElementById('project-image');
  // const mainDescription = document.getElementById('selected-project-description');
  // Update the info overlay with the project details
  const overlayTitle = document.getElementById('overlay-title');
  const categoryWhat = document.getElementById('category-what');
  const categoryWhy = document.getElementById('category-why');
  const categoryRole = document.getElementById('category-role');
  const overlayDate = document.getElementById('overlay-date');
  const overlayBox = document.querySelector('.info-overlay');  // Get the overlay box
  const overlayCompanyName = document.getElementById('overlay-companyname');  // New for company name
  const overlayIndustry = document.getElementById('overlay-industry');  // New for industry

  // Set the image and project description (with fallback if undefined)
  // projectImage.src = project.imageURL || '';  // Set image or fallback to empty
  overlayTitle.textContent = project.title || 'No Title';  // Set the title or fallback
  overlayDate.textContent = project.projectdate || 'No Date';  // Set the project date or fallback
  overlayCompanyName.textContent = project.company || 'No description available.';
  overlayIndustry.textContent = project.industry || 'No description available.';
  categoryWhat.textContent = project.what || 'No description available for What.';
  categoryWhy.textContent = project.why || 'No description available for Why.';
  categoryRole.textContent = project.role || 'No description available for Role.';




  // Prepare the images for the selected project (main image, url2, url3 if they exist)
  currentProjectImages = [project.imageURL];  // Reset the current project's images
  if (project.url2) currentProjectImages.push(project.url2);
  if (project.url3) currentProjectImages.push(project.url3);

  if (project.imageURL) {
    updateMedia(project.imageURL);
  }

  
  // Set the initial image for the selected project
  currentImageIndex = 0;
  updateImage(currentProjectImages, currentImageIndex);  // Display the first image for the current project

  // Create dots for the images of the selected project
  createDots(currentProjectImages);


// Remove 'selected' class from all list items
  document.querySelectorAll('.project-list ul li').forEach(li => {
    li.classList.remove('selected');
  });

  // Add 'selected' class to the clicked project
  document.querySelector(`.project-list ul li:nth-child(${index + 1})`).classList.add('selected');

 // Trigger the slide-in animation by resetting the 'active' class
  overlayBox.classList.remove('active');  // Remove the active class to reset animation
  void overlayBox.offsetWidth;  // Force reflow to restart the animation
  overlayBox.classList.add('active');  // Add the class to trigger the animation again

}

// Function to update the media (image or video) based on the project URL
export function updateMedia(url) {
  const projectVideoContainer = document.getElementById('project-video-container');
  projectVideoContainer.innerHTML = ''; // Clear any existing content

  // Check if it's a YouTube link
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const youtubeId = extractYouTubeId(url); // Extract YouTube ID
    if (youtubeId) {
      const iframeElement = document.createElement('iframe');
      iframeElement.width = '100%';
      iframeElement.height = '100%';
      iframeElement.src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&loop=1&mute=1&controls=0&modestbranding=1&rel=0&iv_load_policy=3&showinfo=0&fs=0&disablekb=1`; 
      // YouTube embed link without controls, no suggestions, no annotations, no fullscreen, and keyboard control disabled.
      iframeElement.setAttribute('allowfullscreen', 'true');
      iframeElement.setAttribute('frameborder', '0');
      iframeElement.setAttribute('allow', 'autoplay; encrypted-media;');
      projectVideoContainer.appendChild(iframeElement);
    }
  } else if (url.endsWith('.mp4') || url.endsWith('.webm')) {
    // If it's a video file
    const videoElement = document.createElement('video');
    videoElement.setAttribute('autoplay', 'true');
    videoElement.setAttribute('loop', 'true');
    videoElement.setAttribute('muted', 'true'); // Optional: Mute the video
    videoElement.setAttribute('controls', 'true'); // Optional: Show video controls
    videoElement.style.width = '100%';
    videoElement.style.height = '100%';
    videoElement.src = url; // Set the video source URL
    projectVideoContainer.appendChild(videoElement);
  } else {
    // If it's an image
    const imageElement = document.createElement('img');
    imageElement.src = url;
    imageElement.style.width = '100%';
    imageElement.style.height = '100%';
    imageElement.style.objectFit = 'cover'; // Maintain aspect ratio and cover the container
    projectVideoContainer.appendChild(imageElement);
  }
}

// Function to extract YouTube video ID from a URL
function extractYouTubeId(url) {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/[^\/]+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}