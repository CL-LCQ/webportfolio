let currentImageIndex = 0;
let autoChangeInterval = null;
let imagesForProject = 0;
let imageInterval;


// Function to create and display dots for image navigation
export function createDots(images) {

const dotsContainer = document.getElementById('dots-container');
  dotsContainer.innerHTML = ''; // Clear existing dots

  // Hide the dots container if there's only one image
  if (images.length <= 1) {
    dotsContainer.style.display = 'none';
    return;
  }

  // Show the dots container if there are multiple images
  dotsContainer.style.display = 'flex';

  // Create a dot for each image
  images.forEach((image, index) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    dot.setAttribute('data-index', index);

    // Add click event listener to each dot
    dot.addEventListener('click', () => {
      clearInterval(imageInterval);  // Stop auto-switching when user clicks a dot
      currentImageIndex = index;  // Set the image to the clicked dot
      updateImage(images, currentImageIndex);  // Update the image manually
    });

    dotsContainer.appendChild(dot);
  });

  // Set the first dot as active
  updateDots(0);
   // Trigger the animation for the dot container
  dotsContainer.classList.remove('active');  // Reset the animation
  void dotsContainer.offsetWidth;  // Force reflow to restart the animation
  dotsContainer.classList.add('active');  // Add the class to trigger the animation
  
 
}

// Function to update the active dot
export function updateDots(index) {
   const dots = document.querySelectorAll('.dot');
  dots.forEach(dot => dot.classList.remove('active'));  // Remove active class from all dots
  if (dots[index]) {
    dots[index].classList.add('active');  // Set the current image's dot as active
  }
}


// Function to update the image
export function updateImage(images, index) {
  const projectImage = document.getElementById('project-image');
  projectImage.src = images[index];  // Set the current image source
   updateDots(index);  // Update the active dot
}

// Function to go to the next image
function goToNextImage(images) {
   currentImageIndex = (currentImageIndex + 1) % images.length; // Increment the index, loop back if necessary
  updateImage(images, currentImageIndex);
 }


export function startAutoChange(images) {
 // Clear any existing interval
  if (autoChangeInterval) {
    clearInterval(autoChangeInterval);
  }

  // Set up an interval to change the image every 3 seconds
  autoChangeInterval = setInterval(() => {
    goToNextImage(images);  // Automatically move to the next image and dot
  }, 3000);  // Change every 3 seconds
}