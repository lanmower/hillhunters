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
import validate from '../../../modules/validate';
import ImageSelect from '../ImageSelect/ImageSelect.js'



class DeckEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name:'',
      shape:'',
      edge:'',
      mount:'',
      curve:'',
      bushingHardness:83,
      wheelhardness:78,
      wheelsize:80,
      bearings:''
    };
  }

  componentDidMount() {
    const component = this;
    validate(component.form, {
      rules: {
        name: {
          required: true,
        },
        shape: {
          required: true,
        },
        edge: {
          required: true,
        },
        mount: {
          required: true,
        },
        curve: {
          required: true,
        },
        orientationleft: {
          required: true,
        },
        orientationright: {
          required: true,
        },
        griptape: {
          required: true,
        },
        bushingHardness: {
          required: true,
        },
        wheelhardness: {
          required: true,
        },
        wheelsize: {
          required: true,
        },
        bearings: {
          required: true,
        }
      },
      messages: {
        name: {
          required: 'specify a name.',
        },
        shape: {
          required: 'specify a shape.',
        },
        edge: {
          required: 'specify an edge type.',
        },
        mount: {
          required: 'specify a mount type.',
        },
        curve: {
          required: 'specify a curve type.',
        },
        orientationleft: {
          required: 'specify a left truck orientation.',
        },
        orientationright: {
          required: 'specify a right truck orientation.',
        },
        griptape: {
          required: 'specify a grip tape roughness.',
        },
        wheelhardness: {
          required: 'specify a wheel hardness.',
        },
        wheelsize: {
          required: 'specify a wheel size.',
        },
        bearings: {
          required: 'specify a bearing tolerance.',
        }
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
    const existingDeck = this.props.doc && this.props.doc._id;
    const methodToCall = existingDeck ? 'decks.update' : 'decks.insert';
    const doc = {
      name: this.state.name,
      shape: this.state.shape,
      edge: this.state.edge,
      mount: this.state.mount,
      curve: this.state.curve,
      bushingHardness: this.state.bushingHardness,
      orientationleft: this.state.orientationleft,
      orientationright: this.state.orientationright,
      griptape: this.state.griptape,
      wheelhardness: this.state.wheelhardness,
      wheelsize: this.state.wheelhardness,
      bearings: this.state.bearings
    };

    if (existingDeck) doc._id = existingDeck;

    Meteor.call(methodToCall, doc, (error, deckId) => {
      console.log(error);
      if (error) {
        Bert.alert(error.reason, 'danger');
      }
      else {
        const confirmation = existingDeck ? 'Deck updated!' : 'Deck added!';
        this.form.reset();
        Bert.alert(confirmation, 'success');
        history.push(`/decks/${deckId}`);
      }
    });
  }

  render() {
    const {
      doc
    } = this.props;
    const state = this.state;
    const formgroupstyle = {paddingTop:"10px", paddingBottom:"10px"};
    const formlabelstyle = {paddingTop:"0px", paddingBottom:"10px"};
    return (<form  style={{paddingLeft:"40px", paddingRight:"40px", paddingBottom:"80px"}} ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
      <FormGroup style={formgroupstyle}>
        <Input
          id="name"
          label="Name"
          value={this.state.name}
          onChange={event => this.setState({ name: event.target.value })}
        />
      </FormGroup>
      <FormGroup style={formgroupstyle}>
        <FormLabel style={formlabelstyle}>Shape</FormLabel>
        <ImageSelect
  					options={[
        			{ value: 'directional-cutaway'},
        			{ value: 'doublekick-cutaway'},
        			{ value: 'pintail'},
        			{ value: 'pintail-kicktail'},
        			{ value: 'popsickle'},
        		]}
        		path={"shapes"}
        		value={state.shape}
  					onChange={(value) => {
          		this.setState({ shape:value.value });
          	}}
  			/>
      </FormGroup>
      <FormGroup style={formgroupstyle}>
        <FormLabel style={formlabelstyle}>Edge</FormLabel>
        <ImageSelect
  					options={[
          			{ value: 'straight'},
          			{ value: 'dropped'},
        		]}
        		path={"edges"}
        		value={state.edge}
  					onChange={(value) => {
          		this.setState({ edge:value.value });
          	}}
  			/>
      </FormGroup>
      <FormGroup style={formgroupstyle}>
        <FormLabel style={formlabelstyle}>Mount</FormLabel>
        <ImageSelect
  					options={[
  	          { value: 'drop'},
  		      	{ value: 'top'},
        		]}
        		path={"mount"}
        		value={state.mount}
  					onChange={(value) => {
          		this.setState({ mount:value.value });
          	}}
  			/>
      </FormGroup>
      <FormGroup style={formgroupstyle}>
        <FormLabel style={formlabelstyle}>Curve</FormLabel>
        <ImageSelect
  					options={[
        			{ value: 'concave'},
        			{ value: 'convex'},
        			{ value: 'straight'},
        			{ value: 'w'},
        		]}
        		path={"curves"}
        		value={state.curve}
  					onChange={(value) => {
          		this.setState({ curve:value.value });
          	}}
  			/>
      </FormGroup>
      <FormGroup style={formgroupstyle}>
        <FormLabel style={formlabelstyle}>Grip tape</FormLabel>
    		<Select
    			options={[
  	          { value: 'fine', label: 'fine' },
              { value: 'medium', label: 'medium' },
              { value: 'rough', label: 'rough' }
        		]}
      		  name="form-field-name"
        		value={state.griptape}
  					onChange={(value) => {
          		this.setState({ griptape:value.value });
          	}}
        		value={state.griptape}
    		/>
      </FormGroup>
      <FormGroup style={formgroupstyle}>
        <FormLabel style={formlabelstyle}>Bushing Hardness</FormLabel>
       <InputRange
        maxValue={110}
        minValue={65}
				onChange={(value) => {
      		this.setState({ bushingHardness:value });
      	}}
    		value={state.bushingHardness}
    		formatLabel={value => `${value}a`}
       />
      </FormGroup>
      <FormGroup style={formgroupstyle}>
        Wheel
      </FormGroup>
      <FormGroup style={formgroupstyle}>
        <FormLabel style={formlabelstyle}>Orientation</FormLabel>
        
        <Grid container spacing={24}>
          <Grid item xs={6}>
            <ImageSelect
    					options={[
    	          { value: 'boardside'},
    		      	{ value: 'roadside'},
          		]}
          		path={"orientations/left"}
          		value={state.orientationleft}
    					onChange={(value) => {
            		this.setState({ orientationleft:value.value });
            	}}
      			/>
          </Grid>
          <Grid item xs={6}>
            <ImageSelect
    					options={[
    	          { value: 'boardside'},
    		      	{ value: 'roadside'},
          		]}
          		path={"orientations/right"}
          		value={state.orientationright}
    					onChange={(value) => {
            		this.setState({ orientationright:value.value });
            	}}
      			/>
          </Grid>
        </Grid>
      </FormGroup>
      <FormGroup style={formgroupstyle}>
      <FormLabel style={formlabelstyle}>Hardness</FormLabel>
       <InputRange
        maxValue={110}
        minValue={65}
    		value={state.wheelhardness}
				onChange={(value) => {
      		this.setState({ wheelhardness:value });
      	}}
    		formatLabel={value => `${value}a`}
       />
      </FormGroup>
      <FormGroup style={formgroupstyle}>
      <FormLabel style={formlabelstyle}>Size</FormLabel>
       <InputRange
        maxValue={110}
        minValue={65}
    		value={state.wheelsize}
				onChange={(value) => {
      		this.setState({ wheelsize:value });
      	}}
    		formatLabel={value => `${value}mm`}
       />
      </FormGroup>
      <FormGroup style={formgroupstyle}>
        <FormLabel style={formlabelstyle}>Bearings</FormLabel>
       {/*<InputRange
        maxValue={9}
        minValue={1}
        step={2}
    		value={state.bearings}
				onChange={(value) => {
      		this.setState({ bearings:value+1 });
      	}}
    		formatLabel={value => `ABEC ${value}`}
       />*/}
    		<Select
    			options={[
  	          { value: 'ABEC3', label: 'ABEC 3' },
  	          { value: 'ABEC5', label: 'ABEC 5' },
  	          { value: 'ABEC7', label: 'ABEC 7' },
  	          { value: 'ABEC9', label: 'ABEC 9' }
        		]}
      		  name="form-field-name"
        		value={state.bearings}
  					onChange={(value) => {
          		this.setState({ bearings:value.value });
          	}}
        		value={state.bearings}
    		/>
      </FormGroup>

      <Button fab style={{margin: 0, top: 'auto', right: 20, bottom: 20, left: 'auto', position: 'fixed'}} color="primary" aria-label="add" type="submit">
        <SaveIcon />
      </Button>
    </form>);
  }
}

DeckEditor.defaultProps = {
  doc: {
    name: '',
    shape: '',
    edge: '',
    mount: '',
    curve: '',
    orientationleft: '',
    orientationright: '',
    griptape: '',
    bushingHardness: 83,
    wheelhardness: 78,
    wheelsize: 80,
    bearings: ''
  },
};

DeckEditor.propTypes = {
  doc: PropTypes.object,
};

export default DeckEditor;
