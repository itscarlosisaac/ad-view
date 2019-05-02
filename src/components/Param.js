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

    this.changeEditMode = this.changeEditMode.bind(this)

    this.onUpdateVisibility = this.onUpdateVisibility.bind(this)
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
    this.setState({ [name]: newState });
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
    const { name, value, id} = this.props.model;
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
  const { name, value, id, checked } = this.props.model;
  return (
      <li className="app__list--param" id={id} onDoubleClick={this.deleteParam} onClick={this.onUpdateVisibility}>
        <CheckBox isChecked={checked} />
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
    // return !this.state.isEditing ? this.renderView() : this.renderEditView()
    return this.renderView();
  }
}

const mapActionsToProps = dispatch => {
  return bindActionCreators({
    onUpdateAction: updateParamAction
  }, dispatch)
}

export default connect(mapActionsToProps)(Param)