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

    this.renderView = this.renderView.bind(this)
    this.renderEditView = this.renderEditView.bind(this)

    this.changeEditMode = this.changeEditMode.bind(this)

    this.onChange = this.onChange.bind(this)
    this.deleteSize = this.deleteSize.bind(this)

    this.onUpdateVisibility = this.onUpdateVisibility.bind(this)
  }

  componentDidMount() {
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

    this.setState({isEditing: param})
  }

  onChange(e){
    const newState = e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: newState,
    });
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
        <input type="number" defaultValue={width} name="width" />
        <input type="number" defaultValue={height} name="height" />
        <span onClick={this.deleteSize} className="edit__row--delete">
          <Close />
        </span>
      </form>
    );
  }

  renderView(){
    const { width, height, id, checked } = this.props.model;
    return (
      <li className="app__list--size" id={id} onDoubleClick={this.deleteSize}  onClick={this.onUpdateVisibility}>
        <CheckBox isChecked={checked} />
        <span> {width}x{height} </span>
      </li>
    )
  }

  render() {
    // return !this.state.isEditing ? this.renderView() : this.renderEditView()
    return this.renderView();
  }
}

const mapActionsToProps = (dispatch) => {
  return bindActionCreators({
    onUpdateAction: UpdateSizeAction
  }, dispatch)
}

export default connect(mapActionsToProps)(Size)