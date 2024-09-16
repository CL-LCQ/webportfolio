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