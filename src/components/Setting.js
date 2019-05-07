import React, { Component } from 'react'
import Checkbox from './icons/CheckBox';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { UpdateOptionAction } from '../actions/optionsActions';
import { updateOption } from '../actions/optionsMethods';

class Setting extends Component {

  constructor(props){
    super(props);

    this.onUpdateOption = this.onUpdateOption.bind(this);
  }

  onUpdateOption(){
    const {dispatch, option, id, options, name} = this.props;
          options[name].value = !options[name].value ;
    dispatch(updateOption(options))
  }

  render() {
    const { id } = this.props
    const { label, value } = this.props.option;
    return (
      <div id={id} className="app__global__settings-item" onClick={this.onUpdateOption}>
        <Checkbox isChecked={value} />
        <span className="label"> {label} </span>
      </div>
    )
  }
}

const mapActionsToProps = (dispatch) => {
  return bindActionCreators({
    onUpdateOption: UpdateOptionAction
  }, dispatch )
}

export default connect(mapActionsToProps)(Setting);
// export default Setting;
