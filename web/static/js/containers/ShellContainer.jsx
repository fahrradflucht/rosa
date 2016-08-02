import { connect } from 'react-redux';
import toggleSidenav from '../actions/shell';
import { logout } from '../actions/session';
import Shell from '../components/Shell';

const mapStateToProps = (state) => ({
  toggled: state.shell.toggled,
});

const mapDispatchToProps = (dispatch) => ({
  onNavbarTogglerClick: () => {
    dispatch(toggleSidenav());
  },
  onLogoutButtonClick: () => {
    dispatch(logout());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Shell);
