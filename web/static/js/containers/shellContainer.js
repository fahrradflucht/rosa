import { connect } from 'react-redux';
import { toggleSidenav } from '../actions/shell';
import Shell from '../components/Shell';

const mapStateToProps = (state) => {
    return {
        toggled: state.shell.toggled
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onNavbarTogglerClick: () => {
            dispatch(toggleSidenav())
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Shell);