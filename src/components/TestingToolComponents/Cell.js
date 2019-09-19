import React, { Component, Fragment } from 'react'
import CheckIcon from '../icons/Checked';
import CancelIcon from '../icons/Cancel';

export default class Cell extends Component {
  constructor(props){
    super(props);

    this.state = {
      isInEditMode: false,
    }
    this.renderDefaultView = this.renderDefaultView.bind(this)
    this.renderEditView = this.renderEditView.bind(this)

    this.changeEditMode = this.changeEditMode.bind(this)
    this.updateData = this.updateData.bind(this)
  }

  changeEditMode() {
    this.setState({
      isInEditMode: !this.state.isInEditMode,
      value: this.props.value
    })
  }

  updateData(){
    this.props.updateCurrentItem(this.refs.row.value, this.refs.row.name, this.state.value)
    this.setState({
      value: this.refs.row.value,
      isInEditMode: false
    })
  }

  renderEditView(){
    return (
      <Fragment>
        <input
          className="data__cell--edit"
          name={this.props.name}
          type="text"
          ref="row"
          defaultValue={this.state.value} />
        <button className="data__cell--save" onClick={this.updateData}><CheckIcon/></button>
        <button className="data__cell--cancel" onClick={this.changeEditMode}><CancelIcon/></button>
      </Fragment>
    )
  }

  renderDefaultView(){
    const {value} = this.props
    return (
      <span className="data__cell" name={this.props.name} onDoubleClick={this.changeEditMode}>{value}</span>
    )
  }

  render() {

    return (
      <Fragment>
        {
          this.state.isInEditMode ?
          this.renderEditView() :
          this.renderDefaultView()
        }
      </Fragment>
    )
  }
}
