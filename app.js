// Function to dynamically load the Supabase client script from the CDN
function loadSupabaseClient() {
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


let currentIndex = 0; // Track the current project index
let projects = []; // Store the fetched projects
let currentImageIndex = 0; // To track the current image in the transition
let imageInterval; // To store the interval ID for clearing later
let startX = 0; // To track the starting X position of the swipe
let isDragging = false; // To track if the user is actively dragging
let currentProjectImages = []; // Store images of the current project

let autoChangeInterval;  // Variable to store the interval


// Function to initialize Supabase and fetch data
async function initializeSupabase(supabase) {
  const supabaseUrl = 'https://gbsbrwhpkrxteolebfrc.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdic2Jyd2hwa3J4dGVvbGViZnJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU2MTgyODMsImV4cCI6MjA0MTE5NDI4M30.qwbSBVVkqBDqlGt759YFdLbrHz_9UrHxmqXM5XfYU0U';

  // Initialize Supabase client
  const client = supabase.createClient(supabaseUrl, supabaseKey);
  console.log("Supabase initialized:", client);

  // Fetch data from the 'images' table
  try {
    const { data, error } = await client
      .from('work')  // Replace 'images' with your actual table name
      .select('*');

    if (error) {
      console.error("Error fetching data:", error);
    } else {

 
      console.log("Fetched data:", data);
      projects = data;  // Store the projects

      document.getElementById('loading-screen').style.display = 'none';
      document.getElementById('content').style.display = 'block';

      displayProjectTitles();
      displayProject(currentIndex);  // Display the first project

    }
  } catch (err) {
    console.error("Unexpected error fetching data:", err);
  }
}



// Function to display the list of project titles
function displayProjectTitles() {
  const titlesList = document.getElementById('project-titles-list');
  titlesList.innerHTML = '';  // Clear any existing titles

  // Sort the projects array by project.order (ascending)
  projects = projects
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



// Function to create and display dots for image navigation
function createDots(images) {
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
      updateImage(images);  // Update the image manually
    });

    dotsContainer.appendChild(dot);
  });

  // Set the first dot as active
  updateDots();
   // Trigger the animation for the dot container
  dotsContainer.classList.remove('active');  // Reset the animation
  void dotsContainer.offsetWidth;  // Force reflow to restart the animation
  dotsContainer.classList.add('active');  // Add the class to trigger the animation
}

// Function to update the active dot
function updateDots() {
  const dots = document.querySelectorAll('.dot');
  dots.forEach(dot => dot.classList.remove('active'));  // Remove active class from all dots
  if (dots[currentImageIndex]) {
    dots[currentImageIndex].classList.add('active');  // Set the current image's dot as active
  }
}

// Function to update the active dot
function updateDots() {
  const dots = document.querySelectorAll('.dot');
  dots.forEach(dot => dot.classList.remove('active'));  // Remove active class from all dots
  if (dots[currentImageIndex]) {
    dots[currentImageIndex].classList.add('active');  // Set the current image's dot as active
  }
}
// Function to update the image
function updateImage(images) {
  const projectImage = document.getElementById('project-image');
  projectImage.src = images[currentImageIndex];  // Set the current image source
   updateDots();  // Update the active dot
}

// Function to go to the next image
function goToNextImage(images) {
  currentImageIndex = (currentImageIndex + 1) % images.length; // Increment the index, loop back if necessary
  updateImage(images);
}

// Function to start auto-changing the images and dots
function startAutoChange(images) {
  // Clear any existing interval
  if (autoChangeInterval) {
    clearInterval(autoChangeInterval);
  }

  // Set up an interval to change the image every 3 seconds
  autoChangeInterval = setInterval(() => {
    goToNextImage(images);  // Automatically move to the next image and dot
  }, 3000);  // Change every 3 seconds
}


// Function to display a project based on the current index
function displayProject(index) {
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
  updateImage(currentProjectImages);  // Display the first image for the current project

  // Create dots for the images of the selected project
  createDots(currentProjectImages);

  // // If multiple images are available, start the transition every 3 seconds
  // if (currentProjectImages.length > 1) {
  //   imageInterval = setInterval(() => {
  //     goToNextImage(currentProjectImages);  // Automatically move to the next image
  //   }, 3000); // Change image every 3 seconds
  // }



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

// Load the Supabase client, then initialize and fetch data
document.addEventListener('DOMContentLoaded', () => {
  loadSupabaseClient()
    .then((supabase) => {
      initializeSupabase(supabase);
    })
    .catch(error => console.error("Error loading Supabase script:", error));
});


document.addEventListener('DOMContentLoaded', function() {
  const overlayToggle = document.getElementById('overlay-toggle');
  const overlay = document.getElementById('info-overlay');

  // console.log(overlayToggle);  // Check if overlayToggle is found
  // console.log(overlay);  // Check if overlay is found

 if (overlayToggle && overlay) {
    overlayToggle.addEventListener('click', function() {
      // console.log('Toggle button clicked');  // Log when button is clicked

      overlay.classList.toggle('transparent');  // Toggle the 'transparent' class

      // Log the current classList of the overlay to see if the class is being toggled
      // console.log('Current classList:', overlay.classList);
    });
  } else {
    console.error('Element(s) not found: overlay-toggle or info-overlay');
  }
});