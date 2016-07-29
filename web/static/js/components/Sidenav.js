import React, { PropTypes } from 'react';
import { Button } from 'react-bootstrap';
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

const Sidenav = ({ onLogoutButtonClick }) => (
  <div id="sidenav-wrapper">
    <ul className="sidenav-nav">
      <SidenavLink to="/admin" className="sidenav-brand">
        Rosa CMS
      </SidenavLink>
      <SidenavLink to="/admin/users">
        Users
      </SidenavLink>
      <Button id="logout" className="btn-danger" onClick={onLogoutButtonClick}>
        Logout
      </Button>
    </ul>
  </div>
);

Sidenav.propTypes = {
  onLogoutButtonClick: PropTypes.func.isRequired,
};

export default Sidenav;
