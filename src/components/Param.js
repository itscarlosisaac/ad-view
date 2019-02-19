import React, { Component } from 'react'
import Button from './Button';

export default class Param extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
    }
    this.renderView = this.renderView.bind(this)
    this.renderEditView = this.renderEditView.bind(this)
    this.changeEditMode = this.changeEditMode.bind(this)
    this.submitChanges = this.submitChanges.bind(this)
    this.form = React.createRef();
  }

  changeEditMode(e){
    e.preventDefault();
    const temp = this.state.isEditing;
    this.setState({isEditing: !temp})
  }

  submitChanges(e){
    e.preventDefault();
    const name = this.form.current.childNodes[0].value
    const value = this.form.current.childNodes[1].value
    const id = this.props.id
    this.props.updateParam({param:{name, value}, id})
    this.setState({
      isEditing: false
    })
  }

  renderEditView() {
    const { index, name, value, id, deleteParam } = this.props;
    return (
      <form className="edit__row" ref={this.form}>
        <input type="text" defaultValue={name} name={name} />
        <input type="text" defaultValue={value} name={value} />
        <div className="actions">
          <Button type="button" content={<i className="material-icons" onClick={this.submitChanges}>done</i>} cName="btn green"/>
          <Button type="button" content={<i className="material-icons" onClick={this.changeEditMode}>clear</i>} cName="btn red"/>
        </div>
      </form>
    );
  }

  renderView(){
    const { index, name, value, id, deleteParam } = this.props;
    return <li key={index} className="app__list--item" onDoubleClick={this.changeEditMode}>
            <b className="param__name">{name}</b>
            : <span className="param__value"> {value}</span>
            <i id={id} onClick={deleteParam} className="material-icons"> clear </i>
          </li>
  }
  render() {
    return !this.state.isEditing ? this.renderView() : this.renderEditView()
  }
}
