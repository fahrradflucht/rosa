import React, { PropTypes } from 'react';
import { Alert,
     Button,
     Checkbox,
     Grid,
     Row,
     Jumbotron,
     FormGroup,
     ControlLabel,
     FormControl,
    } from 'react-bootstrap';

const Login = ({ error, submit }) => (
  <Grid>
    <Row>
      <Jumbotron
        className="col-lg-6 col-lg-offset-3 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1"
      >
        <Grid>
          <h1 className="text-center">Login to Rosa</h1>
          <hr />
          {error ? (
            <Alert bsStyle="danger">
              {error}
            </Alert>
          ) : null}
          <form
            onSubmit={e => {
              e.preventDefault();
              const { email, password, rememberMe } = e.target.elements;
              submit(email.value, password.value, rememberMe.checked);
            }}
          >
            <FormGroup controlId="inputEmail">
              <ControlLabel srOnly>Email address</ControlLabel>
              <FormControl name="email" type="email" placeholder="Email address" required />
            </FormGroup>
            <FormGroup controlId="inputPassword">
              <ControlLabel srOnly>Password</ControlLabel>
              <FormControl name="password" type="password" placeholder="Password" required />
            </FormGroup>
            <FormGroup>
              <Checkbox name="rememberMe">
                Remember Me
              </Checkbox>
            </FormGroup>
            <Button type="submit" className="btn-md btn-success btn-block">
              Sign in
            </Button>
          </form>
        </Grid>
      </Jumbotron>
    </Row>
  </Grid>
);


Login.propTypes = {
  error: PropTypes.string,
  submit: PropTypes.func.isRequired,
};

export default Login;
