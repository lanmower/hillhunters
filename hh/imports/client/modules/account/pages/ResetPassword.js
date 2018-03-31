import React from 'react';
import PropTypes from 'prop-types';
import { SnackbarContent } from 'material-ui/Snackbar';
import Button from 'material-ui/Button';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';
import validate from '../../validate';

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const component = this;

    validate(component.form, {
      rules: {
        newPassword: {
          required: true,
          minlength: 6,
        },
        repeatNewPassword: {
          required: true,
          minlength: 6,
          equalTo: '[name="newPassword"]',
        },
      },
      messages: {
        newPassword: {
          required: 'Enter a new password, please.',
          minlength: 'Use at least six characters, please.',
        },
        repeatNewPassword: {
          required: 'Repeat your new password, please.',
          equalTo: 'Hmm, your passwords don\'t match. Try again?',
        },
      },
      submitHandler() { component.handleSubmit(); },
    });
  }

  handleSubmit() {
    const { match, history } = this.props;
    const token = match.params.token;

    Accounts.resetPassword(token, this.newPassword.value, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        history.push('/');
      }
    });
  }

  render() {
    return (<div className="ResetPassword">
          <h4 className="page-header">Reset Password</h4>
          <SnackbarContent message="To reset your password, enter a new one below. You will be logged in
            with your new password."/>
          <form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
              New Password
              <input
                type="password"
                className="form-control"
                ref={newPassword => (this.newPassword = newPassword)}
                name="newPassword"
                placeholder="New Password"
              />
              Repeat New Password
              <input
                type="password"
                className="form-control"
                ref={repeatNewPassword => (this.repeatNewPassword = repeatNewPassword)}
                name="repeatNewPassword"
                placeholder="Repeat New Password"
              />
            <Button type="submit">Reset Password &amp; Login</Button>
          </form>
    </div>);
  }
}

ResetPassword.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default ResetPassword;
