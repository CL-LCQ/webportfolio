export function addOverlayToggleListener() {
  document.addEventListener('DOMContentLoaded', function() {
  const overlayToggle = document.getElementById('overlay-toggle');
  const overlay = document.getElementById('info-overlay');

  if (overlayToggle && overlay) {
    overlayToggle.addEventListener('click', function() {
      overlay.classList.toggle('transparent'); // Toggle the transparency
    });
  } else {
    console.error('Overlay toggle or info-overlay not found');
  }
});
  document.addEventListener('DOMContentLoaded', function() {
    const overlayToggle = document.getElementById('overlay-toggle');
    const overlay = document.querySelector('.info-overlay');

    if (overlayToggle && overlay) {
      overlayToggle.addEventListener('click', function() {
        overlay.classList.toggle('transparent');
      });
    } else {
      console.error('Overlay or toggle button not found.');
    }
  });


}