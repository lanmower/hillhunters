import React from 'react';
import PropTypes from 'prop-types';
import Collection from '/imports/api/Decks';
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
import validate from '../validate';
import ImageSelect from '../form/components/ImageSelect'

        const collectionName = Collection._name;


class Editor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name:'',
      shape:'',
      edge:'',
      mount:'',
      curve:'',
      bushinghardness:83,
      wheelhardness:78,
      wheelsize:80,
      boardlength:80,
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
        bushinghardness: {
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
          required: 'specify wheel size.',
        },
        boardlength: {
          required: 'specify board length.',
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
    const existing = this.props.doc && this.props.doc._id;
    const methodToCall = existing ? Collection._name+'.update' : Collection._name+'.insert';
    const doc = {
      name: this.state.name,
      shape: this.state.shape,
      edge: this.state.edge,
      mount: this.state.mount,
      curve: this.state.curve,
      bushinghardness: this.state.bushinghardness,
      orientationleft: this.state.orientationleft,
      orientationright: this.state.orientationright,
      griptape: this.state.griptape,
      wheelhardness: this.state.wheelhardness,
      wheelsize: this.state.wheelhardness,
      boardlength: this.state.boardlength,
      bearings: this.state.bearings
    };

    if (existing) doc._id = existing;

    Meteor.call(methodToCall, doc, (error, id) => {
      console.log(error);
      if (error) {
        Bert.alert(error.reason, 'danger');
      }
      else {
        const confirmation = existing ? 'Updated!' : 'Added!';
        this.form.reset();
        Bert.alert(confirmation, 'success');
        history.push(`/${collectionName}/${id}`);
      }
    });
  }

  render() {
    const {
      doc
    } = this.props;
    const state = this.state;
    const {formgroupstyle, formlabelstyle, containerstyle} = Meteor;
    return (<form ref={form => (this.form = form)}  onSubmit={event => event.preventDefault()}>
      <FormGroup>
        <FormLabel>Name</FormLabel>
        <Input
          id="name"
          label="Name"
          value={this.state.name}
          onChange={event => this.setState({ name: event.target.value })}
        />
      </FormGroup>
      <FormGroup>
        <FormLabel>Shape</FormLabel>
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
      <FormGroup>
        <FormLabel>Edge</FormLabel>
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
      <FormGroup>
        <FormLabel>Mount</FormLabel>
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
      <FormGroup>
        <FormLabel>Curve</FormLabel>
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
      <FormGroup>
        <FormLabel>Grip tape</FormLabel>
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
      <FormGroup>
        <FormLabel>Bushing Hardness</FormLabel>
       <InputRange
        maxValue={110}
        minValue={65}
				onChange={(value) => {
      		this.setState({ bushinghardness:value });
      	}}
    		value={state.bushinghardness}
    		formatLabel={value => `${value}a`}
       />
      </FormGroup>
      <FormGroup>
        <FormLabel>Wheel Orientation</FormLabel>
        
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
      <FormGroup>
      <FormLabel>Wheel Hardness</FormLabel>
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
      <FormGroup>
      <FormLabel>Wheel Size</FormLabel>
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
      <FormGroup>
      <FormLabel>Board length</FormLabel>
       <InputRange
        maxValue={110}
        minValue={65}
    		value={state.boardlength}
				onChange={(value) => {
      		this.setState({ boardlength:value });
      	}}
    		formatLabel={value => `${value}mm`}
       />
      </FormGroup>
      <FormGroup>
        <FormLabel>Bearings</FormLabel>
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

      <Button variant="fab"  style={{margin: 0, top: 'auto', right: 20, bottom: 20, left: 'auto', position: 'fixed'}} color="primary" aria-label="add" type="submit">
        <SaveIcon />
      </Button>
    </form>);
  }
}

Editor.defaultProps = {
  doc: {
    name: '',
    shape: '',
    edge: '',
    mount: '',
    curve: '',
    orientationleft: '',
    orientationright: '',
    griptape: '',
    bushinghardness: 83,
    wheelhardness: 78,
    wheelsize: 80,
    boardlength: 80,
    bearings: ''
  },
};

Editor.propTypes = {
  doc: PropTypes.object,
};

export default Editor;
