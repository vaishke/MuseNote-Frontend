import React from 'react';
import PropTypes from 'prop-types'
import logoImage from '../assets/logo.png';

const Logo = ({ alt = 'Company Logo', style, className }) => {
  return (
    <img
      src={logoImage}
      alt={alt}
      style={style}
      className={className}
    />
  );
};

Logo.propTypes = {
    alt: PropTypes.string,
    style: PropTypes.object,
    className: PropTypes.string,
};

export default Logo;
