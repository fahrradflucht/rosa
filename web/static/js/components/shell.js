import React, { PropTypes } from 'react';
import Sidenav from './Sidenav';

const Shell = ({toggled, children, onNavbarTogglerClick, onLogoutButtonClick}) => (
    <div id="shell-wrapper" className={ toggled ? 'toggled' : '' }>
        <Sidenav  {...{onLogoutButtonClick}} />
        <button className="navbar-toggler" type="button" onClick={onNavbarTogglerClick}>
            &#9776;
        </button>
        <div id="shell-content-wrapper">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        { children }
                    </div>
                </div>
            </div>
        </div>
    </div>
);


Shell.propTypes = {
    onLogoutButtonClick: PropTypes.func.isRequired,
    onNavbarTogglerClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    toggled: PropTypes.bool.isRequired
};

export default Shell;