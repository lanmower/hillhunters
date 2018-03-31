import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';


class ImageSelect extends React.Component {
  constructor(props) {
    super(props)
    const {
      value
    } = this.props;

    this.state = {value};
  }

  render() {
  
    const {
      options,
      onChange,
      value,
      path
    } = this.props;

    const renderOption = (option) => {
      return (
        <img style={{height:"4em"}} src={'/images/'+path+'/'+option.value+".png"}/>
      );
    }
  
    const renderValue = (option) => {
      if(option.value) {
        return (
          <img style={{height:"100%"}} src={'/images/'+path+'/'+option.value+".png"}/>
        );
      }
    }
    return (
		<Select
			onInputChange={(inputValue) => this._inputValue = inputValue}
			options={options}
			optionRenderer={renderOption}
			value={value}
			valueRenderer={renderValue}
			onChange={onChange}
		/>
    );
  }
}

ImageSelect.defaultProps = {
    title: '',
    options: {},
    onChange: ()=>{},
    value: ''
};

ImageSelect.propTypes = {
  title: PropTypes.string,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string,
  path: PropTypes.string.isRequired
};

export default ImageSelect;
