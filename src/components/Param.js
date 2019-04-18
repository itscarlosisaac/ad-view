import React, { Component } from 'react'
import CheckBox from './icons/CheckBox';
import Close from './icons/Close';
import Emitter from '../emitter/emitter'


export default class Param extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      name: this.props.name,
      value: this.props.value
    }
    this.renderView = this.renderView.bind(this)
    this.renderEditView = this.renderEditView.bind(this)

    this.deleteParam = this.deleteParam.bind(this)
    this.onChange = this.onChange.bind(this)
    
    this.changeEditMode = this.changeEditMode.bind(this)
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
    if( temp ) {
      const { update, id  } = this.props;
      const { name, value  } = this.state;
      update({id, param:{name, value} });
    }
    process.nextTick(() => {
      this.setState({isEditing: !temp})
    });
  }

  onChange(e){
    const newState = e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: newState,
    });
  }

  deleteParam(){
    const { id, deleteParam } = this.props;
    deleteParam(id);
  }

  renderEditView() {
    const { name, value, } = this.props;
    return (
      <form className="edit__row" onChange={this.onChange}>
        <input type="text" defaultValue={name} name="name" />
        <input type="text" defaultValue={value} name="value" />
        <span onClick={this.deleteParam} className="edit__row--delete">
          <Close />
        </span>
      </form>
    );
  }

  renderView(){
  const { index, name, value } = this.props;
  return (
      <li key={index} className="app__list--param">
        <CheckBox isChecked={true} />
        <div className="app__list--param--content">
          <p className="param__name">
          <b>Name: </b> <span> {name} </span>
          </p>
          <p className="param__value">
            <b>Value: </b> <span> {value}</span>
          </p>
        </div>
      </li>
    );
  }

  render() {
    return !this.state.isEditing ? this.renderView() : this.renderEditView()
  }
}
