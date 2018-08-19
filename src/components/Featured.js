import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const Featured = ({ featured, toggleFeatured, gameId }) => {
  return (
    <a
      className={classnames("ui right corner label", {
        yellow: featured === true
      })}
    onClick={() => toggleFeatured(gameId)}>
      <i
        className={classnames("star icon", {
          full: featured === false
        })}
      />
    </a>
  );
};

Featured.propTypes = {
  featured: PropTypes.bool.isRequired,
  toggleFeatured: PropTypes.func.isRequired,
  gameId : PropTypes.string.isRequired
};

export default Featured;
