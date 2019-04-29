import React, { Component } from 'react';
import validate from 'validate.js';

// REDUX
import { AddSizeAction } from '../actions/sizeActions';
import { bindActionCreators } from 'redux'
import { connect, } from 'react-redux';
// Components
import Input from '../components/Input';
import Button from '../components/Button';

class AddSize extends Component {
  constructor(props){
    super(props)
    this.onAddSize = this.onAddSize.bind(this);
  }

  onAddSize(e) {
    e.preventDefault();
    const values = validate.collectFormValues(document.getElementById('add-size'));
    for( const v in values) {
      if( values[v] === null) {
        // this.addErrorClass(v);
      }
    }

    if ( values.width !== null &&
         values.height !== null ) {
          this.props.dispatch(
            {
              type: 'ADD_SIZE',
              payload: {
                width: Number(e.target.elements[0].value),
                height: Number(e.target.elements[1].value)
              }
            }
          )
    }
  }

  render(){
    return (
      <div>
        <form
        id="add-size"
        className="input__row add__size"
        onSubmit={this.onAddSize}>
          <div className="inputs">
            <Input label="W" name="width" id="width" type="number"/>
            <Input label="H" name="height" id="height" type="number"/>
          </div>
          <Button cName="btn btn__main--gray" content="Clear" type="clear"/>
          <Button cName="btn btn__main--orange" content="Add Size" type="submit"/>
        </form>
      </div>
    )
  }
}


const mapActionsToProps = (dispatch) => {
  return bindActionCreators({
    onAddSize: AddSizeAction
  }, dispatch)
}

export default connect(mapActionsToProps)(AddSize)