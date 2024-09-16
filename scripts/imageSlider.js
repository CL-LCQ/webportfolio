let currentImageIndex = 0;
let autoChangeInterval = null;
let imagesForProject = 0;
let imageInterval;
let imageStore = []


// Function to create and display dots for image navigation
export function createDots(images) {

  imageStore = images;

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
  
   // Add an event listener to capture keydown events
  document.addEventListener('keydown', handleKeydown);
  // handleSwipe(images);

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

 function goToPreviousImage(images){
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;  // Decrement the index, loop back if necessary
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

//interaction


// Function to handle left and right keyboard arrow presses
function handleKeydown(event) {
  if (event.key === 'ArrowRight') {
    goToNextImage(imageStore);
  } else if (event.key === 'ArrowLeft') {
    goToPreviousImage(imageStore);
  }
  updateImage(imageStore,currentImageIndex);  // Update the image and dots after a change
}

let startX = 0; // Starting X position of the swipe
let isDragging = false; // Track if the user is dragging
// Function to handle swipe and drag events
function handleSwipe(images) {
  const projectImage = document.getElementById('project-image');

  // Event listener for touch start (mobile devices)
  projectImage.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX; // Record the starting X position
    isDragging = true;
  });

  // Event listener for touch move (mobile devices) - passive
  projectImage.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    
    const touchX = e.touches[0].clientX;
    const diff = touchX - startX; // Calculate the difference between start and current touch position

    if (diff < -50) { // Swipe left (next image)
      goToNextImage(images);
      isDragging = false;
    } else if (diff > 50) { // Swipe right (previous image)
      goToPreviousImage(images);
      isDragging = false;
    }
  }, { passive: true }); // Mark the event as passive

  // Event listener for touch end (mobile devices)
  projectImage.addEventListener('touchend', () => {
    isDragging = false;
  });

  // Event listeners for mouse drag (desktop devices)
  projectImage.addEventListener('mousedown', (e) => {
    e.preventDefault();  // Prevent image dragging
    startX = e.clientX; // Record the starting X position for mouse drag
    isDragging = true;
  });

  projectImage.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    const mouseX = e.clientX;
    const diff = mouseX - startX; // Calculate the difference between start and current mouse position

    if (diff < -50) { // Drag left (next image)
      goToNextImage(images);
      isDragging = false;
    } else if (diff > 50) { // Drag right (previous image)
      goToPreviousImage(images);
      isDragging = false;
    }
  });

  // Event listener for mouse up (desktop devices)
  projectImage.addEventListener('mouseup', (e) => {
    isDragging = false; // Stop the dragging behavior
  });

  // Event listener to stop dragging if the mouse leaves the image area
  projectImage.addEventListener('mouseleave', () => {
    isDragging = false; // Ensure dragging stops when the mouse leaves the image
  });
}



