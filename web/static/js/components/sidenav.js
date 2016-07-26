import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Sidenav = ({ onLogoutButtonClick }) => (
    <div id="sidenav-wrapper">
        <ul className="sidenav-nav">
            <li className="sidenav-brand">
                <a href="#">Rosa CMS</a>
            </li>
            <li>
                <Link to="/admin/users">Users</Link>
            </li>
            <li id="logout">
                <button className="btn btn-danger-outline" onClick={ onLogoutButtonClick }>
                    Logout
                </button>
            </li>
        </ul>
    </div>
);

Sidenav.propTypes = {
    onLogoutButtonClick: PropTypes.func.isRequired
}

export default Sidenav;
