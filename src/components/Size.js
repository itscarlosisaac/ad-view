import React, { Component } from 'react'
import Close from './icons/Close';
import CheckBox from './icons/CheckBox';

// REDUX
import { UpdateSizeAction } from '../actions/sizeActions';
import { bindActionCreators } from 'redux'
import { connect, } from 'react-redux';
import { updateSize, deleteSize } from '../actions/sizeMethods'

class Size extends Component {

  constructor(props) {
    super(props);
    this.state = {
      updatedAt: new Date(),
    }

    this.renderView = this.renderView.bind(this)
    this.renderEditView = this.renderEditView.bind(this)

    this.changeEditMode = this.changeEditMode.bind(this)

    this.onChange = this.onChange.bind(this)
    this.deleteSize = this.deleteSize.bind(this)

    this.onUpdateVisibility = this.onUpdateVisibility.bind(this)
  }

  changeEditMode(param){
    const model = this.props.model;
    if( !param ) {
      const { width, height } = this.state;
      model.updatedAt = new Date();
      model.width = Number(width);
      model.height = Number(height);
      this.props.update( model );
    }
  }

  onChange(e){
    const { model, dispatch } = this.props;
    const name = e.target.name;
          model[name] = e.target.value;
          model.updatedAt = new Date();
    dispatch(updateSize(model))
  }

  deleteSize(){
    const { model, dispatch} = this.props;
    dispatch(deleteSize(model))
  }

  onUpdateVisibility(){
    const {model, dispatch} = this.props;
          model.checked = !model.checked ;
    dispatch(updateSize(model))
  }

  renderEditView(){
    const { width, height, id } = this.props.model;
    return (
      <form className="edit__row" id={id} onChange={this.onChange}>
        <input type="number" placeholder={width} name="width" />
        <input type="number" placeholder={height} name="height" />
        <span onClick={this.deleteSize} className="edit__row--delete">
          <Close />
        </span>
      </form>
    );
  }

  renderView(){
    const { width, height, id, checked } = this.props.model;
    return (
      <li className="app__list--size" id={id} onClick={this.onUpdateVisibility}>
        <CheckBox isChecked={checked} />
        <span> {width}x{height} </span>
      </li>
    )
  }

  render() {
    return !this.props.is_editing ? this.renderView() : this.renderEditView()
    // return this.renderEditView();
    // return this.renderView();
  }
}

const mapActionsToProps = (dispatch) => {
  return bindActionCreators({
    onUpdateAction: UpdateSizeAction
  }, dispatch)
}

export default connect(mapActionsToProps)(Size)
