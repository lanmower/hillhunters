import React from 'react';
import { SnackbarContent } from 'material-ui/Snackbar';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';
import AccountPageFooter from '../components/AccountPageFooter';
import validate from '../../validate';

class RecoverPassword extends React.Component {
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
      },
      messages: {
        emailAddress: {
          required: 'Need an email address here.',
          email: 'Is this email address correct?',
        },
      },
      submitHandler() { component.handleSubmit(); },
    });
  }

  handleSubmit() {
    const { history } = this.props;
    const email = this.emailAddress.value;

    Accounts.forgotPassword({ email }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert(`Check ${email} for a reset link!`, 'success');
        history.push('/login');
      }
    });
  }

  render() {
    return (<div className="RecoverPassword">
          <h4 className="page-header">Recover Password</h4>
          <SnackbarContent message="Enter your email address below to receive a link to reset your password."/>
          <form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
              Email Address
              <input
                type="email"
                name="emailAddress"
                ref={emailAddress => (this.emailAddress = emailAddress)}
                className="form-control"
              />
            <Button type="submit">Recover Password</Button>
            <SnackbarContent>
              Remember your password? <Link to="/login">Log In</Link>.
            </SnackbarContent>
          </form>
    </div>);
  }
}

RecoverPassword.propTypes = {
  history: PropTypes.object.isRequired,
};

export default RecoverPassword;
