import React, { Component } from 'react'
import Button from './Button';

export default class Size extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
    }
    this.renderView = this.renderView.bind(this)
    this.renderEditView = this.renderEditView.bind(this)

    this.changeEditMode = this.changeEditMode.bind(this)
    this.stopEditing = this.stopEditing.bind(this)

    this.submitChanges = this.submitChanges.bind(this)
    this.form = React.createRef();
  }

  submitChanges(e){
    const width = Number(this.form.current.childNodes[0].value);
    const height = Number(this.form.current.childNodes[1].value);
    const id = this.props.id;
    this.props.updateSize({id, data:{width, height} })
    window.removeEventListener('click', this.stopEditing);
    this.setState({
      isEditing: false
    })
  }

  changeEditMode(e){
    e.preventDefault();
    const temp = this.state.isEditing;
    window.addEventListener('click', this.stopEditing )
    this.setState({isEditing: !temp})
  }

  stopEditing(e){
    e.preventDefault()
    let target = e.target;
    do {
      if (target == this.form.current) { return; }
      target = target.parentNode;
    } while (target);
    this.setState({isEditing: false})
  }

  renderEditView(){
    const { width, height, id, deleteSize } = this.props;
    return (
      <form className="edit__row" ref={this.form}>
        <input type="number" defaultValue={width} name={width} />
        <input type="number" defaultValue={height} name={height} />
        <div className="actions">
          <Button type="button" content={<i className="material-icons" onClick={this.submitChanges}>done</i>} cName="btn green"/>
          <Button type="button" content={<i className="material-icons" onClick={this.changeEditMode}>clear</i>} cName="btn red"/>
        </div>
      </form>
    );
  }

  renderView(){
    const { width, height, id, deleteSize } = this.props;
    return (
      <li className="app__list--item"  onDoubleClick={this.changeEditMode}>
        <b>Width:</b> {width}
        <span>|</span>
        <b>Height:</b> {height}
        <i
          id={id}
          className="material-icons"
          onClick={deleteSize}>
          clear
        </i>
      </li>
    )
  }


  render() {
    return !this.state.isEditing ? this.renderView() : this.renderEditView()
  }
}
