import React from 'react';
import PropTypes from 'prop-types';
import {
  SnackbarContent
}
from 'material-ui/Snackbar';
import Button from 'material-ui/Button';
import {
  Link
}
from 'react-router-dom';
import {
  Meteor
}
from 'meteor/meteor';
import {
  Bert
}
from 'meteor/themeteorchef:bert';
import OAuthLoginButtons from '../components/OAuthLoginButtons';
import AccountPageFooter from '../components/AccountPageFooter';
import validate from '../../validate';
import Navigation from '/imports/client/components/Navigation';
import FormGroup from 'material-ui/Form/FormGroup';
import FormLabel from 'material-ui/Form/FormLabel';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const component = this;

    validate(component.form, {
      rules: {
        emailAddress: {
          required: true,
          email: true,
        },
        password: {
          required: true,
        },
      },
      messages: {
        emailAddress: {
          required: 'Need an email address here.',
          email: 'Is this email address correct?',
        },
        password: {
          required: 'Need a password here.',
        },
      },
      submitHandler() {
        component.handleSubmit();
      },
    });
  }

  handleSubmit() {
    const {
      history
    } = this.props;

    Meteor.loginWithPassword(this.emailAddress.value, this.password.value, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      }
      else {
        Bert.alert('Welcome back!', 'success');
        history.push('/tracks');
      }
    });
  }

  render() {
    return (<div className="Login">
          <div>
          <h4 className="page-header">Log In</h4>
              <OAuthLoginButtons
                services={['facebook', 'github', 'google']}
              />
          <form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
              <FormGroup>
              <FormLabel>Email Address</FormLabel>
              <input
                type="email"
                name="emailAddress"
                ref={emailAddress => (this.emailAddress = emailAddress)}
                className="form-control"
              />
              </FormGroup>
              <FormGroup>
              <FormLabel>Password</FormLabel>
              <Link style={{position:"absolute", right:"50px", marginTop:"-4px"}} to="/recover-password">Forgot password?</Link>
              <input
                type="password"
                name="password"
                ref={password => (this.password = password)}
                className="form-control"
              />
              </FormGroup>
              <FormGroup>
            <Button type="submit" raised color="primary">Log In</Button>
            {'Don\'t have an account?'} <Link to="/signup">Sign Up</Link>.
              </FormGroup>
        </form>
        </div>
    </div>);
  }
}

Login.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Login;
