import { detectSwipe, updateImage, createDots } from './imageSlider.js';  // Import slider functions


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
   <svg width="16" height="16" fill="#007aff" xmlns="http://www.w3.org/2000/svg">
    <g>
  <rect height="16.9629" opacity="0" width="11.6895" x="0" y="0"/>
  <path d="M11.6895 8.47656C11.6895 8.23242 11.5918 8.00781 11.4062 7.83203L3.67188 0.253906C3.49609 0.0878906 3.28125 0 3.02734 0C2.5293 0 2.13867 0.380859 2.13867 0.888672C2.13867 1.13281 2.23633 1.35742 2.39258 1.52344L9.50195 8.47656L2.39258 15.4297C2.23633 15.5957 2.13867 15.8105 2.13867 16.0645C2.13867 16.5723 2.5293 16.9531 3.02734 16.9531C3.28125 16.9531 3.49609 16.8652 3.67188 16.6895L11.4062 9.12109C11.5918 8.93555 11.6895 8.7207 11.6895 8.47656Z" fill="#007aff"/>
 </g>
</svg>
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

  const container = document.querySelector('.right-column-content');


  const overlayTitle = document.getElementById('overlay-title');
  const categoryWhat = document.getElementById('category-what');
  const categoryWhy = document.getElementById('category-why');
  const categoryRole = document.getElementById('category-role');
  const categoryTech = document.getElementById('category-tech');
  const overlayDate = document.getElementById('overlay-date');
  const overlayBox = document.querySelector('.info-overlay');  // Get the overlay box
  const overlayLink= document.querySelector('.link-overlay');  // Get the overlay box
  const overlayContainer = document.querySelector('.overlay-container');  // Get the overlay box
  const overlayCompanyName = document.getElementById('overlay-companyname');  // New for company name
  const overlayIndustry = document.getElementById('overlay-industry');  // New for industry


  const buttonLink = document.getElementById('dynamic-link');  
  const buttonName = document.getElementById('dynamic-text');  
  const pressLinkContainer = document.getElementById('press-link-container');
  const linkButtonsContainer = document.getElementById('link-buttons-container');

    linkButtonsContainer.innerHTML = '';
    pressLinkContainer.innerHTML = '';

  // Set the image and project description (with fallback if undefined)
  // projectImage.src = project.imageURL || '';  // Set image or fallback to empty
  overlayTitle.textContent = project.title || 'No Title';  // Set the title or fallback
  overlayDate.textContent = project.projectdate || 'No Date';  // Set the project date or fallback
  overlayCompanyName.textContent = project.company || 'No description available.';
  overlayIndustry.textContent = project.industry || 'No description available.';
  categoryWhat.textContent = project.what || 'No description available for What.';
  categoryWhy.textContent = project.why || 'No description available for Why.';
  categoryRole.textContent = project.role || 'No description available for Role.';
  categoryTech.textContent = project.tech || 'No description provided';
  // buttonLink.href = project.link|| 'No description provided';;
  // buttonName.textContent = project.linkname || 'No description provided';;

const relatedLinks = project.link;
const pressLinks = project.press;
// Call displayLinksInline to display the links
displayLinksInline(pressLinks, pressLinkContainer);
displayLinksInline(relatedLinks,  linkButtonsContainer);
  //check for all the links
  // createButtons(linksFromDB)

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


  if(container){
    console.log(container.scrollHeight); // Access scrollHeight
    container.scrollTop = container.scrollHeight;
    } 
  else {
      console.error("Element not found: #project");
  }



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

  overlayLink.classList.remove('active');  // Remove the active class to reset animation
  void overlayLink.offsetWidth;  // Force reflow to restart the animation
  overlayLink.classList.add('active');  // Add the class to trigger the animation again


  ///SCROLL directly to bottom and up

  // container.scrollTo({ top: 0, behavior: 'smooth' });
  smoothScrollToTop(container, 700);
  // detectSwipe(document.getElementById('project-video-container'));
  detectSwipe(document.getElementById('project-video-container'));
}

// Function to format and display the links
function displayLinksInline(linkData, container) {
    const linksContent = container;

    // Check if linkData exists and is an array
    if (Array.isArray(linkData)) {
        // Create an array of anchor (<a>) elements as strings
        const linksArray = linkData.map(linkItem => {
            return `<a href="${linkItem.link}" target="_blank">${linkItem.title}</a>`;
        });

        // Join the array with commas and display it
        linksContent.innerHTML = linksArray.join(', ');
    } else {
        console.error("Invalid data format for pressLinks");
    }
}

function smoothScrollToTop(container, duration) {
    const start = container.scrollTop;
    const change = -start;
    const startTime = performance.now();

    function animateScroll(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // Ease-in-out effect
        container.scrollTop = start + change * (0.5 - 0.5 * Math.cos(Math.PI * progress));
        
        if (progress < 1) {
            requestAnimationFrame(animateScroll);
        }
    }

    requestAnimationFrame(animateScroll);
}



// Function to update the media (image or video) based on the project URL
export function updateMedia(url) {
  const projectVideoContainer = document.getElementById('project-video-container');
  projectVideoContainer.classList.remove('loaded'); //blur content
  console.log('updating media...');

  // Check if it's a YouTube link
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
      console.log('this is a youtube video link...');
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
       console.log('clearing...');
      projectVideoContainer.innerHTML = ''; // Clear any existing content
       console.log('appending...');
      projectVideoContainer.appendChild(iframeElement);
    }
  } else if (url.endsWith('.mp4') || url.endsWith('.webm')) {
       console.log('mp4 video... '+url);
    const videoElement = document.createElement('video');
    videoElement.setAttribute('autoplay', 'true');
    videoElement.setAttribute('loop', 'true');
    videoElement.setAttribute('muted', 'true'); // Optional: Mute the video
    videoElement.setAttribute('controls', 'true'); // Optional: Show video controls
    videoElement.style.width = '100%';
    videoElement.style.height = '100%';
    videoElement.muted = true;
    videoElement.controls = false;
    videoElement.src = url; // Set the video source URL
     console.log('clearing...');
    projectVideoContainer.innerHTML = ''; // Clear any existing content
     console.log('appending...');
    projectVideoContainer.appendChild(videoElement);
   
  } else {
    // If it's an image
       console.log('this is an image...'+url);
    const imageElement = document.createElement('img');
    imageElement.src = url;
    imageElement.style.width = '100%';
    imageElement.style.height = '70%';
    imageElement.style.objectFit = 'cover'; // Maintain aspect ratio and cover the container
       console.log('clearing...');
    projectVideoContainer.innerHTML = ''; // Clear any existing content
       console.log('appending...');
    projectVideoContainer.appendChild(imageElement);
  }


   console.log('finished, updating status to loaded...');
 projectVideoContainer.classList.add('loaded');  // Remove the blur once loaded


}

// Function to extract YouTube video ID from a URL
function extractYouTubeId(url) {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/[^\/]+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}