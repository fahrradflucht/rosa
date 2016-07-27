import React, { PropTypes } from 'react';
import { Button, Col, Glyphicon, Grid, Row } from 'react-bootstrap';
import Sidenav from './Sidenav';

const Shell = ({toggled, children, onNavbarTogglerClick, onLogoutButtonClick}) => (
    <div id="shell-wrapper" className={ toggled ? 'toggled' : '' }>
        <Sidenav  {...{onLogoutButtonClick}} />
        <Button className="btn-default navbar-toggler" type="button" onClick={onNavbarTogglerClick}>
            <Glyphicon glyph="menu-hamburger" />
        </Button>
        <div id="shell-content-wrapper">
            <Grid fluid={true}>
                <Row>
                    <Col lg={12}>
                        { children }
                    </Col>
                </Row>
            </Grid>
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