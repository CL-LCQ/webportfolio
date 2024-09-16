export function preloadImages(imageUrls) {
  const promises = imageUrls.map(url => {
    return new Promise((resolve, reject) => {
      console.log(url);

      // If the URL is a YouTube link, resolve immediately (no need to preload)
      if (url.includes('youtube.com') || url.includes('youtu.be')) {
        console.log("YouTube URL detected, skipping preload.");
        resolve();  // Immediately resolve the promise for YouTube URLs
      } else {
        // For image URLs, create an Image object and preload
        const img = new Image();
        img.src = url;
        img.onload = resolve;  // Resolve the promise when the image loads
        img.onerror = reject;  // Reject the promise on error
      }
    });
  });

  return Promise.all(promises);  // Return a promise that resolves when all images are loaded
}