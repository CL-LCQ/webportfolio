export function addOverlayToggleListener() {
  const overlayToggle = document.getElementById('overlay-toggle');
  const overlay = document.getElementById('info-overlay');

  if (overlayToggle && overlay) {
    overlayToggle.addEventListener('click', () => {
      overlay.classList.toggle('minimized');
      // overlay.classList.toggle('overlay-collapsed'); // Add or remove class based on current state

    });
  } else {
    console.error('Element(s) not found: overlay-toggle or info-overlay');
  }
}

// Function to check window height and toggle the overlay
export function checkWindowSize() {

  const overlay = document.getElementById('info-overlay');

   if (overlay) {
    console.log('size is ' + window.innerHeight)
    if (window.innerHeight < 670) {
      overlay.classList.add('minimized');
    }else{
      overlay.classList.remove('minimized');
    }
  }
}