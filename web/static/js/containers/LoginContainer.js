import React from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/session';

class Login extends React.Component {
    handleSubmit() {
        const email = this.refs['email'].value;
        const password = this.refs['password'].value;
        this.props.dispatch(login(email,password));
    }

    render() {
        const { session } = this.props;
        return (
            <div className="container">
                <div className="row row-xs-center">
                <div className="jumbotron col-lg-6 col-lg-offset-3 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1">
                    <div className="container">
                    <h1 className="text-xs-center display-3">Login to Rosa</h1>
                    <hr/>
                    { session.error?(
                        <div className="alert alert-danger" role="alert">
                            <strong>Oh bummer!</strong> { session.error }
                        </div>
                    ):null}
                    <form onSubmit={e => {
                        e.preventDefault();
                        this.handleSubmit();
                    }}>
                        <div className="form-group">
                        <label htmlFor="inputEmail" className="sr-only">Email address</label>
                        <input ref="email" type="email" id="inputEmail" className="form-control" placeholder="Email address" required />
                        </div>
                        <div className="form-group">
                        <label htmlFor="inputPassword" className="sr-only">Password</label>
                        <input ref="password" type="password" id="inputPassword" className="form-control" placeholder="Password" required />
                        </div>
                        <button className="btn btn-md btn-success btn-block" type="submit">Sign in</button>
                    </form>
                    </div>
                </div>
                </div>
            </div>
        );
    }
};

export default connect(state => ({ session: state.session }))(Login);
