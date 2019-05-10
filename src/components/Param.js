import React, { Component } from 'react'
import Close from './icons/Close';
import CheckBox from './icons/CheckBox';

// REDUX
import { updateParamAction } from '../actions/paramActions';
import { bindActionCreators } from 'redux'
import { connect, } from 'react-redux';
import { updateParam, deleteParam } from '../actions/paramMethods';


class Param extends Component {
  constructor(props) {
    super(props);

    this.renderView = this.renderView.bind(this)
    this.renderEditView = this.renderEditView.bind(this)

    this.deleteParam = this.deleteParam.bind(this)
    this.onChange = this.onChange.bind(this)

    this.onUpdateVisibility = this.onUpdateVisibility.bind(this)
  }

  componentWillUpdate(nextProps, nextState) {
    const editor = document.getElementById("editor");
    if( editor !== null ){
      editor.addEventListener("input", function() {
        console.log("input event fired");
      }, false);
    }
  }

  componentDidMount() {
    this.setState({
      name: this.props.model.name,
      value: this.props.model.value
    })
  }

  onChange(e){
    const { model, dispatch } = this.props;
    const name = e.target.name;
          model[name] = e.target.value;
          model.updatedAt = new Date();
    dispatch(updateParam(model))
  }

  deleteParam(){
    const { model, dispatch } = this.props;
    dispatch(deleteParam(model))
  }

  onUpdateVisibility(){
    const {model, dispatch} = this.props;
          model.checked = !model.checked ;
    dispatch(updateParam(model))
  }

  renderEditView() {
    const { name, value} = this.props.model;
    return (
      <form id="edit__param" className="edit__row" onChange={this.onChange} >
        <input type="text" name="name" defaultValue={name} />
        <textarea name="value" defaultValue={value} />
      </form>
    );
  }

  renderView(){
  const { name, value, id, checked } = this.props.model;
  return (
      <li className="app__list--param" id={id} >
        <div className="app__list--param--container" onClick={this.onUpdateVisibility}>
          <CheckBox isChecked={checked} />
          <div className="app__list--param--content">
            <p className="param__name">
              <b>Name: </b> <span> {name} </span>
            </p>
            <p className="param__value">
              <b>Value: </b> <span> {value}</span>
            </p>
          </div>
        </div>
        <span onClick={this.deleteParam} className="edit__row--delete">
          {/* <Close /> */}
          remove
        </span>
      </li>
    );
  }

  render() {
    return !this.props.is_editing ? this.renderView() : this.renderEditView()
  }
}

const mapActionsToProps = dispatch => {
  return bindActionCreators({
    onUpdateAction: updateParamAction
  }, dispatch )
}

export default connect(mapActionsToProps)(Param)
