import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const SidenavLink = ({ to, children, ...elementProps }) => (
  <li {...elementProps}>
    <Link to={to}>{children}</Link>
  </li>
);

SidenavLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default SidenavLink;
