import { updateMedia} from './projectDisplay.js';  // Import slider functions
// import { detectSwipe } from './detectSwipe.js';


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

dotsContainer.style.display ='none';



  // Set the first dot as active
  updateDots(0);


   // Trigger the animation for the dot container
  dotsContainer.classList.remove('active');  // Reset the animation
  void dotsContainer.offsetWidth;  // Force reflow to restart the animation
  dotsContainer.classList.add('active');  // Add the class to trigger the animation
  
   // Add an event listener to capture keydown events
  document.addEventListener('keydown', handleKeydown);



// startAutoChange(images)


// const nextButton = document.getElementById('next-button');
// nextButton.classList.remove('active');  // Reset the animation
// void nextButton.offsetWidth;  // Force reflow to restart the animation
// dotsContainer.classList.add('active');  // Add the class to trigger the animation

// nextButton.addEventListener('click', () => {
//   // goToNextImage(imageStore); // Calls the function that moves to the next image
//   console.log('tapped next')
//     const event = new KeyboardEvent('keydown', {
//     key: 'ArrowRight',
//     keyCode: 39, // keyCode for the right arrow
//     code: 'ArrowRight',
//     which: 39,
//     bubbles: true // Allow the event to bubble up through the DOM
//     });
//   // Dispatch the event on the document or a specific element
//   // document.dispatchEvent(event);
//     handleKeydown(event)
// });
 

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


  updateMedia(images[index]);
  updateDots(index);  // Update the active dot

  // detectSwipe();
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

  let startingIndex = currentImageIndex; // Save the index of the current image
  
  // Set up an interval to go to the next image every 300ms
  autoChangeInterval = setInterval(() => {
    goToNextImage(images); // Go to the next image

    // Check if the carousel has looped back to the first image
    if (currentImageIndex === startingIndex) {
      clearInterval(autoChangeInterval); // Stop the interval when it's back to the first image
    }
  }, 300); // Change every 300ms
}


// Function to handle left and right keyboard arrow presses
function handleKeydown(event) {
   
  if (event.key === 'ArrowRight' || event == 'ArrowRight') {
    goToNextImage(imageStore);
        // console.log('swipe right');
  } else if (event.key === 'ArrowLeft'|| event == 'ArrowLeft') {
    goToPreviousImage(imageStore);
    // console.log('swipe left');
  }
  else if (event.key === 'ArrowUp' || event.key === 'ArrowDown'){
    handleProjectListNavigation(event);
  }
  updateImage(imageStore,currentImageIndex);  // Update the image and dots after a change
}

let startX = 0; // Starting X position of the swipe
let isDragging = false; // Track if the user is dragging
// Function to handle swipe and drag events

//SWIPE





export function detectSwipe(element) {
  // If listeners already exist, remove them first
  if (element.swipeListenersAdded) {
    element.removeEventListener('touchstart', element.handleTouchStart);
    element.removeEventListener('touchend', element.handleTouchEnd);
    element.removeEventListener('mousedown', element.handleMouseDown);
    element.removeEventListener('mouseup', element.handleMouseUp);
    element.removeEventListener('mouseleave', element.handleMouseLeave);
    element.removeEventListener('mousemove', element.handleMouseMove);
    element.removeEventListener('touchmove', element.handleTouchMove);
  }

  let touchStartX = 0;
  let touchEndX = 0;
  let isDragging = false;

  // Swipe detection logic
  function handleSwipe() {
    const swipeDistance = touchStartX - touchEndX;
    if (swipeDistance > 50) {
      handleKeydown('ArrowRight');
    } else if (swipeDistance < -50) {
       handleKeydown('ArrowLeft');
    }
  }

  // Define event handler functions and attach them to the element
  element.handleTouchStart = (event) => {
    touchStartX = event.changedTouches[0].screenX;
    isDragging = true;
  };

  element.handleTouchEnd = (event) => {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
    isDragging = false;
  };

  element.handleMouseDown = (event) => {
    touchStartX = event.clientX;
    isDragging = true;
    event.preventDefault(); // Prevent image selection while dragging
  };

  element.handleMouseUp = (event) => {
    touchEndX = event.clientX;
    handleSwipe();
    isDragging = false;
  };

  element.handleMouseMove = (event) => {
    if (!isDragging) return;
    touchEndX = event.clientX;
    event.preventDefault(); // Prevent selection during drag
  };

  element.handleMouseLeave = () => {
    isDragging = false;
  };

  element.handleTouchMove = (event) => {
    event.preventDefault(); // Prevent scrolling or selection
  };

  // Add event listeners
  element.addEventListener('touchstart', element.handleTouchStart);
  element.addEventListener('touchend', element.handleTouchEnd);
  element.addEventListener('mousedown', element.handleMouseDown);
  element.addEventListener('mouseup', element.handleMouseUp);
  element.addEventListener('mousemove', element.handleMouseMove);
  element.addEventListener('mouseleave', element.handleMouseLeave);
  element.addEventListener('touchmove', element.handleTouchMove);

  // Disable image selection
  element.style.userSelect = 'none';

  // Mark that listeners have been added
  element.swipeListenersAdded = true;
}

// Function to detect the currently selected project's index
function getSelectedProjectIndex() {
  const projectItems = document.querySelectorAll('.project-list ul li');  // Select all project list items
  let selectedIndex = -1;  // Default to -1 if no project is selected

  // Loop through all project list items and find the one with the 'selected' class
  projectItems.forEach((item, index) => {
    if (item.classList.contains('selected')) {
      selectedIndex = index;  // Set the index of the selected project
    }
  });

  return selectedIndex;  // Return the index of the selected project
}

// Function to handle project list navigation with arrow keys
function handleProjectListNavigation(event) {
  const projectLinks = document.querySelectorAll('.project-title-link'); // Select all project links
  let currentSelectedIndex = getSelectedProjectIndex();

  // console.log('selected project is ' + currentSelectedIndex);

    // Listen for keydown events to detect arrow key presses

    if (event.key === 'ArrowUp') {
      // Navigate to the previous project
      if (currentSelectedIndex > 0) {
        setSelectedProject(currentSelectedIndex - 1);
      }
    } else if (event.key === 'ArrowDown') {
      // Navigate to the next project
      if (currentSelectedIndex < projectLinks.length - 1) {
        setSelectedProject(currentSelectedIndex + 1);
      }
    }
  

  // Helper function to set the selected project
  function setSelectedProject(index) {
    // Remove 'selected' class from all links
    projectLinks.forEach(link => link.parentElement.classList.remove('selected'));

    // Ensure the index is within bounds
    if (index >= 0 && index < projectLinks.length) {
      // Add 'selected' class to the current project
      projectLinks[index].parentElement.classList.add('selected');
      currentSelectedIndex = index;

      // console.log('now setting ' + currentSelectedIndex);
      // Simulate clicking the project to load it
      projectLinks[index].click();
    }
  }

  // Initially select the first project
  // setSelectedProject(currentSelectedIndex);


}
