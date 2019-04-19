import React, { Component } from 'react'
import Close from './icons/Close';
import CheckBox from './icons/CheckBox';
import Emitter from '../emitter/emitter'

export default class Size extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      model: null
    }
    this.renderView = this.renderView.bind(this)
    this.renderEditView = this.renderEditView.bind(this)

    this.changeEditMode = this.changeEditMode.bind(this)
    this.onChangeModelState = this.onChangeModelState.bind(this)

    this.onChange = this.onChange.bind(this)
    this.deleteSize = this.deleteSize.bind(this)
  }

  componentDidMount() {
    Emitter.sizeEditableEmitter.on('toggle-edit', () => {
      this.changeEditMode()
    })
  }

  componentWillUnmount() {
    Emitter.sizeEditableEmitter.removeAllListeners('toggle-edit');
  }

  changeEditMode(){
    const temp = this.state.isEditing;
    const { width, height } = this.state;
    if( temp ) {
      const { update, id  } = this.props;
      update({id, width, height, updatedAt: new Date() } );
    }
    process.nextTick(() => {
      this.setState({isEditing: !temp})
    })
  }

  onChange(e){
    const newState = e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: newState,
    });
  }

  onChangeModelState(){
    const model = this.props.model;
    model.checked = model.checked ? false : true;
    this.props.update( model );
  }

  deleteSize(){
    const { id, deleteSize } = this.props;
    deleteSize(id);
  }

  renderEditView(){
    const { width, height, id } = this.props;
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
      <li className="app__list--size" id={id} onClick={this.toggleRenderSize} >
        <span onClick={this.onChangeModelState}>
          <CheckBox isChecked={checked} />
        </span>
        <span> {width}x{height} </span>
      </li>
    )
  }

  render() {
    return !this.state.isEditing ? this.renderView() : this.renderEditView()
  }
}
