export function addOverlayToggleListener() {
  const overlayToggle = document.getElementById('overlay-toggle');
  const overlay = document.getElementById('info-overlay');

  if (overlayToggle && overlay) {
    overlayToggle.addEventListener('click', () => {
      overlay.classList.toggle('transparent');
    });
  } else {
    console.error('Element(s) not found: overlay-toggle or info-overlay');
  }
}