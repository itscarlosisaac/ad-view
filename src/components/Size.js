import React, { Component } from 'react'
import Close from './icons/Close';
import CheckBox from './icons/CheckBox';

export default class Size extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      width: this.props.model.width,
      height: this.props.model.height
    }

    this.renderView = this.renderView.bind(this)
    this.renderEditView = this.renderEditView.bind(this)

    this.changeEditMode = this.changeEditMode.bind(this)
    this.onChangeVisibility = this.onChangeVisibility.bind(this)

    this.onChange = this.onChange.bind(this)
    this.deleteSize = this.deleteSize.bind(this)
  }

  componentDidMount() {
    // Emitter.sizeEditableEmitter.on('toggle-edit', (param) => {
    //   this.changeEditMode(param)
    // })
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

  onChangeVisibility(){
    const model = this.props.model;
    model.checked = model.checked ? false : true;
    this.props.update( model );
  }

  deleteSize(){
    const { deleteSize } = this.props;
    const id = this.props.model.id;
    deleteSize(id);
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
      <li className="app__list--size" id={id}  onClick={this.onChangeVisibility}>
        <CheckBox isChecked={checked} />
        <span> {width}x{height} </span>
      </li>
    )
  }

  render() {
    return !this.state.isEditing ? this.renderView() : this.renderEditView()
  }
}
