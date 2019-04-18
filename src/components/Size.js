import React, { Component } from 'react'
import Close from './icons/Close';
import CheckBox from './icons/CheckBox';
import Emitter from '../emitter/emitter'

export default class Size extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      width: this.props.size.width,
      height: this.props.size.height,
    }
    this.renderView = this.renderView.bind(this)
    this.renderEditView = this.renderEditView.bind(this)

    this.changeEditMode = this.changeEditMode.bind(this)
    this.onChange = this.onChange.bind(this)
    this.deleteSize = this.deleteSize.bind(this)

    this.form = React.createRef();
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
      update({id, size:{width, height} });
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

  deleteSize(){
    const { id, deleteSize } = this.props;
    deleteSize(id);
  }

  renderEditView(){
    const { size, id } = this.props;
    return (
      <form className="edit__row" ref={this.form} id={id} onChange={this.onChange}>
        <input type="number" defaultValue={size.width} name="width" />
        <input type="number" defaultValue={size.height} name="height" />
        <span onClick={this.deleteSize} className="edit__row--delete">
          <Close />
        </span>
      </form>
    );
  }

  renderView(){

    const { size, id, isChecked } = this.props;
    // console.log(this.props)
    return (
      <li className="app__list--size" id={id} onClick={this.toggleRenderSize} >
        <CheckBox isChecked={isChecked} />
        <span id={id}>
          {size.width}x{size.height}
        </span>
      </li>
    )
  }

  render() {
    return !this.state.isEditing ? this.renderView() : this.renderEditView()
  }
}
