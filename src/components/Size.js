import React, { Component } from 'react'
import Button from './Button';
import CheckBox from './icons/CheckBox';
import Emitter from '../emitter/emitter'

export default class Size extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
    }
    this.renderView = this.renderView.bind(this)
    this.renderEditView = this.renderEditView.bind(this)

    this.changeEditMode = this.changeEditMode.bind(this)

    this.form = React.createRef();
  }

  changeEditMode(e){
    e.preventDefault();
    const temp = this.state.isEditing;
    // window.addEventListener('click', this.stopEditing )
    this.setState({isEditing: !temp})
  }


  renderEditView(){
    const { width, height, id, deleteSize } = this.props;
    return (
      <form className="edit__row" ref={this.form}>
        <input type="number" defaultValue={width} name={width} />
        <input type="number" defaultValue={height} name={height} />
      </form>
    );
  }

  toggleRenderSize(){
    console.log("Toggle");
  }

  renderView(){
    const { width, height, id, deleteSize, isChecked } = this.props;
    const { renderSize } = this.state;
    return (
      <li className="app__list--size" id={id} onClick={this.toggleRenderSize} >
        <CheckBox isChecked={true} />
        <span>
          {width}x{height}
        </span>
      </li>
    )
  }

  render() {
    return !this.state.isEditing ? this.renderView() : this.renderEditView()
  }
}
