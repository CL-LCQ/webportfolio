import React, { useEffect, useState } from 'react';
import './MediaDisplay.css';

const DisplayMedia = ({ url }) => {
  const [mediaType, setMediaType] = useState(''); // video, image, or youtube
  const [youtubeId, setYoutubeId] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false); // Used to know when media is fully loaded

  useEffect(() => {
    if (!url) {
      console.error("URL is missing.");
      return;
    }

    // Determine the type of media to render
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      setMediaType('youtube');
      setYoutubeId(extractYouTubeId(url));
    } else if (url.endsWith('.mp4') || url.endsWith('.webm')) {
      setMediaType('video');
    } else {
      setMediaType('image');
    }

    // Reset loading state whenever the URL changes
    setIsLoaded(false);
  }, [url]);

  const handleMediaLoad = () => {
    setIsLoaded(true);
  };

  const renderMedia = () => {
    switch (mediaType) {
      case 'youtube':
        return (
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&loop=1&mute=1&controls=0&modestbranding=1&rel=0&iv_load_policy=3&showinfo=0&fs=0&disablekb=1`}
            allowFullScreen
            frameBorder="0"
            allow="autoplay; encrypted-media;"
            onLoad={handleMediaLoad}
          />
        );

      case 'video':
        return (
          <video
            src={url}
            autoPlay
            loop
            muted
            controls
            className="video-element"
            onLoadedMetadata={handleMediaLoad}
          />
        );

      case 'image':
        return (
          <img 
            src={url} 
            alt="media content" 
            className="image-element" 
            onLoad={handleMediaLoad} 
          />
        );

      default:
        return null;
    }
  };

  return (
    <div 
      className={`media-container ${isLoaded ? 'loaded' : 'loading'}`}
    >
      {renderMedia()}
    </div>
  );
};

// Function to extract YouTube video ID from a URL
function extractYouTubeId(url) {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/[^\/]+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export default DisplayMedia;
