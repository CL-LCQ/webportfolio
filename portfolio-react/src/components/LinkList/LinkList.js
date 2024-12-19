import React from 'react';
import './LinkList.css';
import PropTypes from 'prop-types';

const DisplayLinks = ({ props }) => {

  const links = props?? '';  

  if (!links) {
    console.error("links is undefined or null.");
    return null;
  }

  if (Array.isArray(links)) {
    return (
      <span className="link-container">
        {links.map((linkItem, index) => (
          <React.Fragment key={index}>
            <a href={linkItem.link} target="_blank" rel="noopener noreferrer">
              {linkItem.title}
            </a>
            {index < links.length - 1 && ', '}
          </React.Fragment>
        ))}
      </span>
    );
  }

  if (typeof links === 'string') {
    return <span className="link-container">{links}</span>;
  }

  console.error("Invalid data format for links. Expected an array or string, but received:", links);
  return null;
};

DisplayLinks.defaultProps = {
  links: 'empty'
};

DisplayLinks.propTypes = {
  links: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        link: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      })
    ),
    PropTypes.string
  ])
};

export default DisplayLinks;