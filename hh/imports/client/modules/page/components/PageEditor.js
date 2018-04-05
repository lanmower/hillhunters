import React from 'react';
import PropTypes from 'prop-types';

import FormGroup from 'material-ui/Form/FormGroup';
import FormLabel from 'material-ui/Form/FormLabel';
import Radio from 'material-ui/Radio';
import FormControl from 'material-ui/Form/FormControl';
import Button from 'material-ui/Button';
import Select from 'react-select';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import SaveIcon from 'material-ui-icons/Save';
import TextField from 'material-ui/TextField';
import InputRange from 'react-input-range';
import Input from 'material-ui/Input/Input';
import {
  Meteor
}
from 'meteor/meteor';
import {
  Bert
}
from 'meteor/themeteorchef:bert';
import validate from '../../validate';
import ImageSelect from '../../form/components/ImageSelect'



class PageEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      body:''
    };
  }

  componentDidMount() {
    const component = this;
    validate(component.form, {
      rules: {
        body: {
          required: true,
        },
      },
      messages: {
        body: {
          required: 'specify body.',
        },
      },
      submitHandler() {
        component.handleSubmit();
      },
    }); 
    this.setState(this.props.doc);
  }

  handleSubmit() {
    const {
      history
    } = this.props;
    const existingPage = this.props.doc && this.props.doc._id;
    const methodToCall = existingPage ? 'pages.update' : 'pages.insert';
    const doc = {
      body: this.state.body
    };

    if (existingPage) doc._id = existingPage;

    Meteor.call(methodToCall, doc, (error, pageId) => {
      console.log(error);
      if (error) {
        Bert.alert(error.reason, 'danger');
      }
      else {
        let name = null;
        if(this.props.page) name = this.props.page.name;
        const confirmation = existingPage ? 'Page updated!' : 'Page added!';
        this.form.reset();
        Bert.alert(confirmation, 'success');
        if(name) history.push(`/pages/${name}`);
      }
    });
  }

  render() {
    const {
      doc
    } = this.props;
    const state = this.state;
    const {formgroupstyle, formlabelstyle, containerstyle} = Meteor;
    return (<form ref={form => (this.form = form)} style={containerstyle} onSubmit={event => event.preventDefault()}>
      <FormGroup style={formgroupstyle}>
        <TextField
          id="body"
          label="Body"
          multiline
          rows="4"
          defaultValue="Default Value"
          margin="normal"
          value={this.state.body}
          onChange={event => this.setState({ body: event.target.value })}
        />
      </FormGroup>

      <Button fab style={{margin: 0, top: 'auto', right: 20, bottom: 20, left: 'auto', position: 'fixed'}} color="primary" aria-label="add" type="submit">
        <SaveIcon />
      </Button>
    </form>);
  }
}

PageEditor.defaultProps = {
  doc: {
    body: ''
  },
};

PageEditor.propTypes = {
  doc: PropTypes.object,
};

export default PageEditor;
