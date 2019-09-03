import React, { Component, Fragment } from 'react'

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
    this.props.upadteCurrentItem(this.refs.row.value, this.refs.row.name, this.state.value)
    this.setState({
      value: this.refs.row.value,
      isInEditMode: false
    })
  }

  renderEditView(){
    return (
      <Fragment>
        <input
          name={this.props.name}
          type="text"
          ref="row"
          defaultValue={this.state.value} />
        <button onClick={this.updateData}>Save</button>
        <button onClick={this.changeEditMode}>Cancel</button>
      </Fragment>
    )
  }

  renderDefaultView(){
    const {value} = this.props
    return (
      <span name={this.props.name} onDoubleClick={this.changeEditMode}>{value}</span>
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
