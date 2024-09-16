export function preloadImages(imageUrls) {
  const promises = imageUrls.map(url => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = resolve;  // Resolve the promise when the image loads
      img.onerror = reject;  // Reject the promise on error
    });
  });

  return Promise.all(promises);  // Return a promise that resolves when all images are loaded
}