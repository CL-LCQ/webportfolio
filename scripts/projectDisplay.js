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
  const projectImage = document.getElementById('project-image');
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
  projectImage.src = project.imageURL || '';  // Set image or fallback to empty
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