import React from 'react';
import { SnackbarContent } from 'material-ui/Snackbar';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';
import OAuthLoginButtons from '../../components/OAuthLoginButtons/OAuthLoginButtons';
import InputHint from '../../components/InputHint/InputHint';
import AccountPageFooter from '../../components/AccountPageFooter/AccountPageFooter';
import validate from '../../../modules/validate';
import Navigation from '../../components/Navigation/Navigation';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const component = this;

    validate(component.form, {
      rules: {
        firstName: {
          required: true,
        },
        lastName: {
          required: true,
        },
        emailAddress: {
          required: true,
          email: true,
        },
        password: {
          required: true,
          minlength: 6,
        },
      },
      messages: {
        firstName: {
          required: 'What\'s your first name?',
        },
        lastName: {
          required: 'What\'s your last name?',
        },
        emailAddress: {
          required: 'Need an email address here.',
          email: 'Is this email address correct?',
        },
        password: {
          required: 'Need a password here.',
          minlength: 'Please use at least six characters.',
        },
      },
      submitHandler() { component.handleSubmit(); },
    });
  }

  handleSubmit() {
    const { history } = this.props;

    Accounts.createUser({
      email: this.emailAddress.value,
      password: this.password.value,
      profile: {
        name: {
          first: this.firstName.value,
          last: this.lastName.value,
        },
      },
    }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Welcome!', 'success');
        history.push('/documents');
      }
    });
  }

  render() {
    return (<div className="Signup">
          <Navigation title="Profile"  />
          <h4 className="page-header">Sign Up</h4>
              <OAuthLoginButtons
                services={['facebook', 'github', 'google']}
                emailMessage={{
                  offset: 97,
                  text: 'Sign Up with an Email Address',
                }}
              />
          <form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
            First Name
                  <input
                    type="text"
                    name="firstName"
                    ref={firstName => (this.firstName = firstName)}
                    className="form-control"
                  />
                  Last Name
                  <input
                    type="text"
                    name="lastName"
                    ref={lastName => (this.lastName = lastName)}
                    className="form-control"
                  />
              Email Address
              <input
                type="email"
                name="emailAddress"
                ref={emailAddress => (this.emailAddress = emailAddress)}
                className="form-control"
              />
            Password
              <input
                type="password"
                name="password"
                ref={password => (this.password = password)}
                className="form-control"
              />
            <SnackbarContent message="Use at least six characters."/>
            <Button type="submit">Sign Up</Button>
              Already have an account? <Link to="/login">Log In</Link>.
          </form>
    </div>);
  }
}

Signup.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Signup;
