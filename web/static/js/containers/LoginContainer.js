import { connect } from 'react-redux';
import { login } from '../actions/session';
import Login from '../components/Login';

const mapStateToProps = (state) => {
    return {
        error: state.session.error,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        submit: (email, password, rememberMe) => {
            dispatch(login(email, password, rememberMe));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);